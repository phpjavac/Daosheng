<script setup lang="ts">
import { ref } from "vue";
// import "vue-cropper/dist/index.css";
// import { vueCropper } from "vue-cropper";
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
  /* 是否需要圆角 */
  radiusSize: {
    type: Number,
    default: NaN, // 默认无
    required: false,
  },
  /* 高宽比例 */
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
// const copper = ref<HTMLElement | null>(null);
// const beforeImg = ref("");
// const afterImg = ref("");
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
/** 伪类样式：支持变量 */
const before =
  "before:left-485/1000 before:top-305/1000 before:w-5/100 before:h-25/100";
const after =
  "after:left-385/1000 after:top-405/1000 after:w-25/100 after:h-5/100";
const publicS =
  "after:z-1 after:bg-[#ccc] after:absolute before:z-1 before:bg-[#ccc] before:absolute";
console.log(
  before,
  after,
  "after(left-385/1000 top-405/1000 w-2/100 h-5/100) https://github.com/windicss/windicss/issues/419"
);
</script>

<template>
  <div
    class="border-1 border-[#ccc] cursor-pointer"
    :class="`rounded-${radiusSize}px`"
    :style="{
      width: `${measurement}px`,
      height: `${measurement * proportion}px`,
    }"
  >
    <div
      class="jesus w-full h-full text-[#ccc] relative z-1 after:z-1"
      :class="` ${before} ${after} ${publicS}`"
    >
      <div
        class="tips !w-full text-12px font-700 text-center absolute bottom-1/5"
      >
        {{ msg }}
      </div>
      <input
        type="file"
        ref="inputRef"
        multiple="false"
        @change.prevent="inputChange"
        accept="image/png, image/jpeg,image/jpg"
        class="absolute left-0 opacity-0 w-full h-full"
      />
      <img
        :src="avatar"
        v-show="avatar"
        class="absolute left-0px z-2 w-full h-full border-0 pointer-events-none"
      />
    </div>
    <div class="prison"></div>
  </div>
</template>

<style scoped>
.jesus::after,
.jesus::before {
  content: "";
  z-index: 1;
  position: absolute;
  background: #ccc;
}
</style>
