<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import chinaMap from "../../../assets/china.json";
import { useWeibo } from "../../../compostion";

type EChartsOption = echarts.EChartsOption;
const mapRef = ref<HTMLElement>();
let option: EChartsOption;
const route = useRoute();
const { id } = route.params as { id: string };
const showDelay = ref(false);
const hotWeiboMaplist = ref<
  { high: number; province: string; emotion: { low: number; high: number } }[]
>([]);
const { getWeiboEmotionMap } = useWeibo();
onMounted(() => {
  const myChart = echarts.init(mapRef.value!);

  echarts.registerMap("FeatureCollection", chinaMap as any);
  getWeiboEmotionMap(id).then((res) => {
    hotWeiboMaplist.value = res
      .map((item) => {
        return {
          ...item,
          high: +(
            (item.emotion.high / (item.emotion.high + item.emotion.low)) *
            100
          ).toFixed(2),
        };
      })
      .sort((a, b) => b.high - a.high);
    const data = res.map((item) => {
      return {
        name: item.province,
        value: item.emotion.high + item.emotion.low,
      };
    });
    const max = Math.max(...data.map((item) => item.value));

    option = {
      title: {
        text: "地域分布图",
        left: "left",
      },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: {
        left: "right",
        min: 0,
        max,
        inRange: {
          color: ["#ffffff", "#4575b4"],
        },
        text: [max.toString(), "0"],
        calculable: false,
      },
      series: [
        {
          label: {
            show: true,
          },
          name: "china PopEstimates",
          type: "map",
          roam: true,
          map: "FeatureCollection",
          emphasis: {
            label: {
              show: true,
            },
          },
          data,
        },
      ],
    };

    myChart.setOption(option);
  });
});
</script>

<template>
  <a-row>
    <a-col span="16">
      <div ref="mapRef" class="w-100% h-60vh h-min480px mr-36px"></div>
    </a-col>
    <a-col :span="8">
      <div class="max-h-60vh overflow-auto">
        <a-list
          item-layout="horizontal"
          :data-source="hotWeiboMaplist"
          bordered
          size="large"
        >
          <template #header>
            <a-list-item justify="around">
              <a-col :span="3">排名</a-col>
              <a-col :span="4">地域</a-col>
              <a-col :span="4">正面</a-col>
              <a-col :span="4">负面</a-col>
            </a-list-item>
          </template>
          <template #renderItem="{ item, index }">
            <a-list-item v-if="index < 10 || showDelay" justify="around">
              <a-col :span="3">{{ index + 1 }}</a-col>
              <a-col :span="4">{{ item.province }}</a-col>
              <a-col :span="4">{{ item.high }} %</a-col>
              <a-col :span="4">{{ (100 - item.high).toFixed(2) }} %</a-col>
            </a-list-item>
          </template>
          <template #footer>
            <div
              class="text-center cursor-pointer"
              @click="() => (showDelay = !showDelay)"
            >
              {{ showDelay ? "收起" : "查看更多" }}
            </div>
          </template>
        </a-list>
      </div>
    </a-col>
  </a-row>
</template>
