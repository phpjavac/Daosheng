<template>
    <div class="singleChoice">
        <div class="singleTitle">
            <span>{{ index }}.</span>
            <span class="skyColor">【判断题】</span>
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
            <div v-for="(item,index) in justifyChoice" :key="index">
                <div
                    class="option"
                    @click="onSelectFlag(Number(index))"
                    v-show="index !== selectFlag"
                >
                    {{item}}
                </div>
                <div>
                    <div class="selectOption" v-show="index === selectFlag">
                        <div class="selectOptionTag">√</div>
                        <span class="justifyContent">{{item}}</span>
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
        justifyPropData: {
            type: Object, default: {
                index: 1,
                type: '判断题',
                questionContent: '判断题目',
                meta: "",
                answer: {}
            },
        },
        answer: { type: Object, required: true },
    },
    emits: ['chooseOption', 'update:answer'],
    setup(props, { emit }) {
        const { index, questionContent } = toRefs(props.justifyPropData)
        const selectFlag = ref(1000);
        const isFlag = ref<boolean>(true);
        const isHeartFlag = ref<boolean>(true);
        const justifyChoice = (['正确','错误']);
        const changeFlagStatus = () => {
            isFlag.value = !isFlag.value;
        };
        const changeHeartStatus = () => {
            console.log(1230);
            isHeartFlag.value = !isHeartFlag.value;
        };
        const onSelectFlag = (index: number) => {
            selectFlag.value = index;
            console.log(isFlag.value, isHeartFlag.value);
            emit('update:answer',
                {
                    isFlag: !isFlag.value,
                    isHeartFlag: !isHeartFlag.value,
                    answer: justifyChoice[index],
                })
        };
        return {
            index,
            questionContent,
            onSelectFlag,
            selectFlag,
            isFlag,
            isHeartFlag,
            changeFlagStatus,
            changeHeartStatus,
            justifyChoice,
        }
    }
})
</script>

<style lang="stylus" scoped>
.singleChoice
        width 100%
        background-color #fff
    .singleTitle
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
                padding 16px 16px 16px 64px 
        .selectOption
                border 1px solid #1890ff
                display flex
                border-radius 6px
            .selectOptionTag
                padding 16px 
                background-color #1890ff
                margin-right 8px
                color #fff
            .justifyContent
                 padding 16px
</style>