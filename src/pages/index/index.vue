<script setup lang="ts">
import customTabBar from "@/components/CustomTabBar/CustomTabBar.vue"
import navigationBar from "@/components/navigationBar/navigationBar.vue"
import { playListStore } from "@/store/playlist"
import { usePlayMusicStore } from "@/store/playMusic"
import { onLoad } from "@dcloudio/uni-app"
import { ref, onMounted, computed } from "vue"

//获取屏幕边界到安全区域的距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const playlist = playListStore()
const usePlay = usePlayMusicStore()


// 热门歌单数据
const hotPlaylists = computed(() => playlist.suggestPlayList)

// 热门歌曲数据
const hotSongs = computed(() => playlist.recommendPlaylist)


// 处理歌单点击
const handlePlaylistTap = (playlist: any) => {
  console.log('点击歌单:', playlist)
  uni.navigateTo({
    url: `/pages/playList/playList?id=${playlist.id}&name=${playlist.name}&cover=${encodeURIComponent(playlist.picUrl)}`
  })
}

// 处理歌曲点击
const handleSongTap = (songId: any) => {
  console.log('点击歌曲:', songId);

  usePlay.getMusicDataAll([songId])
}

onLoad(() => {
  playlist.getRecommend()
  playlist.getSuggestPlayList()
  console.log("index-hotPlaylists", hotPlaylists.value?.map(item => item.name));
  console.log("index-热门歌曲", hotSongs.value);


})


</script>

<template>
  <view class="container">
    <navigationBar></navigationBar>

    <!-- 主要内容区域 -->
    <view class="main-content" :style="{ paddingBottom: (safeAreaInsets?.bottom || 0) + 50 + 'px' }">

      <!-- 热门歌单推荐 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">热门歌单推荐</text>
        </view>
        <view class="playlist-scroll-container">
          <view class="playlist-item" v-for="(playlist, index) in hotPlaylists" :key="playlist.id"
            @tap="handlePlaylistTap(playlist)">
            <view class="playlist-cover">
              <image :src="playlist.picUrl" :alt="playlist.name" class="cover-image" />
              <view class="playlist-overlay">
              </view>
            </view>
            <view class="playlist-info">
              <text class="playlist-name">{{ playlist.name }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 热门歌曲推荐 -->
      <view class="section">
        <view class="section-header">
          <text class="section-title">热门歌曲推荐</text>
        </view>
        <view class="song-list">
          <view class="song-item" v-for="song in hotSongs" :key="song.id" @tap="handleSongTap(song.id)">
            <view class="song-cover">
              <image :src="song.al?.picUrl" :alt="song.name" class="cover-image" />
            </view>
            <view class="song-info">
              <text class="song-name">{{ song.name }}</text>
              <text class="song-artist">{{song.ar.map((item?: any) => item.name).join('/')}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <customTabBar></customTabBar>
  </view>
</template>

<style lang="scss">
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #F2F2F7;
  /* iOS 系统背景色 */
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', system-ui, sans-serif;
}

/* 主要内容区域 */
.main-content {
  padding: 16px;
  padding-top: 0;
}

/* 区块样式 */
.section {
  margin-bottom: 32px;
}

.section-header {
  padding: 20px 4px 16px 4px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  line-height: 30px;
}

.playlist-scroll-container {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 0 4px 12px 4px;

  /* 隐藏滚动条但保持滚动功能 */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.playlist-item {
  background: #FFFFFF;
  border-radius: 16px;
  width: 200px;
  height: 250px;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

}

.playlist-cover {
  position: relative;
  width: 100%;
  height: 80%;
  overflow: hidden;

  .cover-image {
    width: 100%;
    height: 100%;
    size: cover;
    // object-fit: cover;
  }
}

.playlist-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}




.playlist-info {
  padding: 5px 12px;
  flex: 1;
}

.playlist-name {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.playlist-artist {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 热门歌曲列表 - 横向滚动布局 */
.song-list {
  height: 130px;
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;

  /* 隐藏滚动条但保持滚动功能 */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
}

.song-item {
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
  width: 120px;

}

.song-cover {
  position: relative;
  width: 100%;
  height: 90%;
  overflow: hidden;

  .cover-image {
    width: 100%;
    height: 100%;
    size: cover;
    // object-fit: cover;
  }
}


.song-info {
  padding: 5px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.song-name {
  font-size: 14px;
  font-weight: 600;
  color: #000000;
  line-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song-artist {
  font-size: 12px;
  color: #8E8E93;
  line-height: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .container {
    background-color: #000000;
  }

  .playlist-item,
  .song-item {
    background-color: #1C1C1E;
    border: 0.5px solid #38383A;
  }

  .section-title,
  .playlist-name,
  .song-name {
    color: #FFFFFF;
  }

  .playlist-artist,
  .song-artist {
    color: #8E8E93;
  }
}

/* 响应式适配 */
@media screen and (max-width: 375px) {
  .main-content {
    padding: 12px;
  }

  .playlist-item {
    width: 180px;
    height: 220px;
  }

  .section-title {
    font-size: 22px;
  }

  .song-item {
    width: 120px;
  }

  .song-cover {
    height: 120px;
  }
}
</style>
