<template>
  <div class="pageWrapper">
    <CountTo
      suffix="$"
      :color="'blue'"
      :startVal="1000"
      :endVal="300000003401.123456"
      :decimals="4"
      :duration="6000"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CountTo from "../components/DynamicDigital/DynamicDigital.vue";

export default defineComponent({
  components: {
    CountTo,
  },
});
</script>

<style lang="stylus" scoped>
.pageWrapper
  line-height 200px
  font-size 100px
  background-color #fff
  padding 20px
</style>
