<template>
  <div class="personalInfo">
    <div>
      学生姓名：
      <span>{{ personalInfoData.name }}</span>
    </div>
    <div>
      班级：
      <span>{{ personalInfoData.theClass }}</span>
    </div>
    <div>
      院系：
      <span>{{ personalInfoData.system }}</span>
    </div>
    <div>
      总分：
      <span>{{ personalInfoData.totlaScore }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  components: {},
  props: {
    personalInfoData: {
      type: Object,
      default: {
        name: "姓名",
        theClass: "班级一",
        system: "院系一",
        totlaScore: 100,
      },
    },
  },
});
</script>

<style lang="stylus" scoped>
.personalInfo
    display flex
    justify-content space-around
    background-color #fff
</style>
