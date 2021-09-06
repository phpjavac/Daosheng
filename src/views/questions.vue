<template>
    <div class="mainwrapper">
        <div class="main">
            <div>
                <PersonalInfo />
            </div>
            <div v-for="(item,index) in mainPageData" :key="index">
                <div class="title">{{ `子卷体系${index + 1}（共${item.question.length}道题）` }}</div>
                <div
                    class="content"
                    v-for="(items,index1) in item.question"
                    :key="index1"
                    :id="items.id"
                >
                    <div v-if="items.type === '单选题'">
                        <SingleChoice :singlePropData="items" v-model:answer="items.answer" />
                    </div>
                    <div v-if="items.type === '多选题'">
                        <MultipleChoice :mulPropData="items" v-model:answer="items.answer" />
                    </div>
                    <div v-if="items.type === '填空题'">
                        <InsertQuestion :insertPropData="items" v-model:answer="items.answer" />
                    </div>
                    <div v-if="items.type === '判断题'">
                        <JustifyChoice :justifyPropData="items" v-model:answer="items.answer" />
                    </div>
                </div>
            </div>
            <div class="card">
                <AnswerSheet :answerPropData="mainPageData" @onJump="onJumpFunc" />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, toRaw } from 'vue';
import SingleChoice from '../components/questionComponent/SingleChoice.vue';
import MultipleChoice from '../components/questionComponent/MultipleChoice.vue';
import InsertQuestion from '../components/questionComponent/InsertQuestion.vue';
import JustifyChoice from '../components/questionComponent/JustifyChoice.vue';
import AnswerSheet from '../components/questionComponent/AnswerSheet.vue';
import PersonalInfo from '../components/questionComponent/PersonalInfo.vue';



export default defineComponent({
    components: {
        PersonalInfo,
        SingleChoice,
        MultipleChoice,
        InsertQuestion,
        JustifyChoice,
        AnswerSheet,
    },
    setup() {
        const onJumpFunc = (locationId: string) => {
            console.log('locationId',locationId);
            window.location.href = `#${locationId}`
        };
        const mainPageData = ref([{
            pageNumber: 1,
            question: [
                {
                    id: '001',
                    index: 1,
                    type: '单选题',
                    questionContent: '单选题目',
                    meta: "[\"<p>阿打算</p>\",\"<p>分手</p>\",\"<p>官方</p>\",\"<p>发顺丰的 </p>\"]",
                    answer: {
                        isFlag: false,
                        isHeartFlag: false,
                        answer: ''
                    },
                },
                {
                    id: '002',
                    index: 2,
                    type: '多选题',
                    questionContent: '多选题目',
                    meta: "[\"<p>阿打算</p>\",\"<p>分手</p>\",\"<p>官方</p>\",\"<p>发顺丰的 </p>\"]",
                    answer: {
                        isFlag: false,
                        isHeartFlag: false,
                        answer: ''
                    },
                },
                {
                    id: '003',
                    index: 3,
                    type: '填空题',
                    questionContent: '填空题目',
                    meta: '',
                    answer: {
                        isFlag: false,
                        isHeartFlag: false,
                        answer: ''
                    },
                },
                {
                    id: '004',
                    index: 4,
                    type: '判断题',
                    questionContent: '判断题目',
                    meta: '',
                    answer: {
                        isFlag: false,
                        isHeartFlag: false,
                        answer: ''
                    },
                }
            ]
        },
        {
            pageNumber: 1,
            question: [
                {
                    id: '011',
                    index: 1,
                    type: '单选题',
                    questionContent: '单选题目',
                    meta: "[\"<p>阿打算</p>\",\"<p>分手</p>\",\"<p>官方</p>\",\"<p>发顺丰的 </p>\"]",
                    answer: {
                        isFlag: false,
                        isHeartFlag: false,
                        answer: ''
                    },
                },]
        }])

        return { mainPageData,onJumpFunc }
    }
})
</script>

<style lang="stylus" scoped>
.mainwrapper
       background-color #f5f6fa 
    .main
                width 1024px
                margin 0 auto
                background-color #f5f6fa
            .title 
                margin-top 20px
                line-height 58px
                background-color #fff
                border-bottom 1px solid #cfcfcf
                padding 0 16px
            .content
                padding 16px
                background-color #fff
        .card
            width 100%

</style>