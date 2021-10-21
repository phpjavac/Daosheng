<script setup lang="ts">
/* eslint-disable no-nested-ternary */
import { useRoute,useRouter } from "vue-router";
import {ref } from "vue"
import { AppRouterRecordRaw } from "../router/type";
import adminRouter from "../router/teacher";
import studentRouter from "../router/student";
import AvatarInfoVue from "./avatarInfo.vue";

const route = useRoute()
const router = useRouter()
interface NavRoute  {
  name: string;
  path: string;
  children?: NavRoute[]
}

/** Logo */
const role = sessionStorage.getItem("role")
const getLogoImage = () => new URL("../assets/logo.jpg", import.meta.url).href

/** Navigate */
const navigateRoutes = role !== "teacher" ? role === "student" ? studentRouter : [] : adminRouter;

const getNavigate = (targetRoute: AppRouterRecordRaw[]) => {
  const result:NavRoute[] = []
  targetRoute.forEach( (item: AppRouterRecordRaw,index) => {
    result.push({
      name:item.meta.title,
      path:item.path
    })
    if(item.children && item.children.length > 0) {  // 递归条件
        result[index].children = (getNavigate(item.children)) 
    }
  })
  return result
}

// const activeRoute = computed(() => route.meta)
/** Title */
const title = ref("管理平台")
</script>
<template>
  <div
    class="navbar-inner h-72px border-b-2 mb-10px bg-white"
  >
    <div class="navbar-container mx-20px flex flex-row items-center ">
      <div class="logoImage h-65px ">
        <img
          :src="getLogoImage()"
          alt="Daosheng"
          class="img h-1/1 " 
        >
      </div>
      <div class="navbar-title w-10em">{{ title }}</div>
      <div class="navbar-content w-1/1 h-65px px-10px flex flex-row">
        <div
          v-for="(item,index) in getNavigate(navigateRoutes)"
          :key="index"
          class="navbar-item  py-10px px-20px leading-45px cursor-pointer "
          :class="{'active-state': route.meta.title === item.name}"
        >
          <span
            class="navbar-title hover:text-orange-500"
            @click="()=>router.push({path:item.path})"
          > {{ item.name }} </span>
        </div>
      </div>
      <AvatarInfoVue />
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.navbar-inner
  .container
    width calc(100%-20px)
.active-state
  border-bottom 4px solid #f97316
</style>
