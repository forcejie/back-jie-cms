<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/images/401586655401274385.jpg" />
      <h2 v-show="!isFold" class="title">FORCEJIE</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        :collapse="isFold"
        active-text-color="#fff"
        background-color="rgb(47, 48, 52)"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 动态组件 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleClick(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- <el-sub-menu>
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item>核心技术</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>部门管理</el-menu-item>
          <el-menu-item>菜单管理</el-menu-item>
          <el-menu-item>角色管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><ShoppingBag /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item>商品类别</el-menu-item>
          <el-menu-item>商品信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item>你的故事</el-menu-item>
          <el-menu-item>故事列表</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from "@/store/login/login"
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"
import { mapPathToMenu } from "@/utils/map-menus"
// 定义props 接收父组件传递的数据
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
// 1.获取菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
// console.log(userMenus)

// 监听item的点击
const router = useRouter()
function handleClick(item: any) {
  const url = item.url
  router.push(url)
}

// elmenu的默认菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ""
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: rgb(47, 48, 52);
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
    .img {
      // height: 100%;
      width: 36px;
      height: 36px;
      margin: 0 10px;
      border-radius: 18px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      white-space: nowrap;
    }
  }
}
.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    // background-color: rgb(47, 48, 52);
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #e9c6cf;
  }
}
</style>
