<template>
  <span :style="{ color }">{{ value }}</span>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watchEffect,
  unref,
  onMounted,
  watch,
} from "vue";
import { useTransition, TransitionPresets } from "@vueuse/core";
import { isNumber } from "../../utils/is";

const propsInit = {
  startVal: { type: Number, default: 0 },
  endVal: { type: Number, default: 2021 },
  duration: { type: Number, default: 1500 },
  autoplay: { type: Boolean, default: true },
  decimals: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0;
    },
  },
  prefix: { type: String, default: "" },
  suffix: { type: String, default: "" },
  separator: { type: String, default: "," },
  decimal: { type: String, default: "." },
  /**
   * font color
   */
  color: { type: String },
  /**
   * Turn on digital animation
   */
  useEasing: { type: Boolean, default: true },
  /**
   * Digital animation
   */
  transition: { type: String, default: "linear" },
};

export default defineComponent({
  name: "CountTo",
  props: propsInit,
  emits: ["onStarted", "onFinished"],
  setup(props, { emit }) {
    const source = ref(props.startVal);
    const disabled = ref(false);
    let outputValue = useTransition(source);

    function run() {
      outputValue = useTransition(source, {
        disabled,
        duration: props.duration,
        onFinished: () => emit("onFinished"),
        onStarted: () => emit("onStarted"),
        ...(props.useEasing
          ? { transition: TransitionPresets[props.transition] }
          : {}),
      });
    }
    watchEffect(() => {
      source.value = props.startVal;
    });

    function start() {
      run();
      source.value = props.endVal;
    }

    function formatNumber(num: number | string) {
      if (!num && num !== 0) {
        return "";
      }
      const { decimals, decimal, separator, suffix, prefix } = props;
      const numCopy = Number(num).toFixed(decimals).toString();
      const x = numCopy.split(".");
      let x1 = x[0];
      const x2 = x.length > 1 ? decimal + x[1] : "";

      const rgx = /(\d+)(\d{3})/;
      if (separator && !isNumber(separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, `$1${separator}$2`);
        }
      }
      return prefix + x1 + x2 + suffix;
    }

    const value = computed(() => formatNumber(unref(outputValue)));

    watch([() => props.startVal, () => props.endVal], () => {
      if (props.autoplay) {
        source.value = props.startVal;
        start();
      }
    });

    onMounted(() => {
      if (props.autoplay) {
        start();
      }
    });

    function reset() {
      source.value = props.startVal;
      run();
    }

    return { value, start, reset };
  },
});
</script>
