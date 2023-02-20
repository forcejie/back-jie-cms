import { createRouter, createWebHashHistory } from "vue-router"
import { localCache } from "@/utils/cache"
import { LOGIN_TOKEN } from "@/global/constants"
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
      component: () => import("../views/main/main.vue")
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
})
export default router
