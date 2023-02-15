<template>
  <div class="app">
    <!-- <h2>app</h2>
    <router-link to="/main">主页</router-link>
    <router-link to="/login">登录</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.app {
  height: 100vh;
  width: 100wh;
  background-color: rgb(250, 228, 231);
}
</style>
