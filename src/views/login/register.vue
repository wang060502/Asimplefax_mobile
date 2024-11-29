<template>
  <div class="register-container">
    <h1 class="site-title">注册账号</h1>

    <!-- 注册表单 -->
    <van-form @submit="handleRegister" class="register-form">
      <!-- 昵称 -->
      <van-field
        v-model="nickname"
        label="昵称"
        placeholder="请输入昵称"
        required
        clearable
      />

      <!-- 邮箱 -->
      <van-field
        v-model="email"
        label="邮箱"
        placeholder="请输入邮箱"
        required
        clearable
        :rules="[ { required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱' } ]"
      />

      <!-- 密码 -->
      <van-field
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        required
        clearable
      />

      <!-- 确认密码 -->
      <van-field
        v-model="confirmPassword"
        label="确认密码"
        type="password"
        placeholder="请再次输入密码"
        required
        clearable
        :rules="[ { required: true, message: '请确认密码' }, { validator: checkPasswordMatch, message: '密码与确认密码不一致' } ]"
      />

      <!-- 邮箱验证码 -->
      <van-field
        v-model="sms"
        center
        clearable
        label="邮箱验证码"
        placeholder="请输入邮箱验证码"
        :rules="[{ required: true, message: '请输入验证码' }]">
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="sendVerificationCode"
            :disabled="isCodeSending || countdown > 0">
            {{ countdown > 0 ? `${countdown}秒后重新请求` : '发送验证码' }}
          </van-button>
        </template>
      </van-field>

      <!-- 邀请码（可选） -->
      <van-field
        v-model="inviteCode"
        label="邀请码"
        placeholder="请输入邀请码（可选）"
        clearable
      />

      <van-button type="primary" block native-type="submit" >
        注册
      </van-button>
    </van-form>

    <!-- 忘记密码与已有账号 -->
    <div class="additional-links">
      <a href="/login" class="login-link">已有账号</a>
      <span>|</span>
      <a href="/forgot-password" class="forgot-password-link">忘记密码?</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { showSuccessToast, showFailToast } from 'vant';
import { useRouter } from 'vue-router';
import {getVerificationCode,Postregisnlogin,getname} from '../../api/login'
// 响应式数据
const nickname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const inviteCode = ref(''); // 可选邀请码
const sms = ref('');//邮箱验证码
const countdown = ref(0); // 倒计时
const isCodeSending = ref(false); // 验证码是否正在发送

const router = useRouter();

// 校验密码是否一致
const checkPasswordMatch = (value: string) => {
  if (value !== password.value) {
    return '密码与确认密码不一致';
  }
  return true;
};


// 校验表单是否有效
// const isFormValid = computed(() => {
//   return (
//     nickname.value &&
//     email.value &&
//     password.value &&
//     confirmPassword.value &&
//     sms.value &&
//     checkPasswordMatch(null, confirmPassword.value, () => {})
//   );
// });

// 邮箱格式验证
const validateEmail = computed(() => {
  const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/;
  return regex.test(email.value);
});


// 发送验证码
const sendVerificationCode = async () => {
  if (!validateEmail.value) {
    showFailToast('请输入有效的邮箱');
    return;
  }

  // 开始倒计时
  isCodeSending.value = true;
  countdown.value = 120;

  const interval = setInterval(() => {
    if (countdown.value <= 0) {
      clearInterval(interval);
      isCodeSending.value = false; // 恢复按钮可点击
    } else {
      countdown.value--;
    }
  }, 1000);

  try {
    const res = await getVerificationCode(email.value)
    if (res.code===200) {
      showSuccessToast('验证码已发送');
    }
  } catch{
    showFailToast('验证码发送失败，请稍后再试');
    clearInterval(interval);
    isCodeSending.value = false;
  }
};
// 注册账号
const handleRegister = async () => {
  // 校验必填字段是否填写完整
  if (!nickname.value || !password.value || !email.value || !sms.value) {
    showFailToast('请填写完整的注册信息');
    return;
  }

  try {
    const checkRes = await getname(nickname.value);
    // console.log(checkRes);

    if (checkRes) {
      showFailToast('该昵称已被使用，请更换昵称');
      return;
    }


    const res = await Postregisnlogin(nickname.value,password.value, email.value,sms.value,inviteCode.value)
    // console.log(res)
    if (res.code ===200) {
      showSuccessToast('注册成功');
      router.push('/login'); // 注册成功后跳转到登录页面
    } else {
      showFailToast('注册失败，请稍后再试');
    }
  } catch{
    showFailToast('注册失败，请稍后再试');
  }
};

</script>

<style scoped>
/* 页面布局样式 */
.register-container {
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

/* 表单样式 */
.van-field {
  margin-bottom: 16px;
}

.van-button {
  margin-top: 20px;
}

/* 验证码按钮 */
.get-code-button {
  margin-top: 10px;
  width: 100%;
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
</style>
