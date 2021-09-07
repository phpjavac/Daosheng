<template>
    <div class="mainwrapper">
        <div class="main">
            <div>
                <PersonalInfo :personalInfoData="personalInfoData" />
            </div>
            <div v-if="mainPageData.length">
                <div v-for="(item,index) in mainPageData" :key="index">
                    <div class="title">{{ `子卷体系${Number(index) + 1}（共${item.question.length}道题）` }}</div>
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
            </div>
            <div class="card">
                <AnswerSheet :answerPropData="mainPageData" @onJump="onJumpFunc" />
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted,  watch } from 'vue';
import SingleChoice from '../components/questionComponent/SingleChoice.vue';
import MultipleChoice from '../components/questionComponent/MultipleChoice.vue';
import InsertQuestion from '../components/questionComponent/InsertQuestion.vue';
import JustifyChoice from '../components/questionComponent/JustifyChoice.vue';
import AnswerSheet from '../components/questionComponent/AnswerSheet.vue';
import PersonalInfo from '../components/questionComponent/PersonalInfo.vue';
import useRequest from "../../packages/composition/composition/src/useRequest";
interface Hitokoto {
    code: number;
    data: {
        name: string;
        theClass: string;
        system: number;
        totlaScore: number;
    }
}
interface questionPage {
    code: number;
    data: {
        pageItem: {
            pageNumber: number;
            question: {
                id: string;
                index: number;
                type: string;
                questionContent: string;
                meta: string;
                answer: {
                    isFlag: boolean;
                    isHeartFlag: boolean;
                    answer: string;
                }
            }
        }[];
    };
}
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
            console.log('locationId', locationId);
            window.location.href = `#${locationId}`
        };
        const personalInfoData = ref({});
        const mainPageData = ref<any>([]);
        onMounted(() => {
            const { error, loading: loadingRes, response: perRes } = useRequest<Hitokoto>({
                url: "api/questionPerInfo",
                method: "post",
            });
            const { error: pageError, loading: pageLoading, response: pageRes } = useRequest<questionPage>({
                url: "api/questionPageData",
                method: "post",
            });

            watch(() => loadingRes.value, (v:boolean) => {
                if (!v) {
                    personalInfoData.value = perRes.value.data;
                    console.log('perRes', personalInfoData.value)
                }
            });
            watch(() => pageLoading.value, (v:boolean) => {
                if (!v) {
                    console.log('pageRes', pageRes.value.data)
                    mainPageData.value = pageRes.value.data.pageItem
                }
            });
        });

        return { mainPageData, onJumpFunc, personalInfoData }
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