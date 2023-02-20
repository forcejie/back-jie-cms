<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handleExit">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"
import { useRouter } from "vue-router"

const router = useRouter()
function handleExit() {
  // 删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 跳回到login页面
  router.push("/login")
}
</script>

<style lang="less" scoped></style>
