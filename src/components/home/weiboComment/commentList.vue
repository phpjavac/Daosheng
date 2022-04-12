<script lang="ts">
export default {
  name: "CommrntList",
  props: {
    commrntData: {
      type: Array,
      required: true,
    },
  },
};
</script>
<template>
  <!-- 其他评论列表 -->
  <!-- {{ commrntData }} -->
  <div v-for="(item, index) in commrntData" :key="index">
    <a-comment>
      <template #datetime>
        {{ item.releaseTime }}
      </template>
      <template #author>
        <a>{{ item.title }}</a>
      </template>
      <template #avatar>
        <a-avatar :src="item.avatar" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          {{ item.content }}
        </p>
      </template>
      <commrntList :commrnt-data="item.children" />
    </a-comment>
  </div>
</template>
