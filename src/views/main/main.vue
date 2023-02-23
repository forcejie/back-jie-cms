<template>
  <div class="main">
    <el-container>
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-change="handleChange"></main-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <!-- <h2>main</h2>
    <button @click="handleExit">退出登录</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MainMenu from "@/components/main-menu/main-menu.vue"
// import { LOGIN_TOKEN } from "@/global/constants"
// import { localCache } from "@/utils/cache"
// import { useRouter } from "vue-router"

// const router = useRouter()
// function handleExit() {
//   // 删除token
//   localCache.removeCache(LOGIN_TOKEN)
//   // 跳回到login页面
//   router.push("/login")
// }

const isFold = ref(false)
function handleChange(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main-content {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none;
    -ms-overflow-style: none;
    transition: width 0.5s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
