<template>
  <view class="user-info-section"
    :style="{ paddingTop: safeAreaInsets!.top + 'px', backgroundImage: `url(${account?.avatarUrl})` }">
    <view class="background" :style="{ paddingTop: safeAreaInsets!.top + 20 + 'px' }"></view>
    <view class="bulr" :style="{ paddingTop: safeAreaInsets!.top + 'px' }"></view>
    <!-- 用户信息区域 -->
    <view class=" user-profile">

      <!-- 用户头像 -->
      <view class="user-avatar" :style="{ backgroundImage: `url(${account?.avatarUrl})`, backgroundSize: 'cover' }">
        <view class="avatar-placeholder"></view>

        <!-- VIP徽章 -->
        <view class="vip-badge">
          <text class="vip-text">VIP</text>
        </view>
      </view>
    </view>

    <!-- 用户信息 -->
    <view class="user-details">
      <view class="username">{{ account?.nickname }}</view>
      <view class="user-level">lv : 9</view>
    </view>
  </view>


  <!-- 占位，保持右侧平衡 -->
  <view class="placeholder"></view>

</template>

<script lang="ts" setup>

import { useUserStore } from '@/store/user';
import { computed } from 'vue';


//获取屏幕边界到安全区域的距离
const { safeAreaInsets } = uni.getSystemInfoSync()
const useUser = useUserStore()

const account = computed(() => useUser.account)


</script>

<style lang="scss" scoped>
.user-info-section {
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
}

.background {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff00;
  backdrop-filter: blur(20px);
  border-radius: 0 0 10px 10px;
}

/* 占位元素，保持布局平衡 */
.placeholder {
  width: 40px;
  /* 与用户头像宽度一致 */
}

/* 用户信息区域 */
.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 5;
}

/* 用户头像 */
.user-avatar {
  border-radius: 50%;
  position: relative;
}

.avatar-placeholder {
  width: 60px;
  height: 60px;

  border-radius: 50%;
}

/* VIP徽章 */
.vip-badge {
  position: absolute;
  bottom: -2px;
  right: -2px;
  background-color: #000000;
  border-radius: 20px;
  padding: 1px 3px;
  min-width: 30px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.vip-text {
  font-size: 13px;
  color: #FFCC00;
  font-weight: bold;
  line-height: 1;
}

/* 用户详情 */
.user-details {
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 5;
}

.username {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  line-height: 1;
  padding-bottom: 5px;
}

.user-level {
  font-size: 16px;
  color: #595959;
  font-weight: bold;
  padding-top: 5px;
  line-height: 1;
}


/* 响应式适配 */
@media screen and (max-width: 375px) {
  .user-info-section {
    padding: 15px;
  }
}
</style>