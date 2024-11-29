<template>
  <div class="login-container">
    <!-- 网站标题 -->
    <h1 class="site-title">Asimplefox</h1>

    <!-- 登录表单 -->
    <van-form @submit="handleLogin" class="login-form">
      <van-field
        v-model="username"
        label="账号名称"
        placeholder="请输入账号名称"
        required
        clearable
      />
      <van-field
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
        clearable
      />
      <van-button type="primary" block native-type="submit">登录</van-button>
    </van-form>

    <!-- 忘记密码与注册账号 -->
    <div class="additional-links">
      <a href="/forgot-password" class="forgot-password-link">忘记密码?</a>
      <span>|</span>
      <a href="/register" class="register-link">注册账号</a>
    </div>

    <!-- 三个圆形图标按钮 -->
    <div class="social-login">
      <van-button
        class="social-login-button"
        shape="circle"
        :icon="googleIcon"
        @click="handleGoogleLogin"
      ></van-button>
      <van-button
        class="social-login-button"
        shape="circle"
        :icon="facebookIcon"
        @click="handleFacebookLogin"
      ></van-button>
      <van-button
        class="social-login-button"
        shape="circle"
        :icon="appleIcon"
        @click="handleAppleLogin"
      ></van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import googleIcon from '@/assets/google.png';
import facebookIcon from '@/assets/Facebook.png';
import appleIcon from '@/assets/apple.png';
import { showSuccessToast, showFailToast } from 'vant';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {getLogin} from '../../api/login'
import { useAuthStore } from '../../stores/auth'

// 定义响应式数据
const username = ref('');
const password = ref('');
const router = useRouter();
// 获取 store
const authStore = useAuthStore()
// 登录处理
async function handleLogin(){
  // console.log('登录:', username.value, password.value);
  const res = await getLogin(username.value,password.value)
  // console.log(res)
  if (res.code !==200) {
    showFailToast('登录失败！请重新再试');
  }else{
    const token = res.token
    authStore.login(token)
    showSuccessToast('登录成功！！');
    router.push('/')
  }
};

// 谷歌登录处理
const handleGoogleLogin = () => {
  console.log('使用谷歌登录');
};

// Facebook 登录处理
const handleFacebookLogin = () => {
  console.log('使用 Facebook 登录');
};

// 苹果登录处理
const handleAppleLogin = () => {
  console.log('使用苹果登录');
};
</script>

<style scoped>
/* 页面布局样式 */
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 12px;
}

/* 网站标题样式 */
.site-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 40px;
  color: #333;
  font-weight: 600;
}

/* 登录表单样式 */
.van-field {
  margin-bottom: 16px;
}

.van-button {
  margin-top: 20px;
}

/* 其他登录方式与链接 */
.additional-links {
  text-align: center;
  margin-top: 20px;
}

.additional-links a {
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
}

.additional-links a:hover {
  text-decoration: underline;
}

.additional-links span {
  margin: 0 5px;
}

/* 社交登录按钮 */
.social-login {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

/* 圆形社交登录按钮 */
.social-login-button {
  width: 50px;
  height: 50px;
  border: none;
  font-size: 24px;
}

</style>
