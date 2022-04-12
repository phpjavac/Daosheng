<script lang="ts" setup>
import {
  MessageOutlined,
  LikeOutlined,
  ExportOutlined,
} from "@ant-design/icons-vue";
import { reactive } from "@vue/reactivity";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { useWeibo } from "../../../compostion";
import commrntList from "./commentList.vue";

const { pagination, listData } = useWeibo();

// 展开内容
const setIsOpen = (index: number, boolean: boolean) => {
  listData[index].isOpen = boolean;
};

// 点击评论
const setComment = (index: number, boolean: boolean) => {
  listData[index].isReplyContent = boolean;
  return listData;
};
const commrntData = reactive([
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
]);
</script>

<template>
  <div class="border-gray-500 p-24px">
    <h1 class="text-4xl border-l-5 border-blue-500 pl-12px">
      舆情数据
      <span class="text-2xl"
        >相关舆情数据共
        <span class="text-blue-500">{{ listData.length }}</span> 条</span
      >
    </h1>
    <a-config-provider :locale="zhCN">
      <a-list
        item-layout="vertical"
        size="large"
        :pagination="pagination"
        show-quick-jumper
        :data-source="listData"
      >
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #actions>
              <div>
                <export-outlined style="margin-right: 8px" />
                {{ item.forwardingValue }}
              </div>
              <div @click="setComment(item.index, !item.isReplyContent)">
                <message-outlined style="margin-right: 8px" />
                {{ item.commentValue }}
              </div>
              <div>
                <like-outlined style="margin-right: 8px" />
                {{ item.giveALikeValue }}
              </div>
            </template>
            <a-list-item-meta :description="item.releaseTime">
              <template #title>
                {{ item.title }}
              </template>
              <template #avatar><a-avatar :src="item.avatar" /></template>
            </a-list-item-meta>
            <!-- 内容 -->
            <div v-if="item.isOpen">
              {{ item.content }}
              <span
                class="text-blue-500"
                @click="setIsOpen(item.index, !item.isOpen)"
                >收起</span
              >
            </div>
            <div v-else>
              {{ item.content.substring(0, 140) }}
              <span
                class="text-blue-500"
                @click="setIsOpen(item.index, !item.isOpen)"
                >展开</span
              >
            </div>
          </a-list-item>
          <div v-if="item.isReplyContent">
            <!-- 其他评论列表 -->
            <commrntList
              v-if="commrntData.length != 0"
              :commrnt-data="commrntData"
            />
            <div v-else class="line-height: 40px;text-align: center;">
              暂无评论
            </div>
          </div>
        </template>
      </a-list>
    </a-config-provider>
  </div>
</template>
