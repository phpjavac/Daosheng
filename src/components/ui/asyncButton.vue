<script lang="ts" setup>
import { Button } from "ant-design-vue";
import { ref, useAttrs } from "vue";

const attrs = useAttrs();
const loading = ref(false);
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: "click"): Promise<void>;
}>();
const fn = () => {
  loading.value = true;
  Promise.resolve(emit("click")).finally(() => {
    setTimeout(() => {
      loading.value = false;
    }, 100);
  });
};
</script>
<template>
  <Button v-bind="attrs" :loading="loading" @click="fn">
    <slot></slot>
  </Button>
</template>
