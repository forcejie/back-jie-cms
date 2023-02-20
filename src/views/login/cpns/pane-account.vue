<template>
  <div class="pane-account">
    <el-form
      label-width="60px"
      :rules="accountRules"
      ref="formRef"
      status-icon
      size="large"
      :model="account"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { FormRules, ElForm } from "element-plus"
import { ElMessage } from "element-plus"
import useLoginStore from "@/store/login/login"
import type { IAccount } from "@/types"
// account数据
const account = reactive<IAccount>({
  name: "",
  password: ""
})
// 校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: "必须输入帐号信息~", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: "必须是6~20数字或字母组成~",
      trigger: "blur"
    }
  ],
  password: [
    { required: true, message: "必须输入密码信息呢~", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "必须是3位以上的数字或者字母组成哦~",
      trigger: "blur"
    }
  ]
}

// 账号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的账号和密码
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求， 携带账号和密码
      // accountLoginRequest({ name, password }).then((res) => {
      //   console.log(res)
      // })
      loginStore.loginAccountAction({ name, password })
    } else {
      ElMessage.error("请你输入正确的格式再操作哦~~")
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
