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
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef"></pane-account>
        </el-tab-pane>
        <el-tab-pane name="second">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone></pane-phone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- footer -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      type="primary"
      class="btn-login"
      size="large"
      @click="handleLoginBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PaneAccount from "./pane-account.vue"
import PanePhone from "./pane-phone.vue"

const activeName = ref("account")
const isRemPwd = ref(false)

const accountRef = ref<InstanceType<typeof PaneAccount>>()
function handleLoginBtnClick() {
  if (activeName.value === "account") {
    accountRef.value?.loginAction()
  } else {
    console.log("用户已经登录")
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 80px;
  border-radius: 20px;
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
