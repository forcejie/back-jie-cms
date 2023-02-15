<template>
  <div class="login-panel">
    <h2 class="title">FORCEJIE-BACK_CMS</h2>
    <div class="tabs">
      <el-tabs
        type="border-card"
        v-model="activeName"
        stretch
        class="demo-tabs"
      >
        <el-tab-pane name="first">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account></pane-account>
        </el-tab-pane>
        <el-tab-pane name="second">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- footer -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="btn-login" size="large"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PaneAccount from "./pane-account.vue"

const activeName = ref("first")
const isRemPwd = ref(false)
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .controls {
    display: flex;
    margin-top: 12px;
    justify-content: space-between;
  }
  .btn-login {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
