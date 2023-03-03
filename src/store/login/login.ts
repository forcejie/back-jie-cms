import { defineStore } from "pinia"
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from "@/service/login/login"
import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"
import { LOGIN_TOKEN } from "@/global/constants"
import router from "@/router"
// import type { RouteRecordRaw } f+rom "vue-router"
import { mapMenusToRoutes } from "@/utils/map-menus"
import useMainStore from "../main/main"

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    userMenus: []
  }),
  // 请求数据
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录获取token等信息
      const loginResult = await accountLoginRequest(account)
      // console.log(loginResult)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      // 进行本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 2。获取登录用户的详细信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      console.log(userInfoResult)
      this.userInfo = userInfo
      //3 根据角色请求用户的权限
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      // 4进行本地缓存
      localCache.setCache("userInfo", userInfo)
      localCache.setCache("userMenus", userMenus)

      // 5.请求所有的roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
      // 动态路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute("main", route)
      })

      // 页面跳转main页面
      router.push("/main")
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache("userInfo")
      const userMenus = localCache.getCache("userMenus")

      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 请求所有的roles/departments资源
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
        // 2.动态的添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute("main", route))
      }
    }
  }
})

export default useLoginStore
