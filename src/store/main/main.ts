import { defineStore } from "pinia"
import { getEntireRoles, getEntireDepartments } from "@/service/main/main"
interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}
const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRoles()
      const departmentResult = await getEntireDepartments()

      console.log(rolesResult, departmentResult)
      // 保存数据
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentResult.data.list
    }
  }
})
export default useMainStore
