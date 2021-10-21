<script setup lang="ts">
/* eslint-disable no-use-before-define */

import { computed, reactive } from "@vue/reactivity";
import {Table as aTable, Button as aButton } from "ant-design-vue"
import { useStore } from "vuex";

const store = useStore()
const columns = [
  {
    title:"班级名称",
    dataIndex:"name",
    width:"400px"
  },
  {
    title:"班级人数",
    dataIndex:"stuNum",
    width:"200px"

  },
  {
    title:"学生明细",
    slots:{
      customRender:"detailed"
    },
    width:"200px"

  },
  {
    title:"所属教师",
    dataIndex:"teacherCodes",
    width:"400px"
  },
  {
    title:"操作",
    slots:{
      customRender:"operate"
    }
  }
]
/** 分页 */
 const pagination = reactive({
      pageNo: 1,
      pageSize: 5,
      total: 5,
      onChange: (currentPage: number) => {
        pageForm.pageNo = currentPage;
        getClassList()
      },
    });
/** 多选 */
type key = string | number

const selection = reactive({
      selectedRowKeys:[],
      onChange: (RowKeys: key[]) => {
        (selection.selectedRowKeys as unknown as key[]) = RowKeys;
      },
})

/** 数据 */
const dataSource = computed(() => store.state.classManage.classList) || []
const pageForm = reactive({
  pageNo:1,
  pageSize:5,
  search:"",
})
const getClassList = async () => {
  await store.dispatch("classManage/getClass",pageForm).then(res => {
    console.log(res)
    pagination.total = res
  })
}
getClassList()
</script>
<template>
  <div>
    <aTable
      :columns="columns"
      :pagination="pagination"
      :row-selection="selection"
      :data-source="dataSource"
      row-key="name"
    >
      <template #detailed="record">
        <aButton type="link">
          <span>查看</span>
        </aButton>
      </template>
      <template #operate="record">
        <a>编辑</a>｜
        <a>导入</a>｜
        <a>删除</a>
      </template>
    </aTable>
  </div>
</template>
<style lang ="stylus" scoped>
</style>