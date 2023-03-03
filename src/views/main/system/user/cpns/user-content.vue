<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button style="background-color: lightpink" @click="handleNewUser"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column
          align="center"
          type="selection"
          width="50px"
        ></el-table-column>
        <el-table-column
          align="center"
          type="index"
          width="60px"
          label="序号"
        ></el-table-column>
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="150px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        ></el-table-column>
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        >
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
              >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
            >
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template></el-table-column
        >
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              size="small"
              icon="Edit"
              text
              style="background-color: lightpink"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              icon="Delete"
              text
              style="background-color: lightpink"
              @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        :page-sizes="[10, 20, 30]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      /><el-pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia"
import useSystemStore from "@/store/main/system/system"
import { formatUTC } from "@/utils/format"
import { ref } from "vue"

// 定义事件
const emit = defineEmits(["newClick", "editClick"])

// 1.发起action， 请求usersList的数据
const systemStore = useSystemStore()
// systemStore.postUsersListAction()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()

// 2.获取usersList数据，进行显示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3.页码相关的逻辑

function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 4.定义函数, 用于发送网络请求
function fetchUserListData(formData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

// 删除/新建/编辑
function handleDelete(id: number) {
  systemStore.deleteUserByIdAction(id)
}
function handleNewUser() {
  // console.log("新建用户")
  emit("newClick")
}
function handleEdit(itemData: any) {
  emit("editClick", itemData)
}
defineExpose({ fetchUserListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}
.header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 8px;
  .title {
    font-size: 22px;
  }
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
