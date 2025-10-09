<template>
  <view class="playlist-container">
    <!-- 歌单信息头部 -->
    <view class="playlist-header">
      <view class="album-cover">
        <image :src="params.cover" class="cover-image" mode="aspectFill" />
      </view>
      <view class="playlist-info">
        <text class="playlist-name">{{ params.name || '歌单名称' }}</text>
        <text class="playlist-desc"></text>
      </view>
    </view>

    <!-- 歌曲列表 -->
    <view class="song-list">
      <view class="song-item" v-for="(song, index) in songList?.songs" :key="index" @tap="playMusic(song.id)">
        <view class="song-number">{{ index + 1 }}</view>
        <view class="song-details">
          <text class="song-title">{{ song.name }}</text>
          <text class="song-artist">{{song.ar.map((item?: any) => item.name).join('/')}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { getPlayListDataApi } from '@/apis/music';
import { usePlayMusicStore } from '@/store/playMusic';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';


const params = defineProps({ // 接收父组件传递过来的数据
  id: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },

})

const useMusic = usePlayMusicStore()

// 获取歌曲列表
const songList = ref<any>()
const getPlayList = async () => {
  const res = await getPlayListDataApi(params.id)
  songList.value = res.data
  console.log("歌曲列表", songList.value);

}

// 播放歌曲
const playMusic = async (id: number) => {
  const ids = [String(id)] //需要接到id数组
  await useMusic.getMusicDataAll(ids)//获取歌曲信息
  console.log(useMusic.playMusicData);//歌曲信息必备
}

onLoad(() => {
  getPlayList()
})

</script>

<style scoped>
.playlist-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 歌单信息头部 */
.playlist-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #e8e8e8;
  gap: 16px;
}

.album-cover {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ccc;
  flex-shrink: 0;
}

.cover-image {
  width: 100%;
  height: 100%;
}

.playlist-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.playlist-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  line-height: 1.2;
}

.playlist-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

/* 歌曲列表 */
.song-list {
  background-color: #fff;
  padding: 0;
}

.song-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  gap: 16px;
}

.song-item:last-child {
  border-bottom: none;
}

.song-number {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #666;
  flex-shrink: 0;
}

.song-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.song-title {
  font-size: 16px;
  color: #333;
  line-height: 1.4;
  font-weight: 500;
}

.song-artist {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}
</style>