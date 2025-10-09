import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { getLoginApi } from '@/apis/login'
// UserProfile类型在user.d.ts中定义，直接使用

export const useLoginStore = defineStore('login', () => {
    const isLoading = ref(false)
    const userStore = useUserStore()
    const getUserLogin = async (cookie: string) => {
        if (!cookie || !cookie.trim()) {
            uni.showToast({
                title: '请输入Cookie',
                icon: 'none'
            })
            return
        }

        isLoading.value = true
        try {
            // 检查Cookie是否包含必要字段
            const requiredFields = ['MUSIC_U', 'MUSIC_A', '__csrf']
            const missingFields = requiredFields.filter(field => !cookie.includes(field))

            if (missingFields.length > 0) {
                console.warn('⚠️ Cookie可能缺少必要字段:', missingFields)
            }

            // 解析并存储Cookie
            const cookieObj = parseCookieString(cookie)
            // console.log('🔑 解析到的Cookie字段数量:', Object.keys(cookieObj).length)

            // 将Cookie存储到本地
            uni.setStorageSync('netease_cookie', cookie)
            // 获取用户信息
            const userInfo = await getUserInfo(cookie)

            if (userInfo.data.code === 200) {
                // 尝试多种可能的数据结构路径
                const profileData = (userInfo as any).profile ||
                    (userInfo as any).result?.profile ||
                    (userInfo as any).data?.profile ||
                    (userInfo as any).account ||
                    (userInfo as any).result
                console.log("🔍 获取到的用户信息:", JSON.stringify(profileData, null, 2));


                if (profileData) {


                    // 标准化用户信息数据
                    const standardProfile: UserProfile = {
                        profile: {
                            userId: profileData.userId || profileData.id || profileData.uid || 0,
                            userType: profileData.userType || 0,
                            nickname: profileData.nickname || profileData.name || '用户',
                            avatarImgId: profileData.avatarImgId || 0
                        },
                        accountStatus: profileData.accountStatus || 0,
                        accountType: profileData.accountType || 1,
                        anchor: profileData.anchor || false,
                        authStatus: profileData.authStatus || 0,
                        authenticated: profileData.authenticated || false,
                        authenticationTypes: profileData.authenticationTypes || 0,
                        authority: profileData.authority || 0,
                        avatarDetail: profileData.avatarDetail || null,
                        avatarImgId: profileData.avatarImgId || 0,
                        avatarUrl: profileData.avatarUrl || profileData.avatar || '',
                        backgroundImgId: profileData.backgroundImgId || 0,
                        backgroundUrl: profileData.backgroundUrl || '',
                        birthday: profileData.birthday || 0,
                        city: profileData.city || 0,
                        createTime: profileData.createTime || Date.now(),
                        defaultAvatar: profileData.defaultAvatar || false,
                        description: profileData.description || profileData.signature || null,
                        detailDescription: profileData.detailDescription || null,
                        djStatus: profileData.djStatus || 0,
                        expertTags: profileData.expertTags || null,
                        experts: profileData.experts || null,
                        followed: profileData.followed || false,
                        gender: profileData.gender || 0,
                        lastLoginIP: profileData.lastLoginIP || '',
                        lastLoginTime: profileData.lastLoginTime || Date.now(),
                        locationStatus: profileData.locationStatus || 0,
                        mutual: profileData.mutual || false,
                        nickname: profileData.nickname || profileData.name || '用户',
                        province: profileData.province || 0,
                        remarkName: profileData.remarkName || null,
                        shortUserName: profileData.shortUserName || '',
                        signature: profileData.signature || profileData.description || '',
                        userId: profileData.userId || profileData.id || profileData.uid || 0,
                        userName: profileData.userName || '',
                        userType: profileData.userType || 0,
                        vipType: profileData.vipType || 0,
                        viptypeVersion: profileData.viptypeVersion || 0
                    }

                    console.log('🔍 标准化后的用户信息:', JSON.stringify(standardProfile, null, 2))

                    // 保存用户信息到store
                    userStore.setAccount(standardProfile)

                    console.log(`✅ 登录成功，用户: ${standardProfile.nickname} (ID: ${standardProfile.userId})`)

                    uni.showToast({
                        title: `欢迎，${standardProfile.nickname}`,
                        icon: 'success',
                        duration: 2000
                    })

                    // 跳转到个人页面
                    setTimeout(() => {
                        uni.navigateBack()
                    }, 1500)

                } else {
                    console.error('❌ 用户信息结构解析失败:')
                    throw new Error('用户信息数据不完整，请检查Cookie是否正确。如果问题持续，请尝试重新获取Cookie。')
                }

            } else if (userInfo && (userInfo as any).data.code === 301) {
                throw new Error('Cookie已过期，请重新登录网易云音乐后再试')
            } else {
                console.log(userInfo.code);
                const errorMsg = (userInfo as any)?.msg || (userInfo as any)?.message || '用户信息获取失败'
                throw new Error(errorMsg)
            }

        } catch (error: any) {


            let errorMessage = 'Cookie无效或已过期'

            if (error?.message) {
                errorMessage = error.message
            } else if (error?.errMsg) {
                errorMessage = `网络错误: ${error.errMsg}`
            }

            uni.showModal({
                title: '登录失败',
                content: errorMessage + '\n\n建议检查:',
                showCancel: false
            })

            // 清理无效Cookie
            uni.removeStorageSync('netease_cookie')

        } finally {
            isLoading.value = false
        }
    }

    // 解析Cookie字符串
    const parseCookieString = (cookieStr: string) => {
        const cookies: Record<string, string> = {}

        cookieStr.split(';').forEach(cookie => {
            const trimmed = cookie.trim()
            if (!trimmed) return

            const [key, ...rest] = trimmed.split('=')
            if (key && rest.length > 0) {
                cookies[key.trim()] = rest.join('=').trim()
            }
        })

        return cookies
    }

    // 获取用户信息
    const getUserInfo = async (cookie: string) => {
        try {
            const response = await getLoginApi()
            console.log('✅ 获取用户信息成功:', response)
            userStore.setAccount(response.data.profile)
            return response

        } catch (error: any) {
            console.error('❌ 获取用户信息失败详情:', error)
            throw error
        }
    }
    // 清理登录信息
    const logout = () => {
        const userStore = useUserStore()
        userStore.clearAccount()
        uni.removeStorageSync('netease_cookie')
        isLoading.value = false
        uni.showToast({
            title: '已退出登录',
            icon: 'success'
        })
    }

    // 检查登录状态
    const checkLoginStatus = async () => {
        const cookie = uni.getStorageSync('netease_cookie')
        if (!cookie) return false
        try {
            const userInfo = await getUserInfo(cookie)
            isLoading.value = true
            return userInfo && (userInfo as any).data.code === 200
        } catch (error) {
            logout()// 清理登录信息
            console.error('检查登录状态失败:', error)
            return false
        }
    }

    return {
        isLoading,
        getUserLogin,
        logout,
        checkLoginStatus
    }
},
    // TODO: 持久化
    {
        //仅在网页端生效
        // persist: true,
        //uni-app的持久化
        persist: {
            storage: {
                getItem(key) {
                    return uni.getStorageSync(key)
                },
                setItem(key, value) {
                    uni.setStorageSync(key, value)
                },
            },
        },

    })