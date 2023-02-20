import { defineStore } from "pinia"
import { accountLoginRequest } from "@/service/login/login"
import type { IAccount } from "@/types"
import { localCache } from "@/utils/cache"
import { LOGIN_TOKEN } from "@/global/constants"
import router from "@/router"
const useLoginStore = defineStore("login", {
  state: () => ({
    id: "",
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    name: ""
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录获取token等信息
      const loginResult = await accountLoginRequest(account)
      // console.log(loginResult)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 2。获取登录用户的详细信息

      // 页面跳转main页面
      router.push("/main")
    }
  }
})

export default useLoginStore
