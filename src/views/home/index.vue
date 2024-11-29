<template>
  <div class="home">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="list-switching" to="/classify">分类</van-tabbar-item>
      <van-tabbar-item icon="balance-pay" to="/recharge">订阅</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/userinfo">个人中心</van-tabbar-item>
    </van-tabbar>

    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const active = ref(0);  // 默认选中第一个 tab

// 获取当前路由信息
const route = useRoute();

// 在组件挂载时判断当前 URL 是否对应某个 tab
onMounted(() => {
  // 判断当前路由路径并设置对应的 tab
  switch (route.path) {
    case '/home':
      active.value = 0;
      break;
    case '/classify':
      active.value = 1;
      break;
    case '/recharge':
      active.value = 2;
      break;
    case '/userinfo':
      active.value = 3;
      break;
    default:
      active.value = 0;  // 默认选中首页
      break;
  }
});
</script>

<style scoped>
</style>
