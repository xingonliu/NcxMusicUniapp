<!-- /src/components/CustomTabBar.vue -->

<script setup lang="ts">
import { usePlayMusicStore } from '@/store/playMusic';
import { ref, computed, onMounted } from 'vue';
const usePlayMusic = usePlayMusicStore()

// 当前页面路径
const currentPath = ref('');

//计算属性获取值
const musicData = computed(() => usePlayMusic.playMusicData)

type TabItem = {
  pagePath: string;
  text: string;
  iconPath: string;
  selectedIconPath: string;
}
// tabBar 配置
const tabList: TabItem[] = [
  {
    pagePath: '/pages/index/index',
    text: '首页',
    iconPath: '/static/icon/ic_gallery_discover.png',
    selectedIconPath: '/static/icon/ic_gallery_discover_filled.png'
  },
  {
    pagePath: '/pages/my/my',
    text: '我的',
    iconPath: '/static/icon/ic_contacts_nickname.png',
    selectedIconPath: '/static/icon/ic_contacts_nickname_filled.png'
  }
];

// 是否显示 tabBar（仅 tab 页面显示）
const showTabBar = computed(() => {
  return tabList.some(item => item.pagePath === currentPath.value);
});

// 初始化：获取当前页面路径
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  currentPath.value = `/${currentPage.route}`;
});

// 跳转
const switchTab = (path: string) => {
  if (path === currentPath.value) return;
  uni.redirectTo({ url: path });
};
</script>

<template>

  <view class="music">
    <view class="music-img">
      <image :src="musicData?.cover" alt="">
      </image>
    </view>
    <view class="music-info">
      {{ musicData?.name }}-{{ musicData?.artist.join('/') }}
    </view>


  </view>

  <view v-if="showTabBar" class="custom-tab-bar">
    <view v-for="(item, index) in tabList" :key="index" class="tab-item"
      :class="{ active: item.pagePath === currentPath }" @click=" switchTab(item.pagePath)" :style="{
        marginRight: index === 0 ? '40px' : '0',
        marginLeft: index === 1 ? '40px' : '0'
      }">
      <image class="icon" :src="item.pagePath === currentPath ? item.selectedIconPath : item.iconPath"
        mode="aspectFit" />
      <text class="label">{{ item.text }}</text>
    </view>

    <view class="search">搜索</view>

  </view>
</template>

<style lang="scss" scoped>
// :root {
//   --window-bottom: env(safe-area-inset-bottom, 10px);
// }

.custom-tab-bar {
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;
  height: 50px;
  /* uni-app 安全区 */
  // bottom: calc(var(--window-bottom) + 10px);
  bottom: 20px;
  border-radius: 100px;
  background: #ededed77;
  backdrop-filter: blur(12px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  z-index: 999;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #888;

}

.tab-item.active {
  color: #e64340;
  font-weight: bold;
}

.icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4rpx;
}

.label {
  font-size: 12px;
  line-height: 1.2;
  /* 可自定义字体族 */
  /* font-family: "Alibaba PuHuiTi", "PingFang SC", sans-serif; */
}

.search {
  position: absolute;
  text-align: center;
  width: 80px;
  line-height: 30px;
  height: 30px;
  border-radius: 50px;
  // border: 4px solid #ffffffd3;
  background: linear-gradient(45deg, #72c9da 0%, #8149e0 100%);
  color: #fff;
  font-size: 12px;
  font-weight: bold;
}

.music {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  box-sizing: border-box;
  border-radius: 100px;
  height: 50px;
  background: rgba(255, 255, 255, 0.574);
  backdrop-filter: blur(12px);
  z-index: 998;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 8px;
  gap: 15px;

  .music-img {

    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #72c9da;

    image {
      border-radius: 50%;
      width: 34px;
      height: 34px;
    }

    .music-info {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>