import hyRequest from "@/service"

// 用户信息
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: "/users/list",
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}