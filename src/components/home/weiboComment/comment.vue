<script lang="ts" setup>
import {
  MessageOutlined,
  LikeOutlined,
  ExportOutlined,
} from "@ant-design/icons-vue";
import { useWeibo } from "../../../compostion";

const { pagination, listData } = useWeibo();
// 展开内容
const setIsOpen = (index: number, boolean: boolean) => {
  listData[index].isOpen = boolean;
};
// 点击点赞
const setGiveALike = (index: number, boolean: boolean) => {
  listData[index].giveALike.isRead = boolean;

  return listData;
};
// 点击转发
const setForwarding = (index: number) => {
  listData[index].forwarding.isRead = true;
  return listData;
};
// 点击评论
const setComment = (index: number) => {
  listData[index].comment.isRead = true;
  return listData;
};
</script>

<template>
  <div class="border-gray-500 p-24px">
    <h1 class="text-4xl border-l-5 border-blue-500 pl-12px">
      舆情分析
      <span class="text-2xl"
        >相关舆情数据共
        <span class="text-blue-500">{{ listData.length }}</span> 条</span
      >
    </h1>
    <a-list
      item-layout="vertical"
      size="large"
      :pagination="pagination"
      :data-source="listData"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #actions>
            <div @click="setForwarding(item.index)">
              <export-outlined
                style="margin-right: 8px"
                :style="item.forwarding.isRead ? 'color:#ff8200;' : ''"
              />
              {{ item.forwarding.value }}
            </div>
            <div @click="setComment(item.index)">
              <message-outlined
                style="margin-right: 8px"
                :style="item.comment.isRead ? 'color:#ff8200;' : ''"
              />
              {{ item.comment.value }}
            </div>
            <div @click="setGiveALike(item.index, !item.giveALike.isRead)">
              <like-outlined
                style="margin-right: 8px"
                :style="item.giveALike.isRead ? 'color:#ff8200;' : ''"
              />
              {{ item.giveALike.value }}
            </div>
          </template>
          <a-list-item-meta>
            <template #title>
              {{ item.title }}
            </template>
            <template #avatar><a-avatar :src="item.avatar" /></template>
          </a-list-item-meta>
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
      </template>
    </a-list>
  </div>
</template>
