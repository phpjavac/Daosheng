<template>
<div class="personalInfo">
<div>学生姓名：<span>{{'郭一'}}</span></div>
<div>班级：<span>{{'郭一'}}</span></div>
<div>院系：<span>{{'郭一'}}</span></div>
<div>总分：<span>{{'郭一'}}</span></div>
</div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
components: {},
setup(){
    return{}
}
})
</script>

<style lang="stylus" scoped>
.personalInfo
    display flex
    justify-content space-around
    background-color #fff
</style>