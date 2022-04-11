import { reactive, ref } from "vue";
import type { Dayjs } from "dayjs";
import * as echarts from "echarts";
import { WeiboService } from "../services/index";
import { components } from "../types/petstore";

export type HotWeiboChartList = components["schemas"]["近30天热度走势"];
const UseWeibo = () => {
  let charts: echarts.ECharts | null = null;
  /** 热搜排名 */
  const hotWeibolist = ref<components["schemas"]["热度排名"]>([]);
  /** 热搜走势 */
  const hotWeiboChart = reactive<HotWeiboChartList>({
    date: [],
    list: [],
  });
  /** 词云数据 */
  const wordcloudData = ref<
    {
      value: number;
      name: string;
    }[]
  >([]);

  const getWeiboTopMostChart = (date: Dayjs, dom: HTMLElement) => {
    return new Promise<void>((resolve) => {
      if (!charts) {
        charts = echarts.init(dom);
      }
      WeiboService.getWeiboTopMostChart(date.unix().toString()).then((res) => {
        hotWeiboChart.date = res.date;
        hotWeiboChart.list = res.list;
        const option = {
          // animationDuration: 2000,
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: res.date,
          },
          yAxis: {
            type: "value",
          },
          grid: {
            right: 140,
          },
          legend: {
            data: res.list.map((item) => {
              return item.name;
            }),
          },
          series: res.list.map((item) => {
            return {
              ...item,
              type: "line",
              // stack: "Total",
            };
          }),
          dataZoom: [
            {
              type: "inside",
              start: 0,
              end: 20,
            },
            {
              start: 0,
              end: 20,
            },
          ],
        };
        if (charts) {
          charts.setOption(option);
        }
        resolve();
      });
    });
  };
  const getWeiboTopMostList = (date: Dayjs) => {
    WeiboService.getWeiboTopMostList(date.unix().toString()).then((res) => {
      hotWeibolist.value = res;
    });
  };
  const getWordcloudData = async (id: string) => {
    await WeiboService.getWordcloudData(id).then((res) => {
      wordcloudData.value = res;
    });
  };
  return {
    hotWeibolist,
    hotWeiboChart,
    wordcloudData,
    getWordcloudData,
    getWeiboTopMostList,
    getWeiboTopMostChart,
  };
};
export default UseWeibo;