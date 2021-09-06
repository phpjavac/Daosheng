<script setup lang="ts">
import { useRequest } from "../packages/composition/composition/index";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Demo from "../packages/composition/composition/src/useRequest/demo/index.vue";
// const { error, loading, response } = useRequest<any>({ url: '/api/get', method: 'get' })
const { error, loading, response } = useRequest<any>({
  url: "http://192.168.1.147:8080/exam-web/api/practiceItemResult/listPracticeItemResult?practiceId=deadebf3-7915-442d-9178-39338a2d8f7c&autonomy=false",
  method: "post",
  headers: {
    token: `eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJleGFtLWFwcCIsInN1YiI6IntcInVzZXJDb2RlXCI6XCIyMDE3MDEyMDAwMVwiLFwib3RoZXJcIjpcIntcXFwiYWRtaW5cXFwiOmZhbHNlLFxcXCJ0ZWFjaGVyXFxcIjpmYWxzZSxcXFwic3R1ZGVudFxcXCI6dHJ1ZX1cIn0iLCJpYXQiOjE2MzAzODU5NjEsImV4cCI6MTYzMTg1NzE5MH0.ez3J_cit_Qt50tfG0OGD0_7oiaj3gISnkWryZZGqywA`,
  },
});
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <Demo></Demo>
  <div v-if="error">{{ error }}</div>
  <div v-if="loading">{{ loading }}</div>
  <div>{{ response }}</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
