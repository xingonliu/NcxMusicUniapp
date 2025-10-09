<template>
  <view class="login-container">
    <view class="login-header">
      <image src="/static/icon/logo.png" class="logo" mode="aspectFit" />
      <text class="title">网易云音乐登录</text>
      <text class="subtitle">请输入您的Cookie进行登录</text>
    </view>

    <view class="login-form">
      <view class="form-item">
        <text class="label">Cookie</text>
        <textarea 
          v-model="cookie"
          class="cookie-input"
          placeholder="请粘贴您的网易云音乐Cookie"
          :maxlength="2000"
          auto-height
        />
        <text class="help-text">从浏览器开发者工具中复制完整的Cookie字符串</text>
      </view>

      <button 
        class="login-btn" 
        :class="{ 'loading': isLoading }"
        :disabled="isLoading || !cookie.trim()"
        @click="handleLogin"
      >
        <text v-if="!isLoading">登录</text>
        <text v-else>登录中...</text>
      </button>

      <view class="help-section">
        <text class="help-title">如何获取Cookie？</text>
        <view class="help-steps">
          <text class="step">1. 打开浏览器，访问 music.163.com</text>
          <text class="step">2. 按F12打开开发者工具</text>
          <text class="step">3. 切换到 Network 标签页</text>
          <text class="step">4. 刷新页面，找到任意请求</text>
          <text class="step">5. 复制 Request Headers 中的 Cookie 值</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoginStore } from '@/store/login'

const loginStore = useLoginStore()
const { isLoading } = loginStore

const cookie = ref('')

const handleLogin = async () => {
  if (!cookie.value.trim()) {
    uni.showToast({
      title: '请输入Cookie',
      icon: 'none'
    })
    return
  }

  try {
    await loginStore.getUserLogin(cookie.value)
  } catch (error) {
    console.error('登录失败:', error)
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  display: flex;
  flex-direction: column;
}

.login-header {
  text-align: center;
  margin-bottom: 80rpx;
}

.logo {
  width: 120rpx;
  height: 120rpx;
  margin-bottom: 30rpx;
}

.title {
  display: block;
  font-size: 48rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20rpx;
}

.subtitle {
  display: block;
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.login-form {
  flex: 1;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20rpx;
  padding: 60rpx 40rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.1);
}

.form-item {
  margin-bottom: 40rpx;
}

.label {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.cookie-input {
  width: 100%;
  min-height: 200rpx;
  max-height: 400px;
  padding: 20rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 12rpx;
  font-size: 28rpx;
  line-height: 1.5;
  background: #fafafa;
  box-sizing: border-box;
}

.cookie-input:focus {
  border-color: #667eea;
  background: #fff;
}

.help-text {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
}

.login-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 44rpx;
  font-size: 32rpx;
  font-weight: bold;
  margin: 40rpx 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.login-btn:disabled {
  opacity: 0.6;
  background: #ccc;
}

.login-btn.loading {
  opacity: 0.8;
}

.help-section {
  margin-top: 60rpx;
  padding: 30rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  border-left: 6rpx solid #667eea;
}

.help-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.help-steps {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.step {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}

.step::before {
  content: '• ';
  color: #667eea;
  font-weight: bold;
}
</style>
