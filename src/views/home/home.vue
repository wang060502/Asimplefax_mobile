<template>
  <div class="home">

    <Navbar></Navbar>

    <!-- 搜索 -->
    <!-- <van-search
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
    /> -->

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <div class="swipe-content">
          <img :src="item.url" alt="" />
          <div class="swipe-text">
            <h2>{{ item.title }}</h2>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>

    <div class="section-title">
      <h3>精选产品</h3>
    </div>

    <!-- 宫格列表 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in gridimgae" :key="item.id" class="griditem" @click="getplaypage(item.id,item.ftype)">
        <van-image
        class="gridimg"
          :src="item.icon"
        />
        <div class="grid-text">{{item.name}}</div>
      </van-grid-item>
    </van-grid>

    <div class="section-title">
      <h3>每周推荐</h3>
    </div>

    <!-- 普通布局列表 -->
<div class="custom-layout">
      <div  class="custom-item">
        <!-- 左侧图片 -->
        <van-image class="grid-img" :src="weekone[0].icon" />
        <!-- 右侧文字部分 -->
        <div class="text-section">
          <!-- 右上标题 -->
          <h3 class="title">{{  weekone[0].name}}</h3>
          <!-- 右下描述 -->
          <div class="description">
            <van-text-ellipsis :content="weekone[0].desc" rows="3"/>
            </div>
          <!-- 右下按钮 -->
          <van-button class="btn" size="small" type="primary" @click="getplaypage(weekone[0].id,weekone[0].ftype)">播放</van-button>
        </div>
      </div>
    </div>

    <div class="section-title">
      <h3>猜你喜欢</h3>
    </div>

    <!-- 滑动列表 -->
<div class="horizontal-scroll">
  <div class="monitor-item" v-for="(item, index) in monitorList" :key="index" @click="getplaypage(item.id,item.ftype)">
    <van-image :src="item.icon" width="100" height="130" />
    <div class="monitor-text">{{ item.name }}</div>
  </div>
</div>


<div class="section-title">
      <h3>最新产品</h3>
    </div>

    <!-- 宫格列表 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item v-for="item in newlist" :key="item.id" class="griditem" @click="getplaypage(item.id,item.ftype)">
        <van-image
        class="gridimg"
        :src="item.icon"
        width="100" height="130"
        />
        <div class="grid-text">{{item.name}}</div>
      </van-grid-item>
      <div class="footer" style="width: 100%; height: 10px; margin-bottom: 50px;"></div>
    </van-grid>

  </div>



</template>

<script lang="ts" setup>
import { GetBannerList, Getreclist,Getweekone,Gethotlist,Getnewlist } from '../../api/home'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/NavBar.vue';
const router = useRouter();
const value = ref('')
// 图片数据，包含图片路径、标题和描述
const images = ref([
  {
    src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    title: '苹果系列1',
    description: '最新款苹果产品，快来体验！'
  },
  {
    src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    title: '苹果系列2',
    description: '苹果系列新品上线，限时优惠！'
  },
])

const gridimgae = ref([
    {
      src:'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      text:'苹果系列1'
    },
    {
      src:'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
      text:'苹果系列2'
    },
    {
      src:'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg',
      text:'苹果系列3'
    },
    {
      src:'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg',
      text:'苹果系列4'
    },
    {
      src:'https://fastly.jsdelivr.net/npm/@vant/assets/apple-7.jpeg',
      text:'苹果系列5'
    },
    {
      src:'https://fastly.jsdelivr.net/npm/@vant/assets/apple-8.jpeg',
      text:'苹果系列6'
    },
  ])

const weekone =ref([{
  icon:'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
  name:'苹果系列1',
  desc:'苹果系列新品上线，限时优惠！苹果系列新品上线，限时优惠！苹果系列新品上线，限时优惠！苹果系列新品上线，限时优惠！'
}])

const monitorList = ref([
  { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg', name: '监控7监控7监控7监控7' },
  { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg', name: '监控8' },
  { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg', name: '监控9' },
  { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-4.jpeg', name: '监控10' },
  { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-7.jpeg', name: '监控11' },
  { src: 'https://fastly.jsdelivr.net/npm/@vant/assets/apple-8.jpeg', name: '监控12' }
]);

const newlist = ref([])


 async function GetBanner(){
  const res = await GetBannerList()
  // console.log(res);
  images.value=res
}

async function Getrec(){
  const res = await Getreclist()
  // console.log(res)
  gridimgae.value=res
  // console.log(gridimgae.value);

}
 async function Getweek(){
  const res = await Getweekone()
  // console.log(res)
  weekone.value = [res]
}
async function Gethot(){
  const res = await Gethotlist()
  // console.log(res)
  monitorList.value=res
}
async function Getnew(){
  const res = await Getnewlist()
  // console.log(res)
  newlist.value=res
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
onMounted(() => {
  GetBanner()
Getrec()
Getweek()
Gethot()
Getnew()
});

</script>

<style scoped>
.home{
  height: 1500px;
}
.my-swipe {
  margin-top: 10px;
}

.my-swipe .van-swipe-item {
  position: relative;
  color: #fff;
}

/* 设置轮播图的图片 */
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 200px;
  object-fit: cover; /* 保持图片比例填充 */
}

/* 文字内容的样式 */
.swipe-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.swipe-text {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.swipe-text h2 {
  margin: 0;
  font-size: 18px;
}

.swipe-text p {
  margin: 5px 0 0;
  font-size: 14px;
  white-space: pre-wrap; /* 强制文字不换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 如果文字过长，显示省略号 */
}

/* 标题居中 */
.section-title {
  text-align: center;
  margin-top: 20px;
}

.section-title h3 {
  font-size: 24px;
  color: #333;
}
.griditem{
  width: 100px;
  height: 200px;
  background-color: aqua;
}
.gridimg{
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
  white-space: nowrap; /* 强制文字不换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 如果文字过长，显示省略号 */
}


/* 普通布局的样式 */
.custom-layout {
  margin-top: 20px;
}

/* 单项内容的布局 */
.custom-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  /* padding: 10px; */
  /* background-color: #f5f5f5; */
  border-radius: 5px;
}

/* 左侧图片样式 */
.grid-img {
  width: 100px;
  margin-top: 20px;
  height: 130px;
  object-fit: cover;
  margin-left: 30px;
  margin-right: 15px;
}

/* 右侧文字内容 */
.text-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex-grow: 1;
}

/* 标题样式 */
.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

/* 文字描述样式 */
.description {
  font-size: 14px;
  color: black;
  width: 250px;
  /* height: 150px; */
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis; /* 文字溢出显示省略号 */
}

/* 按钮样式 */
.btn {
  align-self: flex-start;
}

/* 滑动列表的样式 */
.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}

.monitor-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  margin-right: 10px;
}

.monitor-text {
  margin-top: 8px;
  font-size: 14px;
  width: 80px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>
