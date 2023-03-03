import { editUserData, newUserData } from "@/service/main/main"
import { deleteUserById, postUsersListData } from "@/service/main/system/system"
import { defineStore } from "pinia"
import type { ISystemState } from "./type"

const useSystemStore = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      // 删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      // 2.重新请求新的数据
      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})
export default useSystemStore
