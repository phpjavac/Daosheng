import { get, postJson } from "../lib/http";
import { components } from "../types/petstore";

export default {
  getWeiboTopMostList(date: string) {
    return postJson<components["schemas"]["热度排名"]>(
      "./api/wb/top/most/list",
      {
        date,
      },
    );
  },
  getWeiboTopMostChart(date: string) {
    return postJson<components["schemas"]["近30天热度走势"]>(
      "./api/wb/top/most/trend/chart",
      {
        date,
      },
    );
  },
  getWordcloudData(id: string) {
    return get<components["schemas"]["词云"]>(`./api/wb/wordcloud/${id}`).then(
      (res) => {
        return res;
      },
    );
  },
};
