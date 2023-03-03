<template>
  <div class="user">
    <user-search
      @query-click="handleQuery"
      @reset-click="handleRefresh"
    ></user-search>
    <user-content ref="contentRef" @new-click="handleNewClick"></user-content>
    <user-modal ref="modalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import UserSearch from "./cpns/user-search.vue"
import UserContent from "./cpns/user-content.vue"
import { ref } from "vue"
import UserModal from "./cpns/user-modal.vue"

// 对content组件的操作
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQuery(formData: any) {
  console.log(formData)
  contentRef.value?.fetchUserListData()
}
function handleRefresh() {
  contentRef.value?.fetchUserListData()
}
// 对modal组件的操作
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
  modalRef.value?.setModalVisible()
}
</script>

<style lang="less" scoped></style>
