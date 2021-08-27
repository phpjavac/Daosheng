<script setup lang="ts">
import { useRequest } from "../packages/composition/index";
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Demo from "../packages/composition/src/useRequest/demo/index.vue";
// const { error, loading, response } = useRequest<any>({ url: '/api/get', method: 'get' })
const { error, loading, response } = useRequest<any>({ url: '/api/text', method: 'post' })
  
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <Demo></Demo>
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
