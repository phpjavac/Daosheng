<script lang="ts" setup>
import dayjs from "dayjs";
import { useGlobalStore } from "zcomposition";
import * as echarts from "echarts";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { HotWeiboChartList } from "../../../compostion/use_weibo";
import wordCloudImg from "../../../assets/wordCloud.png";
import { useWeibo } from "../../../compostion";
import "echarts-wordcloud";

const route = useRoute();
const { id } = route.params as { id: string };
const chartDom = ref<HTMLElement>();
const yunDom = ref<HTMLElement>();
const { wordcloudData, getWordcloudData } = useWeibo();
const { hotWeiboChart } = useGlobalStore<{
  hotWeiboChart: HotWeiboChartList;
}>();

type EChartsOption = echarts.EChartsOption;

const list = computed(() => {
  return {
    date: hotWeiboChart.date,
    list:
      hotWeiboChart.list.find((item) => item.id === id) ||
      hotWeiboChart.list[0],
  };
});

onMounted(() => {
  if (chartDom.value && yunDom.value) {
    const myChart = echarts.init(chartDom.value);
    const option: EChartsOption = {
      title: {
        text: `${list.value.list.name}事件舆情发展`,
      },
      tooltip: {
        show: true,
      },
      xAxis: {
        type: "category",
        data: list.value.date.map((item) => dayjs(item).format("MM-DD")),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: list.value.list.data,
          type: "line",
        },
      ],
    };
    myChart.setOption(option);
    getWordcloudData(id).then(() => {
      const chart = echarts.init(yunDom.value!);
      const maskImage = new Image();
      maskImage.src = wordCloudImg;

      const option1 = {
        tooltip: {},
        series: [
          {
            type: "wordCloud",
            sizeRange: [12, 86],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 1,
            shape: "circle",
            left: "center",
            top: "center",
            width: "100%",
            height: "100%",
            right: null,
            bottom: null,
            layoutAnimation: true,
            drawOutOfBound: true,
            maskImage,
            data: wordcloudData.value.sort((a, b) => {
              return b.value - a.value;
            }),
          },
        ],
      };
      maskImage.onload = () => {
        option1.series[0].maskImage = maskImage;
        chart.setOption(option1);
      };
    });
  }
});

const nowDate = dayjs().add(-31, "day");
</script>
<template>
  <div class="border-gray-500 border-7 p-24px mb-36px">
    <a-row justify="center">
      <a-col>
        <h1 class="text-4xl">
          事件热度走势
          <span class="text-2xl"
            >事件开始时间为{{ nowDate.format("YYYY/DDMM") }}</span
          >
        </h1>
        <div ref="chartDom" class="h-60vh w-60vw"></div>
      </a-col>
      <a-col>
        <div class="w-30vw">
          <h1 class="text-4xl">事件热词</h1>
          <div ref="yunDom" class="h-15vw w-30vw"></div>
        </div>
      </a-col>
    </a-row>
  </div>
  <div class="border-gray-500 border-7 p-24px"></div>
</template>
