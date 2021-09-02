<script setup lang="ts">
import { ref } from "vue";
import "vue-cropper/dist/index.css";
import { vueCropper } from "vue-cropper";
// emits
const emits = defineEmits(["filePack"]);
// props
const props = defineProps({
  /* 文字 */
  msg: {
    type: String,
    default: () => "Choice Img",
    required: false,
  },
  /* 尺寸 */
  measurement: {
    type: Number,
    default: () => 90,
    required: false,
  },
  /* 宽高比例 */
  proportion: {
    type: Number,
    default: () => 1,
    required: false,
  },
  /* 限制size大小 单位M */
  size: {
    type: Number,
    default: () => NaN,
    required: false,
  },
});
/* 图片 */
const avatar = ref("");
/* cropper Ref */
const copper = ref<HTMLElement | null>(null);
const beforeImg = ref("");
const afterImg = ref("");
/** 上传文件Ref */
const inputRef = ref<HTMLInputElement | null>(null);
/** 选择图片 */
const inputChange = () => {
  if (!inputRef.value?.files) return;
  const file = (inputRef.value as HTMLInputElement).files![0];
  /* 判断大小 */
  if (props.size) {
    if (file.size < props.size * 1024 * 1024) return;
  }
  /* 读取文件 */
  const read = new FileReader();
  read.readAsDataURL(file); // 读取blob / file 文件后以base64格式转化
  read.onload = (e) => {
    avatar.value = e.target?.result as string;
    emits("filePack", file);
  };
};
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
      <div class="tips">{{ msg }}</div>
      <input
        type="file"
        ref="inputRef"
        multiple="false"
        @change.prevent="inputChange"
        accept="image/png, image/jpeg,image/jpg"
      />
      <img :src="avatar" v-show="avatar" />
    </div>
    <div class="prison"></div>
  </div>
</template>

<style scoped>
.mainUploadImg {
  border: solid 1px #ccc;
  border-radius: 3px;
  margin: 0;
}
.Jesus {
  height: 100%;
  width: 100%;
  color: #ccc;
  position: relative;
  z-index: 1;
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
  z-index: 1;
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
  z-index: 1;
}
.Jesus input[type="file"] {
  position: absolute;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.Jesus img {
  position: absolute;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: none;
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
