<template>
  <div>
    <!-- 下拉刷新组件 -->
    <van-pull-refresh
      v-model:loading="loading"
      @refresh="onRefresh"
    >
      <!-- 页面路由视图 -->
      <router-view></router-view>
    </van-pull-refresh>

    <!-- 浮动气泡 -->
    <van-floating-bubble
      v-model:show="showPicker"
      axis="xy"
      :icon="Multilingual"
      @click="handleBubbleClick"
      bottom="80px"
      right="50px"
    />

    <!-- 下拉菜单 -->
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        title="选择语言"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import Multilingual from '@/assets/Multilingual.png'
import { ref } from 'vue';
import { showSuccessToast } from 'vant';

// 控制浮动气泡的显示与隐藏
const showPicker = ref(false);
// const offset = ref({ x: 355, y: 565 });
// 当前选择的下拉菜单项
const fieldValue = ref('')

// 下拉菜单的选项
const columns = ref([
  { text: '中文', value: 'chinese_simplified' },
  { text: 'English', value: 'english' },
  { text: 'Francais', value: 'french' },
  { text: 'Espanol', value: 'spanish' },
  { text: '日本語', value: 'japanese' },
  { text: '한국어', value: 'korean' },
  { text: 'Русский', value: 'russian' },
  { text: 'italiano', value: 'italian' },
]);

// 控制下拉刷新的加载状态
const loading = ref(false);

// 浮动气泡点击事件
const handleBubbleClick = () => {
  showPicker.value = true;  // 显示下拉菜单
};

// 下拉刷新事件处理函数
const onRefresh = async () => {
  loading.value = true;
  showSuccessToast('刷新成功!');
  setTimeout(() => {
    loading.value = false;
    reloadPageData(); // 触发重新加载所有页面的数据
  }, 2000);
};

// 模拟浏览器刷新来重新加载所有页面数据
const reloadPageData = () => {
  window.location.reload();

};

// 选择语言
const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  fieldValue.value = selectedOptions[0].value;
  console.log(fieldValue.value);
  window.translate.changeLanguage(fieldValue.value)
};
</script>

<style scoped>
/* 调整浮动气泡的位置和样式 */
.van-floating-bubble {
  z-index: 1000; /* 确保浮动气泡在其他元素之上 */
}

/* Popup样式，确保它显示在页面底部 */
.van-popup {
  z-index: 999; /* 确保下拉菜单显示在气泡下方 */
}

/* 添加下拉刷新样式 */
.van-pull-refresh {
  height: 100vh; /* 确保拉动区域的高度 */
  overflow: auto;
}
</style>
