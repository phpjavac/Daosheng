<template>
    <div class="answerWrapper" :class="{ 'canDrage': !isCanMove }" ref="dynamicDom">
        <div class="answerSheet" ref="answerSheet">
            <div class="titleLeft" @click="onOpenCard()">
                <span class="answerCard">答题卡</span>
                <span v-show="!isOpenDynamic">
                    <UpOutlined />
                </span>
                <span v-show="!isCloseDynamic">
                    <DownOutlined />
                </span>
            </div>
            <div class="dragTitle" @mousedown="onEnterBlock($event)"
             v-show="isOpenDynamic">
                <div class="titleInner"></div>
            </div>
        </div>
        <div class="cardWrapper"  ref="cardWrapperDom">
            <div class="cardBox" v-for="(item,index) in answerPropData" :key="index">
                <div class="cardTitle">体系{{ item.pageNumber }}</div>
                <div class="cardLine">
                    <a
                        @click="jump(items.id)"
                        class="card"
                        v-for="(items,indexs) in item.question"
                        :key="indexs"
                        :class="{ 'isAlready': items.answer.answer }"
                    >{{ items.index }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, toRefs, } from 'vue';
import {
    DownOutlined,
    UpOutlined,
} from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        DownOutlined,
        UpOutlined,
    },
    emit: ['onJump'],
    props: {
        answerPropData: {
            default: () => ([{
                pageNumber: 1555,
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
                    },]
            }]),
        },
    },
    setup(props, { emit }) {
        const answerSheet = ref();
        const dynamicDom = ref();
        const cardWrapperDom = ref();
        const isOpenDynamic = ref(false);
        const isCloseDynamic = ref(false);
        const { answerPropData } = toRefs(props);
        const isCanMove = ref(false);
        const calcSlideHeight = ref(0); 
        const jump = (id: string) => {
            emit('onJump', id)
        };
        const onOpenCard = () => {
            let calcHeight = 0;
            answerPropData.value.map((item, index) => { calcHeight += (63 + 42 * Math.ceil(item.question.length / 15)) })
            calcSlideHeight.value = calcHeight;
            if (!isOpenDynamic.value && !isCloseDynamic.value) {
                isOpenDynamic.value = true;
                dynamicDom.value.style.height = `${calcHeight}px`
                cardWrapperDom.value.style.height = `${calcHeight}px`
                answerSheet.value.style.top = '-33px';

            } else {
                isOpenDynamic.value = !isOpenDynamic.value;
                isCloseDynamic.value = !isCloseDynamic.value;
                dynamicDom.value.style.height = isOpenDynamic.value ? `${calcHeight}px` : '0px';
                cardWrapperDom.value.style.height = isOpenDynamic.value ? `${calcHeight}px` : '0px';
                answerSheet.value.style.top = isOpenDynamic.value ?'-33px' :'-35px';

            }
        }
        const onEnterBlock = (e: any) => {
            isCanMove.value = true;
            let targetDivHeight = dynamicDom.value.offsetHeight;
            let startY = e.clientY;
            document.onmousemove = function (e) {
                e.preventDefault();
                //得到鼠标拖动的宽高距离：取绝对值
                var distY = Math.abs(e.clientY - startY);
                //往上方拖动：
                if (e.clientY < startY) {
                    cardWrapperDom.value.style.height = targetDivHeight + distY + 'px';
                    dynamicDom.value.style.height = targetDivHeight + distY + 'px';
                }
                //往下方拖动：
                if ( e.clientY > startY) {
                    cardWrapperDom.value.style.height = (targetDivHeight - distY) + 'px';
                    dynamicDom.value.style.height = (targetDivHeight - distY) + 'px';
                }
            };
            document.onmouseup = function () {
                let justifyStr = dynamicDom.value.style.height;
                let justifyHeight = justifyStr.substring(0,justifyStr.length-2);
                if(justifyHeight>300){
                    dynamicDom.value.style.height = 300 + 'px';
                    cardWrapperDom.value.style.height = 300 + 'px';
                    }
                 if(justifyHeight<35){
                    dynamicDom.value.style.height = 0 + 'px';
                    cardWrapperDom.value.style.height = 0 + 'px';
                    isOpenDynamic.value = false;
                    isCloseDynamic.value = false;
                    }
                    isCanMove.value = false;
                    document.onmousemove = null;
            }
        };
        return {
            onOpenCard,
            isOpenDynamic,
            isCloseDynamic,
            dynamicDom,
            cardWrapperDom,
            answerPropData,
            answerSheet,
            jump,
            isCanMove,
            onEnterBlock,
        }

    }
})
</script>

<style lang="stylus" scoped>
.canDrage
        transition 0.3s
.answerWrapper
        position fixed
        bottom  0
        height 0px
        width 100%
    .answerSheet
            position absolute
            top -35px
            height 35px
            padding 0 21px 
            line-height 35px
            font-size 12px
            background-color rgba(0,0,0,0)
            color rgba(42,46,54,.5)
            display flex
            justify-content flex-start
      .titleLeft
            cursor pointer
            padding 0 21px
            width 59px
            margin-right 20px
            border-radius 8px 8px 0 0 
            background-color #fff
            border 1px solid hsla(0,0%,59.2%,.2) 
            border-bottom 0
         .answerCard
            cursor pointer
            display inline-block
            margin-right 10px
        .closeTop
            bottom 0
      .dragTitle
            cursor pointer
            height 25px
            line-height 25px
            font-size 16px
            margin-top 10px 
            box-sizing border-box
            padding 0 20px
            background-color #fff
            border 1px solid hsla(0,0%,59.2%,.2)
            border-radius 8px 8px 0 0
            border-bottom 0
        .titleInner 
            width 23px 
            height 6px
            border-top 2px solid rgba(42,46,54,.5)
            border-bottom 2px solid rgba(42,46,54,.5) 
            display inline-block
    .cardWrapper
            height 0px
            overflow-y auto
            background-color #fff
            width 1024px
            box-shadow: rgba(219, 219, 219, 0.3) 0px -4px 15px 0px
            border 1px solid #eaeaea
        .cardBox
                box-sizing border-box
                padding 22px 24px 2px 24px
            .cardTitle
                    font-family PingFangSC-Regular,PingFang SC
                    font-weight 400
                    color #2a2e36
                    font-size 16px
                    margin-bottom 16px
            .cardLine
                    display flex
                    justify-content flex-start
                .card
                  width 28px
                  height 28px
                  line-height 28px
                  font-size 14px
                  border 1px solid #a6a8ae
                  color #a6a8ae
                  margin 0 16px 12px 0
                  text-align center
                  border-radius 3px   
                .isAlready
                    background rgba(24,144,255,.1);
                    border 1px solid #1890ff
                    color #1890ff;

</style>