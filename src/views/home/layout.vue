<script lang="ts" setup>
import { Layout as aLayout } from "ant-design-vue";
import theHeader from "../../components/home/header.vue";

const ALayoutContent = aLayout.Content;
</script>
<template>
  <a-layout class="!bg-white">
    <the-header></the-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
