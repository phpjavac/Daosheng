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
  getWeiboEmotion(id: string) {
    return get<components["schemas"]["用户情绪"]>(`./api/wb/emotion/${id}`);
  },
  getWeiboEmotionMap(id: string) {
    return get<components["schemas"]["地区情绪"]>(`./api/wb/emotion/map/${id}`);
  },
  getListData() {
    const listData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 23; i++) {
      listData.push({
        index: i,
        isOpen: false,
        isReplyContent: false,
        releaseTime: "2022-03-09 18:00",
        title: `名字 ${i}`,
        avatar: "https://joeschmoe.io/api/v1/random",
        commentValue: "153",
        forwardingValue: "150",
        giveALikeValue: "151",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      });
    }
    return listData;
  },
  getCcommrntData() {
    return [
      {
        releaseTime: "2022-03-09 18:00",
        title: "name1-1",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: "We supply a series of design principles.",
        children: [
          {
            releaseTime: "2022-03-09 18:00",
            title: "name1-2",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: "We supply a series of design principles.",
            children: [
              {
                releaseTime: "2022-03-09 18:00",
                title: "name1-3",
                avatar: "https://joeschmoe.io/api/v1/random",
                content: "We supply a series of design principles.",
                children: [
                  {
                    releaseTime: "2022-03-09 18:00",
                    title: "name1-4",
                    avatar: "https://joeschmoe.io/api/v1/random",
                    content: "We supply a series of design principles.",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            releaseTime: "2022-03-09 18:00",
            title: "name1",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: "We supply a series of design principles.",
            children: [],
          },
          {
            releaseTime: "2022-03-09 18:00",
            title: "name1",
            avatar: "https://joeschmoe.io/api/v1/random",
            content: "We supply a series of design principles.",
            children: [],
          },
        ],
      },
    ];
  },
};
