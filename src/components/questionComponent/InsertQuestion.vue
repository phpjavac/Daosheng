<template>
  <div class="insertChoice">
    <div class="insertTitle">
      <div class="singleTitle">
        <span>{{ index }}.</span>
        <span class="skyColor">【填空题】</span>
        <span>{{ questionContent }}</span>
      </div>
    </div>
    <div class="tipLine">
      <div
        @click="changeFlagStatus()"
        :class="{ flagInit: isFlag, flagChoose: !isFlag }"
      >
        <BulbOutlined />
      </div>
      <div
        @click="changeHeartStatus()"
        :class="{ heartInit: isHeartFlag, heartChoose: !isHeartFlag }"
      >
        <HeartOutlined />
      </div>
      <div>【{{ 10 }}】</div>
    </div>
    <div
      class="insertContent"
      :contenteditable="true"
      @keyup="onChangeInsert()"
      ref="content"
    ></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";
import { BulbOutlined, HeartOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    BulbOutlined,
    HeartOutlined,
  },
  props: {
    insertPropData: {
      type: Object,
      default: {
        index: 1,
        type: "单选题",
        questionContent: "填空题目",
        meta: "",
        answer: {},
      },
    },
    answer: { type: Object, required: true },
  },
  emits: ["update:answer"],
  setup(props, { emit }) {
    const content = ref();
    const isFlag = ref<boolean>(true);
    const isHeartFlag = ref<boolean>(true);
    const { index, questionContent } = toRefs(props.insertPropData);
    const changeFlagStatus = () => {
      isFlag.value = !isFlag.value;
    };
    const changeHeartStatus = () => {
      isHeartFlag.value = !isHeartFlag.value;
    };
    const onChangeInsert = () => {
      emit("update:answer", {
        isFlag: !isFlag.value,
        isHeartFlag: !isHeartFlag.value,
        answer: content.value.innerText,
      });
    };

    return {
      index,
      questionContent,
      isFlag,
      isHeartFlag,
      changeHeartStatus,
      changeFlagStatus,
      onChangeInsert,
      content,
    };
  },
});
</script>

<style lang="stylus" scoped>
.insertChoice
        width 100%
        background-color #fff
    .insertTitle
            padding-top 30px
            width 100%
            background-color #fff
        .skyColor
            color #1890ff
    .tipLine
         display flex
         justify-content flex-end
        .flagInit
            margin-right 20px
        .flagChoose
            margin-right 20px
            color red
        .heartInit
             margin-right 20px
        .heartChoose
             margin-right 20px
             color red
    .insertContent
            background-color #F5F6FD
            height 74px
            line-height 74px
            box-sizing border-box
            padding-left 20px
        input
            display inline-block
            border 0
            background-color #cfcfcf
            height 34px
            width calc(100% - 40px)
</style>
