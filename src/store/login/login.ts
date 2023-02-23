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

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}
const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    userInfo: localCache.getCache("userInfo") ?? {},
    userMenus: localCache.getCache("userMenus") ?? []
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
      // 根据角色请求用户的权限
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      // 进行本地缓存
      localCache.setCache("userInfo", userInfo)
      localCache.setCache("userMenus", userMenus)
      // 页面跳转main页面
      router.push("/main")
    }
  }
})

export default useLoginStore
