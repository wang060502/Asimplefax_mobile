<template>
  <div class="playpage">
    <van-nav-bar title="剧集播放" left-text="返回" left-arrow @click-left="goback">
      <template #right>
        <van-icon name="search" size="18" @click="handleSearch"/>
      </template>
    </van-nav-bar>

    <!-- 视频播放盒子 -->
    <div class="video-container">
      <!-- 视频播放器 -->
      <video
        class="video-player"
        controls
        :poster="poster"
        @ended="playNextEpisode"
      >
      <source :src="video" type="video/mp4" />
      <track
        kind="subtitles"
        :src="subtitleUrl1"
        srclang="en"
        label="English"
        ref="trackElement"
        default
      />
    </video>
    </div>

  <!-- 视频信息 -->
<div class="video-info">
  <h2>{{ title }}</h2>
  <van-tag type="primary" style="padding: 5px;">
    {{ type === '连载' ?  '更新至' + videoList.length + '集' : '全'+videoList.length + '集' }}
  </van-tag>
  <p>
    {{ desc }}
  </p>
</div>

<div class="episodetitle">
  <h3>选集</h3>
  <span @click="show=true">追剧日历- {{ type === '连载' ?  '更新至' + videoList.length + '集' : '全'+videoList.length + '集' }} ></span>
</div>
<!-- 视频集数 -->
<div :column-num="5" :border="false" class="episode-list">
      <div
       v-for="(episode,index) in videoList"
        :key="episode.id"
        class="episode-item"
        @click="playEpisode(index)"
      >
        <div class="episode-content" :style="{
            backgroundColor: selectedEpisode === index ? 'rgba(228, 250, 248)' : '',
            color: selectedEpisode === index ? 'rgba(6, 184, 172)' : ''
          }">
          <span>{{ index+1 }}</span>
          <!-- VIP集数角标 -->
          <div v-if="episode.astrict" class="vediovip">VIP</div>
        </div>
      </div>
    </div>

    <div class="section-title">
      <h3>猜你喜欢</h3>
    </div>

    <!-- 滑动列表 -->
<div class="horizontal-scroll">
  <div class="monitor-item" v-for="(item, index) in vediolivelist" :key="index" @click="getplaypage(item.id,item.ftype)">
    <van-image :src="item.icon" width="100" height="130" />
    <div class="monitor-text">{{ item.name }}</div>
  </div>
</div>

     <!-- 短剧日历 -->
  <van-action-sheet v-model:show="show" title="选集">
    <div class="grid-container">
      <van-grid :column-num="5" :border="false" class="episode-grid">
        <van-grid-item
          v-for="(episode, index) in videoList"
          :key="index"
          class="episode-grid-item"
          @click="playEpisode(index)"
        >
          <div class="episode-box" :style="{
              backgroundColor: selectedEpisode === index ? 'rgba(228, 250, 248)' : '',
              color: selectedEpisode === index ? 'rgba(6, 184, 172)' : ''
            }">
            <span>{{ index + 1 }}</span>
            <!-- VIP集数角标 -->
            <div v-if="episode.astrict" class="vip-badge">VIP</div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-action-sheet>

  <!-- 遮罩层：点击VIP剧集时显示 -->
  <van-overlay :show="vipshow" @click="vipshow = false">
      <div class="vip-popup">
        <h3>请充值成为会员</h3>
        <p>解锁VIP剧集，立即享受专属权益！</p>
        <van-button type="primary" @click="goToRecharge">前往充值</van-button>
        <van-button type="default" @click="vipshow = false" style="margin-left: 10px;">取消</van-button>
      </div>
    </van-overlay>


  </div>
</template>

<script setup lang="ts">
import { ref,watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { GetOneVedioList,SelVediodetail,GetVedioList } from '../../api/vedio'

const route = useRoute();
const router = useRouter();

// 存储视频信息
const videoInfo = ref<any[]>([]);
const videoList = ref<any[]>([]);
const vediolivelist = ref<any[]>([]);
const video = ref('')
// 当前播放剧集的索引
const selectedEpisode = ref<number | null>(null);
const show = ref(false)
const vipshow = ref(false)
const title = ref('');
const desc = ref('');
const type = ref('')
const poster = ref('')
const trackElement = ref<HTMLTrackElement | null>(null); // 引用 track 字幕元素
const subtitleUrl1 = ref('');
// 获取路由参数（视频ID）
const getid = () => {
  const id = route.params.id;
  const decodedId = decodeURIComponent(id as string);
  const ids = JSON.parse(decodedId);  // 解析ID对象
  // console.log(ids.ftype);
  GetOneVedio(ids.id,ids.ftype);  // 根据ID获取视频信息
  getVediodetail(ids.id)
  GetVediolive()
};

//获取单个视频列表
async function GetOneVedio(id: number,ftype:number) {
  try {
    const res = await GetOneVedioList(id,ftype);  // 调用API获取视频数据
    console.log(res);
    if (res && res.records && res.records.length > 0) {
      videoInfo.value = res.records[0];  // 设置视频信息
      title.value = res.records[0].name; // 设置标题
      desc.value = res.records[0].desc; // 设置描述
      type.value=res.records[0].type
      poster.value=res.records[0].icon
    } else {
      console.log("未找到视频数据");
    }
  } catch (error) {
    console.error("获取视频信息失败", error);
  }
}

//获取视频剧集
async function getVediodetail(id:number){
  const res = await SelVediodetail(id)
  // console.log('视频列表',res)
  videoList.value=res
  if (videoList.value.length > 0)
    playEpisode(0);  // 播放第一个剧集
  // console.log(videoList.value);
}

const loadSubtitles = async(videoUrl:string)=>{
  const subtitleUrl = videoUrl.replace('.mp4', '-en.json');
  const proxyUrl = subtitleUrl.replace('http://139.196.195.212:8081', '/api');
  console.log(subtitleUrl);
  // 使用 fetch 请求字幕文件
  const response = await fetch(proxyUrl);
  // 获取响应的 JSON 数据
  const subtitles = await response.json();
    console.log('字幕内容:', subtitles);
     // 转换字幕内容为 VTT 格式
  const vttContent = convertToVTT(subtitles);
  console.log('VTT 格式字幕:', vttContent);

  // 创建 Blob URL（VTT 格式字幕文件）
  const vttBlob = new Blob([vttContent], { type: 'vtt' });
  const vttBlobUrl = URL.createObjectURL(vttBlob);
  subtitleUrl1.value = vttBlobUrl;  // 将生成的 URL 赋值给 subtitleUrl
  console.log('生成的 Blob URL:', subtitleUrl1.value);
  const trackElement = document.querySelector('track');
  trackElement.src=subtitleUrl1.value
  console.log('Track Element src:', trackElement.src);
}

// 转换字幕为 VTT 格式
const convertToVTT = (subtitleData: any) => {
  const vttLines: string[] = ["WEBVTT\n\n"];  // VTT 文件头

  subtitleData.task_result.detailed_result.forEach((item: any, index: number) => {
    console.log(item.begin_time,item.end_time);

    const beginTime = formatVTTTime(item.begin_time/1000);
    const endTime = formatVTTTime(item.end_time/1000);
    const subtitleText = item.res.join(' ');  // 将字幕文本合并为一行

    // 每个字幕块格式：时间，字幕文本
    vttLines.push(`${beginTime} --> ${endTime}`);
    vttLines.push(subtitleText);
    vttLines.push("");  // 每个字幕段之间有一个空行
  });

  return vttLines.join("\n");
};

// 时间格式化函数，将秒数转换为 VTT 格式的时间字符串
const formatVTTTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  const milliseconds = Math.floor((timeInSeconds % 1) * 1000);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
};

// 补零函数，确保时间段的数字符合格式
const pad = (num: number, length: number = 2) => num.toString().padStart(length, "0");



const playEpisode = (index: number) => {
  const episode = videoList.value[index]; // 获取剧集对象
  if (episode.astrict) {
    console.log('是会员剧集');
    return vipshow.value = true;
  } else {
    console.log('不是会员剧集');
    video.value = episode.url;
    loadSubtitles(episode.url)
    selectedEpisode.value = index;
    // console.log(episode.url);
    // console.log(video.value);
    const videoElement = document.querySelector('.video-player') as HTMLVideoElement;
    videoElement.load();
    videoElement.play();
  }
};

// 播放下一集
const playNextEpisode = () => {
  if (selectedEpisode.value !== null && selectedEpisode.value < videoList.value.length - 1) {
    // 如果不是最后一集
    playEpisode(selectedEpisode.value + 1);  // 播放下一集
  }
};


//猜你喜欢
const  GetVediolive =async()=>{
  const res = await GetVedioList()
  // console.log('猜你喜欢',res);
  vediolivelist.value=res
}

//跳转至播放页
const getplaypage = (id: number,ftype:number) => {
  // console.log(id,ftype);
  const data={
    id:id,ftype:ftype
  }
  // console.log(data);

  const params = JSON.stringify(data)
  router.push('/playpage/'+params)
};

  // 前往充值页面
const goToRecharge = () => {
      // console.log('前往充值页面');
      vipshow.value = false;  // 关闭遮罩层
      router.push('/recharge')
    };

const handleSearch = () => {
  router.push('/search')
};


// 返回上一页
const goback = () => {
  router.back();
};


// 在组件挂载后获取视频信息
onMounted(() => {
  getid(); // 获取路由参数，并加载视频信息
  selectedEpisode.value=0
});
watch(getid, (newValue) => {
  console.log('视频源更新为:', newValue);  // 打印出最新的 video.source
});

</script>

<style scoped>
/* 播放页容器 */
.playpage {
  padding: 16px;
}

/* 视频播放容器 */
.video-container {
  position: relative;
  width: 100%;
  max-width: 800px; /* 限制视频宽度 */
  height: 350px; /* 设置高度 */
  margin: auto;
  background-color: #000;
  border-radius: 8px;
}

/* 视频播放器样式 */
.video-player {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 保持视频比例 */
}

/* 视频标题和状态 */
.video-info {
  margin-top: 20px;
}

.video-info h2 {
  font-size: 22px;
  font-weight: bold;
}

.video-info p {
  font-size: 16px;
  color: #666;
}

/* 视频集数列表 */
.episode-list {
  /* margin-top: 20px; */
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}

.episode-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.episode-content{
  position: relative;
  margin-right: 10px;
  border-radius: 10px;
}
.episode-item span {
  display: flex; /* 使用 flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 80px;
  height: 60px;
  overflow: hidden;
  font-size: 18px;
  border-radius: 4px; /* 可选：添加圆角 */
  font-weight: bold;
}
.vediovip{
position: absolute;
top: 0;
right: 0px;
font-size: 12px;
background-color: rgba(254, 220, 130);
text-align: center;
padding: 5px;
border-radius: 0px 0px 0px 8px;
color: rgba(127, 90, 22);
font-weight: bold;
}

.van-tag {
  font-size: 14px;
  color: #fff;
}
.episodetitle {
  display: flex;
  justify-content: space;
  align-items: center;
}

.episodetitle span {
  font-weight: 550;
  margin-left: 10px;
  color: rgba(168, 168, 168);
}
.content {
    padding: 16px 16px 160px;
  }
  .grid-container {
  padding: 10px;
}

/* 视频集数宫格 */
.episode-grid {
  margin-right: 10px;
  margin-top: 20px;
}

.episode-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.episode-box {
  position: relative;
  padding: 10px;
  border-radius: 10px;
  /* width: 50px;
  height: 40px; */
  text-align: center;
  cursor: pointer;
  font-weight: bold;
}

.episode-box span {
  display: block;
  line-height: 40px;
  width: 55px;
  height: 40px;
  font-size: 18px;
}

.vip-badge {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  background-color: rgba(254, 220, 130);
  text-align: center;
  padding: 5px;
  border-radius: 0px 0px 0px 8px;
  color: rgba(127, 90, 22);
  font-weight: bold;
}


.vip-popup {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  text-align: center;
  width: 80%; /* 宽度为80% */
  max-width: 300px; /* 最大宽度限制 */
  box-sizing: border-box;
  position: absolute;
  top: 50%; /* 垂直居中 */
  left: 50%; /* 水平居中 */
  transform: translate(-50%, -50%); /* 精确居中 */
  z-index: 1000; /* 确保弹窗在前面 */
}

.vip-popup h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.vip-popup p {
  font-size: 14px;
  margin-bottom: 20px;
}

.van-overlay {
  position: fixed; /* 遮罩层固定 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  z-index: 999; /* 确保遮罩层在弹窗下面 */
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
