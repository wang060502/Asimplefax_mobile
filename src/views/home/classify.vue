<template>
  <div class="classify">
    <!-- 导航栏 -->
    <van-nav-bar title="产品分类" left-text="返回" left-arrow @click-left="goback">
      <template #right>
        <van-icon name="search" size="18" @click="handleSearch"/>
      </template>
    </van-nav-bar>

    <div class="container">
      <!-- 左侧侧边栏 -->
      <div class="sidebar">
        <van-sidebar v-model="leftactive">
          <van-sidebar-item title="短剧专场" @click="onTabClick(0)" />
          <van-sidebar-item title="国风漫画" @click="onTabClick(1)" />
        </van-sidebar>
      </div>

      <!-- 右侧内容区 -->
      <div class="main-content">
        <van-tabs v-model:active="active" @click-tab="onClickTab" style="margin-top: 10px;">
          <van-tab :title="tab.title" v-for="(tab, index) in tablist" :key="index">
            <!-- 宫格列表 -->
            <van-grid :border="false" :column-num="3" v-if="typelist.records && typelist.records.length">
              <van-grid-item v-for="item in typelist.records" :key="item.id" class="griditem" @click="getplaypage(item.id,item.ftype)">
                <van-image class="gridimg" :src="item.icon" />
                <div class="grid-text">{{ item.name }}</div>
              </van-grid-item>
              <div class="footer" style="width: 100%; height: 10px; margin-bottom: 50px;"></div>
            </van-grid>

            <van-empty
            v-else
            image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
            image-size="80"
            description="暂无片源"
          />

            <!-- 分页 -->
            <van-pagination v-model="currentPage" :page-count="pagenum" mode="simple" @change="getcurrentpage" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetClassify } from '../../api/home';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const leftactive = ref(0);
const active = ref(0);
const type = ref('');
const pagenum = ref(1);
const tablist = ref([
  { title: '全部' },
  { title: '连载' },
  { title: '完结' },
]);

const typelist = ref([
  {
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    name: '苹果系列1',
  },
  {
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    name: '苹果系列2',
  },
  {
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg',
    name: '苹果系列3',
  },
  {
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg',
    name: '苹果系列4',
  },
  {
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-7.jpeg',
    name: '苹果系列5',
  },
  {
    icon: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-8.jpeg',
    name: '苹果系列6',
  },
]);

const currentPage = ref(1);

function goback() {
  router.back();
}

const handleSearch = () => {
  router.push('/search')
};
async function GetClassifylist() {
  // console.log(leftactive.value);
  const res = await GetClassify(type.value === '全部' ? ' ' : type.value, currentPage.value, leftactive.value);
  // console.log(res);

  typelist.value = res;
  pagenum.value = res.pages;
}

function onTabClick(ftype){
  // console.log(ftype);
  leftactive.value=ftype
  GetClassifylist();
}

function onClickTab({ title }) {
  type.value = title;
  GetClassifylist();
}

function getcurrentpage() {
  GetClassifylist();
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

GetClassifylist();
</script>

<style scoped>
.classify {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 容器，包含侧边栏和主内容 */
.container {
  display: flex;
  flex: 1;
}

/* 左侧侧边栏 */
.sidebar {
  width: auto;
  /* background-color: #f4f4f4; */
  padding: 10px;
  /* border-right: 1px solid #ddd; */
  box-sizing: border-box;
  height: 100%;
}

/* 右侧内容区 */
.main-content {
  flex-grow: 1;
  /* padding: 20px; */
  background-color: #fff;
  overflow-y: auto;
}

/* 宫格项样式 */
.griditem {
  width: 100px;
  height: 200px;
  margin-left: 35px;
  background-color: aqua;
}

.gridimg {
  width: 100px;
  height: 130px;
}

/* 宫格文字 */
.grid-text {
  width: 120px;
  text-align: center;
  margin-top: 8px;
  color: #333;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.van-tabs {
  margin-top: 20px;
}

</style>
