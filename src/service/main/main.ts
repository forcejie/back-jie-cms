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
