<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);
// props
defineProps({
  msg: {
    type: String,
    default: () => "defautlMsg",
    required: false,
  },
  measurement: {
    type: Number,
    default: () => 90,
    required: false,
  },
  proportion: {
    type: Number,
    default: () => 1,
    required: false,
  },
});
</script>

<template>
  <div
    class="mainUploadImg"
    :style="{
      width: `${measurement}px`,
      height: `${measurement * proportion}px`,
    }"
  >
    <div class="Jesus">
      <div class="tips">UploadImg</div>
    </div>
    <div class="prison"></div>
  </div>
</template>

<style scoped>
.mainUploadImg {
  border: solid 1px #ccc;
  margin: 0;
}
.Jesus {
  height: 100%;
  width: 100%;
  color: #ccc;
  position: relative;
}
/* 横 */
.Jesus::after {
  position: absolute;
  content: "";
  left: 38.5%;
  top: 40.5%;
  width: 25%;
  height: 5%;
  background: #ccc;
}
/* 竖 */
.Jesus::before {
  position: absolute;
  content: "";
  left: 48.5%;
  top: 30.5%;
  width: 5%;
  height: 25%;
  background: #ccc;
}
.tips {
  width: 100%;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  position: absolute;
  bottom: 20%;
  cursor: pointer;
}
</style>
