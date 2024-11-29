<template>
  <div>
    <van-sticky>
    <!-- 导航栏 -->
    <div class="navbar">
      <div class="nav-left" @click="toggleSidebar">
        <img src="@/assets/menu.png" alt="Menu" class="nav-icon" v-if="!isSidebarOpen"/>
        <img src="@/assets/error.png" alt="Error" class="nav-icon" v-else/>
      </div>
      <div class="nav-center">
        <span class="website-name">Asimplefox</span>
      </div>
      <div class="nav-right" @click="handleSearch">
        <img src="@/assets/select.png" alt="Search" class="nav-icon" />
      </div>
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar" :class="{'sidebar-open': isSidebarOpen}">
      <ul>
        <li v-for="(item, index) in menuItems"
            :key="index"
            :class="{'active': selectedItem === index}"
            @click="selectItem(index)">
          <router-link :to="item.link" style="color: black;">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>

    <!-- 背景遮罩层 -->
    <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>
  </van-sticky>
  </div>
</template>





<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// 控制侧边栏是否打开
const isSidebarOpen = ref(false);

// 选中的菜单项索引
const selectedItem = ref<number | null>(null);
const router = useRouter();

// 菜单项与链接
const menuItems = [
  { name: '首页', link: '/' },
  { name: '分类页', link: '/classify' },
  { name: '会员充值', link: '/recharge' },
  { name: '个人中心', link: '/userinfo' },
  // { name: 'About Us', link: '/about' },
  // { name: 'Contact Us', link: '/contact' }
];

// 切换侧边栏的显示和隐藏
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// 选择菜单项
const selectItem = (index: number) => {
  selectedItem.value = index;
  // 可以添加更多逻辑，比如切换页面内容等
  isSidebarOpen.value= !isSidebarOpen.value;
};

// 处理搜索图标点击事件
const handleSearch = () => {
  router.push('/search')
};
</script>



<style scoped>
/* 导航栏样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  color: black;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001;
}

.nav-left, .nav-right {
  cursor: pointer;
}

.nav-center {
  flex: 1;
  text-align: center;
  font-size: 18px;
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.website-name {
  font-weight: bold;
  font-size: 20px;
}

/* 侧边栏样式 */
.sidebar {
  position: fixed;
  top: 0;
  left: -100%; /* 初始时，隐藏在屏幕外 */
  width: 250px;
  height: 100%;
  background-color: rgba(255, 255, 255);
  color: black;
  padding: 20px;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}
.sidebar ul {
  margin: 60px 0px;
}
.sidebar-open {
  left: 0;
}

/* 侧边栏菜单项样式 */
.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  color: black;
  margin: 15px 0;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.sidebar li:hover {
  background-color: #444;
}

/* 高亮选中项样式 */
.sidebar li.active {
  background-color: rgba(246, 246, 246);
  color: white;
  transform: scale(1.05);
}

/* 背景遮罩层 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>




