<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleIcon">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <!-- <div class="bread">面包屑</div> -->
      <header-crumb></header-crumb>
      <header-info></header-info>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import headerInfo from "./cpns/header-info.vue"
import headerCrumb from "./cpns/header--crumb.vue"

// 内部自定义事件
const emit = defineEmits(["foldChange"])
// isFold记录状态
const isFold = ref(false)
function handleIcon() {
  // 内部状态改变
  isFold.value = !isFold.value
  // 将事件和状态传递给父组件
  emit("foldChange", isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
