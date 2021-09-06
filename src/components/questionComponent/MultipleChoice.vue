<template>
    <div class="multipleChoice">
        <div class="multipleTitle">
            <span>{{ index }}.</span>
            <span class="skyColor">【多选题】</span>
            <span>{{ questionContent }}</span>
        </div>
        <div class="tipLine">
            <div @click="changeFlagStatus()" :class="{ 'flagInit': isFlag, 'flagChoose': !isFlag }">
                <BulbOutlined />
            </div>
            <div
                @click="changeHeartStatus()"
                :class="{ 'heartInit': isHeartFlag, 'heartChoose': !isHeartFlag }"
            >
                <HeartOutlined />
            </div>
            <div>【{{ 10 }}】</div>
        </div>
        <div class="choiceOption">
            <div v-for="(item,index) in JSON.parse(meta)" :key="index">
                <div
                    class="option"
                    @click="onSelectFlag(Number(index))"
                    v-show="!selectFlag.includes(Number(index))"
                >
                    <div class="optionTag">{{ choiceTagArr[Number(index)] }}</div>
                    <span v-html="item"></span>
                </div>
                <div>
                    <div
                        class="selectOption"
                        @click="onSelectFlag(Number(index))"
                        v-show="selectFlag.includes(Number(index))"
                    >
                        <div class="selectOptionTag">√</div>
                        <span v-html="item"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang='ts'>
import { defineComponent, toRefs, ref } from 'vue';
import {
    BulbOutlined,
    HeartOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
    components: { BulbOutlined, HeartOutlined },
    props: {
        mulPropData: {
            type: Object, default: {
                index: 1,
                type: '单选题',
                questionContent: '单选题目',
                meta: "[\"<p>阿打算</p>\",\"<p>分手</p>\",\"<p>官方</p>\",\"<p>发顺丰的 </p>\"]",
                answer: {}
            },

        },
        answer: { type: Object, required: true },
    },
        emits: ['update:answer'],
    setup(props, { emit }) {
        const choiceTagArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        const { index, questionContent, meta } = toRefs(props.mulPropData)
        const selectFlag = ref<number[]>([]);
        const isFlag = ref<boolean>(true);
        const isHeartFlag = ref<boolean>(true);
        const changeFlagStatus = () => {
            isFlag.value = !isFlag.value;
        };
        const changeHeartStatus = () => {
            isHeartFlag.value = !isHeartFlag.value;
        };
        const onSelectFlag = (index: number) => {
            if (!selectFlag.value.includes(index)) {
                selectFlag.value.push(index)
            } else {
                const selectIndex = selectFlag.value.indexOf(index);
                selectFlag.value.splice(selectIndex, 1)
            }

            emit('update:answer', {
                isFlag: !isFlag.value,
                isHeartFlag: !isHeartFlag.value,
                answer: JSON.stringify(selectFlag.value),
            })
        };
        return {
            index,
            questionContent,
            meta,
            choiceTagArr,
            onSelectFlag,
            selectFlag,
            changeFlagStatus,
            changeHeartStatus,
            isFlag,
            isHeartFlag,
        }
    }
})
</script>

<style lang="stylus" scoped>
.multipleChoice
        width 100%
        background-color #fff
    .multipleTitle
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
    .choiceOption
        .option
                display flex
            .optionTag
                padding 16px
        .selectOption
                border 1px solid #1890ff
                display flex
                border-radius 6px
            .selectOptionTag
                padding 16px 
                background-color #1890ff
                margin-right 8px
                color #fff

</style>