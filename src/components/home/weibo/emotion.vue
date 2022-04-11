<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import * as echarts from "echarts";
import { useWeibo } from "../../../compostion";
import chinaEmotionVue from "./chinaEmotion.vue";

const route = useRoute();
const option = {
  title: {
    text: "",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true },
    },
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: true,
      },
      labelLine: {
        show: true,
      },
      data: [] as { value: number; name: string }[],
    },
  ],
};

const genderRef = ref<HTMLElement>();
const emotionRef = ref<HTMLElement>();
const maleEmotionRef = ref<HTMLElement>();
const femaleEmotionRef = ref<HTMLElement>();

const { id } = route.params as { id: string };

const { getWeiboEmotion } = useWeibo();
onMounted(() => {
  const genderEcharts = echarts.init(genderRef.value!);
  const emotionEcharts = echarts.init(emotionRef.value!);
  const maleEmotionEcharts = echarts.init(maleEmotionRef.value!);
  const femaleEmotionEcharts = echarts.init(femaleEmotionRef.value!);
  getWeiboEmotion(id).then((res) => {
    option.title.text = "参与用户性别占比";
    option.series[0].name = "参与用户性别占比";
    option.series[0].data = [
      { value: res.gender.female, name: "女性" },
      { value: res.gender.male, name: "男性" },
    ];
    genderEcharts.setOption(option);

    option.series[0].name = "情绪占比";
    option.title.text = "情绪占比";

    option.series[0].data = [
      { value: res.emotion.high, name: "正面" },
      { value: res.emotion.low, name: "负面" },
    ];
    emotionEcharts.setOption(option);

    option.series[0].name = "男性用户情绪占比";
    option.title.text = "男性用户情绪占比";

    option.series[0].data = [
      { value: res.maleEmotion.high, name: "正面" },
      { value: res.maleEmotion.low, name: "负面" },
    ];
    maleEmotionEcharts.setOption(option);

    option.series[0].name = "女性用户情绪占比";
    option.title.text = "女性用户情绪占比";

    option.series[0].data = [
      { value: res.femaleEmotion.high, name: "正面" },
      { value: res.femaleEmotion.low, name: "负面" },
    ];
    femaleEmotionEcharts.setOption(option);
  });
});
</script>

<template>
  <div class="border-gray-500 border-7 p-24px">
    <h1 class="text-4xl border-l-5 border-blue-500 pl-12px">舆情分析</h1>
    <a-row>
      <a-col :span="12">
        <div
          ref="genderRef"
          class="h-30vh w-100% min-h-360px p-12px border m-24px"
        ></div>
      </a-col>
      <a-col :span="12">
        <div
          ref="emotionRef"
          class="h-30vh w-100% min-h-360px p-12px border m-24px"
        ></div>
      </a-col>
      <a-col :span="12">
        <div
          ref="maleEmotionRef"
          class="h-30vh w-100% min-h-360px p-12px border m-24px"
        ></div>
      </a-col>
      <a-col :span="12">
        <div
          ref="femaleEmotionRef"
          class="h-30vh w-100% min-h-360px p-12px border m-24px"
        ></div>
      </a-col>
    </a-row>
    <chinaEmotionVue></chinaEmotionVue>
  </div>
</template>
