<template>
  <div class="user">
    <!-- 用户信息 -->
    <div class="usertitle">
      <div class="usericon">
        <img :src="userinfo.avatar || tiktokIcon" alt="头像" />
      </div>
      <div class="userinfo">
        <div class="username">{{ userinfo.username }}</div>
      </div>
      <!-- 设置按钮 -->
      <div class="userstting">
        <van-icon name="setting-o" size="24" color="white" @click="onSettingsClick" />
      </div>
    </div>

    <!-- 用户功能单元格 -->
    <div class="usercell">
      <van-cell icon="vip-card-o" title="会员充值" is-link @click="onRechargeClick" />
      <van-cell icon="gift-o" title="邀请中心" is-link @click="onInviteCenterClick" />
      <van-cell icon="desktop-o" title="观看历史" is-link @click="onHistoryClick" />
      <van-cell icon="user-o" title="修改信息" is-link @click="onEditProfileClick" />
      <van-cell icon="info-o" title="隐私政策" is-link @click="onPrivacyPolicyClick" />
      <!-- 新增单元格：分享好友 -->
      <van-cell icon="share-o" title="分享好友" is-link @click="onShareClick" />
      <van-cell icon="question-o" title="关于我们" is-link @click="onAboutUsClick" />
      <van-cell icon="phone-o" title="联系我们" is-link @click="onContactUsClick" />
    </div>

    <!-- 社交媒体分享 -->
    <div class="grid-container">
      <van-grid :border="false" :column-num="4">
        <van-grid-item>
          <div class="grid-item-content">
            <van-icon :name="facebookIcon" size="32" color="#333" />
            <span class="title">Facebook</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="grid-item-content">
            <van-icon :name="youtubeIcon" size="32" color="#333" />
            <span class="title">youtube</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="grid-item-content">
            <van-icon :name="tiktokIcon" size="32" color="#333" />
            <span class="title">Tiktok</span>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div class="grid-item-content">
            <van-icon :name="instagramIcon" size="32" color="#333" />
            <span class="title">instagram</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 退出登录按钮 -->
    <div class="logout">
      <van-button type="danger" block @click="onLogoutClick">退出登录</van-button>
    </div>

    <!-- 分享面板 -->
    <van-share-sheet
      v-model:show="shareVisible"
      :options="shareOptions"
      @select="onShareSelect"
    />
  </div>
</template>

<script setup lang="ts">
import facebookIcon from '@/assets/Facebook.png';
import youtubeIcon from '@/assets/youtube.png';
import tiktokIcon from '@/assets/Tiktok.png';
import instagramIcon from '@/assets/instagram.png';

import { getuserInfo } from '../../api/login';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { showSuccessToast } from 'vant';
import { ref } from 'vue';

const userinfo = ref({});
const authStore = useAuthStore();
const router = useRouter();

// 获取用户信息
async function getuser() {
  const res = await getuserInfo();
  // console.log(res);
  userinfo.value = res.user;
}

// 设置按钮点击事件
const onSettingsClick = () => {
  console.log("点击了设置按钮");
};

// 会员充值点击事件
const onRechargeClick = () => {
  // console.log("点击了会员充值");
  router.push('/recharge')
};

// 观看历史点击事件
const onHistoryClick = () => {
  console.log("点击了观看历史");
};

// 修改信息点击事件
const onEditProfileClick = () => {
  console.log("点击了修改信息");
};

// 隐私政策点击事件
const onPrivacyPolicyClick = () => {
  console.log("点击了隐私政策");
};

// 邀请中心点击事件
const onInviteCenterClick = () => {
  console.log("点击了邀请中心");
};

// 关于我们点击事件
const onAboutUsClick = () => {
  console.log("点击了关于我们");
};

// 联系我们点击事件
const onContactUsClick = () => {
  console.log("点击了联系我们");
};

// 退出登录点击事件
const onLogoutClick = () => {
  authStore.logout();
  showSuccessToast('退出登录成功！！');
  router.push('/');
};

// 分享面板显示状态
const shareVisible = ref(false);

// 分享选项
const shareOptions = ref([
  {
    name: '复制链接',
    icon: 'link-o',
  },
  {
    name: '二维码',
    icon: 'qrcode',
  },
]);

// 点击分享好友时显示分享面板
const onShareClick = () => {
  shareVisible.value = true; // 显示分享面板
};

// 分享选项选择事件
const onShareSelect = (item) => {
  if (item.name === '复制链接') {
    // 模拟复制链接的操作
    console.log('复制了链接');
    showSuccessToast('链接已复制');
  } else if (item.name === '二维码') {
    // 模拟展示二维码的操作
    console.log('展示二维码');
    showSuccessToast('二维码已生成');
  }
};

// 获取用户信息
getuser();
</script>

<style scoped>
/* 四宫格样式 */
.grid-item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.number {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.title {
  font-size: 14px;
  color: #888;
  margin-top: 5px;
}

/* 用户信息部分 */
.usertitle {
  height: 150px;
  margin-bottom: 20px;
  background-color: steelblue;
  border-radius: 0px 0px 15px 15px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: relative;
}

.usericon {
  width: 60px;
  height: 60px;
  border-radius: 100%;
}

.usericon img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.userinfo {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.username {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.uservip {
  font-size: 20px;
  font-weight: bold;
  color: rgb(201, 201, 27);
  margin-top: 5px;
}

/* 设置按钮 */
.userstting {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

/* 单元格样式 */
.usercell {
  width: 100%;
  margin-top: 20px;
}

/* 退出登录按钮 */
.logout {
  margin-top: 20px;
  padding: 0 20px;
}
</style>
