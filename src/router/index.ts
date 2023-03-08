import { createRouter, createWebHashHistory } from "vue-router"
import { localCache } from "@/utils/cache"
import { LOGIN_TOKEN } from "@/global/constants"
import { firstMenu } from "@/utils/map-menus"
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      name: "main",
      component: () => import("../views/main/main.vue")
      // children: [
      //   {
      //     path: "/main/analysis/overview",
      //     component: () =>
      //       import("../views/main/analysis/overview/overview.vue")
      //   },
      //   {
      //     path: "/main/analysis/dashboard",
      //     component: () =>
      //       import("../views/main/analysis/dashboard/dashboard.vue")
      //   },
      //   {
      //     path: "/main/system/user",
      //     component: () => import("../views/main/system/user/user.vue")
      //   },
      //   {
      //     path: "/main/system/role",
      //     component: () => import("../views/main/system/role/role.vue")
      //   }
      // ]
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/not-found/not-found.vue")
    }
  ]
})

// 参数：to：跳转到的位置， from从哪里跳转过来
router.beforeEach((to) => {
  // 只有登录成功，才可以进入main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith("/main") && !token) {
    return "/login"
  }

  // 如果是进入到main
  if (to.path === "/main") {
    return firstMenu?.url
  }
})
export default router
