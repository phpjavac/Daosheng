<script setup lang="ts">
import { reactive, ref } from "vue"
import {LogoutOutlined} from "@ant-design/icons-vue"
import { Drawer as aDrawer,Form as aForm,Input as aInput,Tooltip as aTooltip,Button as aButton, message} from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore()
const router = useRouter()
/** 表单 */
const visible = ref(false)
const name = sessionStorage.getItem("name")
const userInfo = reactive({
  name:"",
  code:"",
  instroduct:"",
  headImagePath:""
})
const getUserInfo = async() => {
  await store.dispatch("user/getByCode").then(res => {
    Object.assign(userInfo,res)
  })
}
getUserInfo()

/** 登出 */
const loginOut = async() => {
  await store.dispatch("user/logout").then(res => {
    message.success("成功退出")
    router.push({path:"/"})
  })
}
</script>
<template>
  <div
    class="avatar h-30px w-30px bg-red-500 m-r-10px  cursor-pointer"
    @click="()=>visible = true"
  >
    <img class="avatar-img w-1/1 h-1/1" />
  </div>
  <div class="avatar-info w-5em">
    <span>{{ name }}</span>
  </div>
  <a-tooltip
    title="退出登陆"
    arrow-point-at-center
    @click="loginOut"
  >
    <LogoutOutlined class="w-3em" />
  </a-tooltip>
  <a-drawer
    v-model:visible="visible"
    placement="right"
    :title="`个人中心`"
    width="400"
  >
    <div class="drawer-info ">
      <div class="drawer-avatar h-70px w-70px bg-red-500 rounded-3xl overflow-hidden ">
        <img class="avatar-img w-1/1 h-1/1 " />
      </div>
    </div>
    <div class="drawer-name text-2xl my-1em">{{ `Hello,${name}` }}</div>
    <a-form
      :model="userInfo"
      :label-col="{span:3}"
    >
      <a-form-item label="账号">
        <!-- <aInput v-model:value="userInfo.code.value" /> -->
        <span> {{ userInfo.code }}</span>
      </a-form-item>
      <a-form-item label="班级">
        <!-- <aInput v-model:value="userInfo.code.value" /> -->
        <span> {{ userInfo.code }}</span>
      </a-form-item>
      <a-form-item label="姓名：">
        <aInput
          v-model:value="userInfo.name"
          style="width:10em"
        />
      </a-form-item>
      <a-form-item label="简介：">
        <a-textarea v-model:value="userInfo.instroduct" />
      </a-form-item>
      <div class="avatar-submit">
        <a-button
          type="primary"
          class="m-r-1em"
        >
          保存
        </a-button>
        <a-button>取消</a-button>
      </div>
    </a-form>
  </a-drawer>
</template>
<style lang ="stylus" scoped>
</style>