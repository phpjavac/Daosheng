<script lang="ts" setup>
import {
  Row as aRow,
  Col as aCol,
  List as aList,
  DatePicker as aDatePicker,
} from "ant-design-vue";
import { onMounted, ref } from "vue";
import { useGlobalStore } from "zcomposition";
import dayjs, { isDayjs } from "dayjs";
import { useRouter } from "vue-router";
import { useWeibo } from "../../compostion/index";

const {
  hotWeibolist,
  hotWeiboChart,
  getWeiboTopMostList,
  getWeiboTopMostChart,
} = useWeibo();
useGlobalStore({
  hotWeiboChart,
});
const router = useRouter();
// type Dayjs = dayjs.Dayjs;
const getDateTime = ref(dayjs());
const aListItem = aList.Item;
const chartDom = ref<HTMLElement>();
const activeId = ref("");
const showWeiboInfo = ref(false);
getWeiboTopMostList(getDateTime.value);
const onChangeDate = (value: string | dayjs.Dayjs) => {
  if (isDayjs(value)) {
    console.log("go to date", value.format("YYYY-MM-DD"));

    getWeiboTopMostList(getDateTime.value);
    if (chartDom.value) {
      getWeiboTopMostChart(getDateTime.value, chartDom.value);
    }
  }
};

const goInfo = (id: string) => {
  activeId.value = id;
  router.push({
    name: "weiboInfo",
    params: { id },
  });
};
onMounted(() => {
  if (chartDom.value) {
    getWeiboTopMostChart(getDateTime.value, chartDom.value).then(() => {
      showWeiboInfo.value = true;
      console.log("chart init");
    });
  }
});
</script>
<template>
  <div class="border-gray-500 border-7 p-24px mb-36px">
    <a-row justify="center">
      <a-col>
        <h1 class="text-4xl">热度走势</h1>
        <div ref="chartDom" class="h-60vh w-60vw"></div>
      </a-col>
      <a-col>
        <div class="w-30vw">
          <a-row justify="space-between">
            <a-col>
              <h1 class="text-4xl">热度排名</h1>
            </a-col>
            <a-col>
              <a-date-picker
                v-model:value="getDateTime"
                @change="onChangeDate"
              />
              <div class="py-12px text-2xl">
                榜单更新时间
                <span class="text-blue-500"
                  >{{ getDateTime.format("YYYY-MM-DD") }} 7:00</span
                >
              </div>
            </a-col>
          </a-row>
          <a-list
            item-layout="horizontal"
            :data-source="hotWeibolist"
            bordered
            size="large"
          >
            <template #header>
              <a-list-item justify="around">
                <a-col>排名</a-col>
                <a-col class="w-20vw">事件标题</a-col>
                <a-col>事件热度</a-col>
              </a-list-item>
            </template>
            <template #renderItem="{ item, index }">
              <a-list-item
                justify="around"
                class="cursor-pointer"
                @click="goInfo(item.id)"
              >
                <a-col>{{ index + 1 }}</a-col>
                <a-col class="w-20vw">{{ item.keyword }}</a-col>
                <a-col>{{ item.heat }}</a-col>
              </a-list-item>
            </template>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </div>

  <router-view v-if="showWeiboInfo"></router-view>
</template>
