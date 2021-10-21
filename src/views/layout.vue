<script setup lang="ts">
/* eslint-disable no-nested-ternary */
import Navigate from "../components/navigate.vue";
import Breadcrumb from "../components/breadcrumb.vue";

</script>
<template>
  <Navigate />
  <div class="class-container mx-200px mt-80px px-40px py-10px ">
    <Breadcrumb />
    <router-view />
  </div>
</template>
<style lang="stylus" scoped>
.class-container{
  // height calc(100% - 152px)
  background #fff
}
</style>
