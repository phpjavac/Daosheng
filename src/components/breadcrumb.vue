<script setup lang="ts">
import { Breadcrumb  as aBreadcrumb,  } from "ant-design-vue"
import { RouteLocationMatched , useRoute,useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

interface NavRoute  {
  name: string;
  path: string;
  children?: NavRoute[]
}
/** breadcrumb */
const getNavBreadcrumb = ()=> {
  const result:NavRoute[] = []
  const temp = route.matched
  temp.forEach((item:RouteLocationMatched) => {
    if(item.meta) {
      result.push({
        name:item.meta.title as unknown as string,
        path:item.path
      })
    }
  });
  return result
}
</script>
<template>
  <div class="breadcrumb  my-40px  ">
    <div class="">
      <a-breadcrumb>
        <a-breadcrumb-item
          v-for="(item,index) in getNavBreadcrumb()"
          :key="index"
          @click="()=>router.push({path:item.path})"
        >
          <span class="cursor-pointer">
            {{ item.name }}
          </span> 
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
  </div>
</template>
<style lang ="stylus" scoped>
</style>