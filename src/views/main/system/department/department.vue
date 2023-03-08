<template>
  <div class="department">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #leader="scope">
        <span class="leader">{{ scope.row[scope.prop] }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">{{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <page-modal :modal-config="modalConfigRef" ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import { ref, computed } from "vue"
import PageSearch from "@/components/page-search/page-search.vue"
import PageContent from "@/components/page-content/page-content.vue"
import PageModal from "@/components/page-modal/page-modal.vue"
// import PageContent from "./cpns/page-content.vue"
// import PageModal from "./cpns/page-modal.vue"

import searchConfig from "./config/search.config"
import contentConfig from "./config/content-config"
import modalConfig from "./config/modal.config"
import useMainStore from "@/store/main/main"

import usePageContent from "@/hooks/usePageContent"
import usePageModal from "@/hooks/usePageModal"
// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === "parentId") {
      item.options.push(...departments)
    }
  })
  return modalConfig
})

// 抽取hooks
// 点击search, content的操作
// const contentRef = ref<InstanceType<typeof PageContent>>()
// function handleQueryClick(queryInfo: any) {
//   contentRef.value?.fetchPageListData(queryInfo)
// }
// function handleResetClick() {
//   contentRef.value?.fetchPageListData()
// }
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content, modal的操作
// const modalRef = ref<InstanceType<typeof PageModal>>()
// function handleNewClick() {
//   modalRef.value?.setModalVisible()
// }
// function handleEditClick(itemData: any) {
//   modalRef.value?.setModalVisible(false, itemData)
// }
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped></style>
