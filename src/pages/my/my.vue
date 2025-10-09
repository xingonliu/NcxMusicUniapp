<template>
  <!-- 顶部紫色背景区域 -->
  <view class="header-section"
    :style="{ paddingTop: safeAreaInsets!.top + 'px', backgroundImage: `url(${userInfo.backgroundImg})` }">
    <!-- 已登录状态 -->
    <view class="login" v-if="loginStatus.isLoggedIn">
      <view class="user-profile">
        <view class="user-avatar">
          <image :src="userInfo.avatarUrl || '/static/icon/ic_contacts_nickname_filled.png'" class="avatar-img" />
        </view>
        <view class="user-info">
          <text class="username">{{ userInfo.nickname || '用户' }}</text>
        </view>
        <!-- 用户信息卡片 -->
        <view class="user-info-card">
          <view class="card-item">
            <text class="card-value">{{ userStats.level || 0 }}</text>
            <text class="card-title">Lv</text>
          </view>
          <view class="card-item">
            <text class="card-value">{{ userStats.days || 0 }}</text>
            <text class="card-title">天</text>
          </view>
          <view class="card-item">
            <text class="card-value">{{ userStats.playCount || 0 }}</text>
            <text class="card-title">次</text>
          </view>
          <view class="card-item">
            <text class="card-value">{{ userStats.playlistCount || 0 }}</text>
            <text class="card-title">歌单</text>
          </view>
          <view class="card-item">
            <text class="card-value">{{ userStats.followCount || 0 }}</text>
            <text class="card-title">关注</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 未登录状态 -->
    <view v-else>
      <view class="not-login" @click="goToLogin">点击登录</view>
    </view>
  </view>

  <!-- 主要内容区域 -->
  <scroll-view class="main-content" scroll-y>
    <!-- 已登录内容 -->
    <view class="login" v-if="loginStatus.isLoggedIn">
      <view class="title">
        我的歌单
        <view class="title-line"></view>
      </view>

      <!-- 其他歌单 -->
      <view class="MusicList" v-for="(playlist, index) in userPlaylists" :key="playlist.id" @tap="toList(playlist)"
        :style="{ paddingBottom: index == userPlaylists!.length - 1 ? safeAreaInsets!.bottom + 160 + 'px' : 0 }">
        <view class="MusicListHeader">
          <view class="MusicListImg">
            <image :src="playlist.coverImgUrl.replace('http:', 'https:')" class="playlist-cover" />
          </view>
          <view class="MusicListText">
            <view class="MusicListTitle">{{ playlist.name }}</view>
            <view class="MusicListAuthor">歌单-{{ playlist.trackCount }}首</view>
          </view>
        </view>


        <!-- <view class="MusicListOperation" @click="playPlaylist(playlist)">
          <image src="../../static/icon/ic_public_more_list.png" mode="aspectFit" />
        </view> -->


      </view>

      <!-- 退出登录按钮
      <view class="logout-section">
        <button class="logout-btn" @click="handleLogout">退出登录</button>
      </view> -->
    </view>

    <!-- 未登录内容 -->
    <view v-else>
      <view class="not-login-bottom">你还没有登录！</view>
      <view class="login-tips">
        <text class="tips-text">登录后可以享受更多功能：</text>
        <text class="tips-item">• 同步你的歌单</text>
        <text class="tips-item">• 收藏喜欢的音乐</text>
        <text class="tips-item">• 查看播放记录</text>
      </view>
    </view>
  </scroll-view>

  <!-- 底部安全区域
   
  <view class="bottom-safe-area" :style="{ height: (safeAreaInsets?.bottom || 0) + 80 + 'px' }"></view>
  -->

  <customTabBar></customTabBar>
</template>

<script lang="ts" setup>
import customTabBar from "@/components/CustomTabBar/CustomTabBar.vue"
import { ref, onMounted, computed } from "vue"
import { useUserStore } from '@/store/user'
import { useLoginStore } from '@/store/login'
// import { getLikeListApi, getPlaylistApi } from "@/apis/music"
import { playListStore } from "@/store/playlist"


// 获取屏幕边界到安全区域的距离
const { safeAreaInsets } = uni.getSystemInfoSync()

// 使用store
const userStore = useUserStore()
const loginStore = useLoginStore()
const playlistStore = playListStore()

// 响应式数据
const loginStatus = ref({
  isLoggedIn: false,
  hasCookie: false,
  hasToken: false,
  userInfo: null,
  loginTime: null
})

const userInfo = ref<any>({})
const userStats = ref<any>({})

const favoritePlaylist = ref<any>(null)

// 计算属性 - 从store获取用户信息
const account = computed(() => userStore.account)

//从playlist获取用户歌单
const userPlaylists = computed(() => playlistStore.userPlaylist)

// 检查登录状态
const checkLoginStatus = async () => {
  try {
    const islogin = loginStore.isLoading
    if (islogin) {
      loginStatus.value.hasCookie = true
      loginStatus.value.isLoggedIn = true

      // 如果有用户信息，更新userInfo
      if (account.value) {
        userInfo.value = {
          nickname: account.value.nickname || '用户',
          avatarUrl: account.value.avatarUrl || '/static/icon/ic_contacts_nickname_filled.png',
          backgroundImg: account.value.backgroundUrl || '',
          userId: account.value.userId,
          signature: account.value.signature || '',
          vipType: account.value.vipType || 0
        }

        // 更新用户统计信息
        userStats.value = {
          level: 0,
          days: Math.floor((Date.now() - (account.value.createTime || Date.now())) / (1000 * 60 * 60 * 24)),
          playCount: 0, // 这里可以后续添加播放次数统计
          playlistCount: 0, // 需要从其他API获取歌单数量
          followCount: 0 // 需要从其他API获取关注数量
        }
      }
    } else {
      loginStatus.value.isLoggedIn = false
      loginStatus.value.hasCookie = false
    }
  } catch (error) {
    console.error('检查登录状态失败:', error)
    loginStatus.value.isLoggedIn = false
  }
}

// 跳转到登录页面
const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  })
}

// 前往歌单
const toList = (playlist: any) => {
  const { id, name } = playlist
  const cover = playlist.coverImgUrl.replace('http:', 'https:')
  uni.navigateTo({
    url: `/pages/playList/playList?id=${id}&name=${name}&cover=${encodeURIComponent(cover)}`
    //URL 中包含特殊字符（如 =、/、?、& 等）时，直接拼接会导致参数解析错误,用encodeURIComponent()进行编码,r然后在playlistjie编码
  })
  console.log('播放歌单:', playlist, id, name, cover);
  // 这里可以添加播放逻辑

}



// 页面加载时检查登录状态
onMounted(async () => {
  await checkLoginStatus()

})


</script>



<style lang="scss">
// page {
//   background-color: #F2F2F7;
// }

.header-section {
  border-radius: 0 0 15px 15px;
  height: 280px;
  // position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
}

.user-profile {
  margin-top: -80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 40px;
  background-color: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-img {
  width: 60px;
  height: 60px;
  border-radius: 30px;
}

.user-info {
  text-align: center;
}

.username {
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  color: #000;
  font-weight: 500;
}

.main-content {
  border-radius: 22px 22px 0 0;
  position: fixed;
  top: 230px;
  // padding: 20px;
  bottom: 120px;
  // box-sizing: border-box;
  // position: fixed;
  // padding-top: 30%;
  width: 100%;
  height: calc(100vh - 230px);
  background-color: #F2F2F7;
  // padding-bottom: calc(60px + var(--window-bottom, 0px));

}

.user-info-card {
  backdrop-filter: blur(10px);
  // background-color: #f7f7f700;
  border-radius: 15px;
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .card-item {
    padding: 0 5px;

    .card-value {
      margin-right: 5px;
      font-size: 18px;
      color: #1C1C1C;
    }

    .card-title {
      font-size: 12px;
      color: #5B5B5B;
    }
  }


}







.MusicList {
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  // background-color: #d9d9d9;
  align-items: center;
  margin: 10px;

}


.MusicListHeader {
  display: flex;
  align-items: center;
  gap: 10px
}

.MusicListImg {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}


.MusicListTitle {
  font-size: 16px;
  color: #1C1C1C;
  padding-bottom: 10px;
}

.MusicListAuthor {
  font-size: 12px;
  color: #5B5B5B;
}


.title {
  font-size: 20px;
  font-weight: bold;
  margin: 20px;
  color: #000;
  position: relative;
}

.title-line {
  position: absolute;
  bottom: 1px;
  width: 80px;
  height: 6px;
  background-color: #ff9898;
  z-index: -1;
}



.not-login {
  width: 100px;
  height: 30px;

  background-color: #eaeaea;
  border-radius: 50px;
  margin: 0 auto;
  text-align: center;
  line-height: 30px;
}

.not-login-bottom {
  width: 200px;
  line-height: 50px;
  text-align: center;
  height: 50px;
  color: #000;
  font-size: 20px;
  font-weight: bold;
  margin: 50px auto;
}

.login-tips {
  margin: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;

  .tips-text {
    display: block;
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }

  .tips-item {
    display: block;
    font-size: 14px;
    color: #666;
    margin: 5px 0;
  }
}

.playlist-cover {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}

.logout-section {
  margin: 30px 20px;

  .logout-btn {
    width: 100%;
    height: 50px;
    background-color: #ff4757;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>