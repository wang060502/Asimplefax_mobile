<template>
  <div class="search">
    <!-- 顶部导航栏 -->
    <van-nav-bar title="搜索页" left-text="返回" left-arrow @click-left="goback">
      <template #right>
        <van-icon name="search" size="18" @click="handleSearch"/>
      </template>
    </van-nav-bar>

    <!-- 搜索框 -->
    <div class="search-box">
      <van-search
        v-model="searchQuery"
        placeholder="请输入搜索内容"
        @search="onSearch"
        show-action
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>

    <!-- 搜索结果提示 -->
    <div class="search-result">
      <span>搜索结果为：</span>
      <span class="result-number">{{ searchResults.length }}</span>
      <span>条</span>
    </div>

    <!-- 搜索结果列表 -->
    <van-list
      v-if="searchResults.length > 0"
      :finished="finished"

      finished-text="没有更多数据了"
    >
      <van-card
        v-for="(item, index) in searchResults"
        :key="index"
        :thumb="item.icon"
        :title="item.name"
        :desc="item.desc"
        :tag="item.type"
        class="search-card"
        @click="getplaypage(item.id,item.ftype)"
      >
        <!-- 可根据需求添加更多内容或操作 -->
      </van-card>
    </van-list>

    <!-- 如果没有数据 -->
    <div v-else class="no-result">
      <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="80"
        description="没有找到相关结果"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {GetSearch} from '../../api/home'
// 返回上一页
import { useRouter } from 'vue-router';
const router = useRouter();

// 搜索框的绑定数据
const searchQuery = ref('');
// 模拟的搜索结果
const searchResults = ref<Array<{ name: string; image: string; description: string; tag: string }>>([]);

// 搜索方法
async function onSearch() {
  const res = await GetSearch(searchQuery.value)
  // console.log(res)
  searchResults.value=res
}
const getplaypage = (id: number,ftype:number) => {
  console.log(id,ftype);
  const data={
    id:id,ftype:ftype
  }
  console.log(data);

  const params = JSON.stringify(data)
  router.push('/playpage/'+params)
};

const handleSearch = () => {
  router.push('/search')
};


function goback() {
  router.back();
}
onSearch()
</script>

<style scoped>
.search {
  padding: 20px;
}

/* 搜索框样式 */
.search-box {
  margin-top: 20px;
  padding: 10px;
}

/* 搜索结果数目样式 */
.search-result {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.search-result .result-number {
  font-size: 18px; /* 增大数字字体 */
  color: #e64340; /* 设置醒目的颜色，例如红色 */
  font-weight: bold; /* 加粗数字 */
  margin-right: 10px;
}

/* 没有搜索结果时的提示 */
.no-result {
  text-align: center;
  color: #999;
  margin-top: 30px;
}

/* 卡片样式 */
.search-card {
  margin-bottom: 16px;
}

/* 控制描述文本最大显示两行 */
.van-card__desc {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制显示两行 */
  -webkit-box-orient: vertical;
  overflow: hidden; /* 隐藏溢出的文本 */
  font-size: 14px; /* 可根据需要调整字体大小 */
  line-height: 1.5;
  color: #999;
}
</style>
