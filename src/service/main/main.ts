import hyRequest from ".."

export function getEntireRoles() {
  return hyRequest.post({
    url: "/role/list"
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: "/department/list"
  })
}
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: "/users",
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
