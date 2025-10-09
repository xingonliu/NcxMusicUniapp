import { defineStore } from 'pinia'
import { readonly, ref } from 'vue'



export const useUserStore = defineStore('user', () => {

    const account = ref<UserProfile | null>()//账号信息
    const setAccount = (data: UserProfile) => {//修改账号信息
        account.value = data
    }
    const clearAccount = () => {//清除账号信息
        account.value = null
    }

    const UserContentStats = ref<UserContentStats | null>() //用户信息 , 歌单，收藏，mv, dj 数量
    const setUserContentStats = (data: UserContentStats) => {
        UserContentStats.value = data
    }


    return {
        account: readonly(account),//账号信息
        UserContentStats: readonly(UserContentStats),//用户信息

        setUserContentStats,//修改用户信息
        setAccount,//修改账号信息
        clearAccount,//清除账号信息

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