<script setup lang="ts">
import { reactive } from "vue";
import { Button, Input as aInput } from "ant-design-vue";
import { useEffect } from "zcomposition";
import { version } from "../../package.json";
import { UserService, SoftService } from "../services/index";

const { auth } = UserService;
const { softConfig } = SoftService;
useEffect(() => {
  softConfig();
});
const userInfo = reactive({
  code: "",
  password: "",
});
</script>

<template>
  <div class="login w-100vw h-100vh bg-cover bg-no-repeat">
    <div
      class="container mx-auto max-w-380px flex flex-col items-center pt-25vh"
    >
      <div class="flex items-center">
        <img
          src="../assets/logo.jpg"
          alt="logo"
          class="logo mr-4 rounded-1 w-44px"
        />
        <p class="text-3xl text-[#fff]">Daosheng 道生万物</p>
      </div>
      <div class="bg-[#fff] mt-36px py-30px px-28px text-center rounded-[8px]">
        <h1 class="text-[20px]">登录</h1>

        <a-input
          v-model:value="userInfo.code"
          placeholder="请输入账号"
          size="large"
          class="!mt-28px"
        />
        <a-input
          v-model:value="userInfo.password"
          placeholder="请输入密码"
          size="large"
          type="password"
          class="!mt-28px"
        />
        <Button
          type="primary"
          class="mt-24px !h-40px"
          block
          @click="auth(userInfo)"
        >
          登录
        </Button>
        <div>
          <div class="copyright text-[14px] text-gray-500 mt-28px">
            © 2010 findsoft 海拉鲁王国依盖队海拉鲁大陆分社
          </div>
          <div class="line h-1px bg-[#ccc] my-8px"></div>
          <div class="version text-[14px] text-gray-500">V{{ version }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.login
    background-image url('../assets/bg.jpg')
</style>
