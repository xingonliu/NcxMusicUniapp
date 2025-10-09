import { getPlaylistApi, getPresonApi, getRecommendApi } from '@/apis/music'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useUserStore } from './user'

export const playListStore = defineStore('playlist', () => {

    const userStore = useUserStore()
    // 计算属性 - 从store获取用户信息
    const account = computed(() => userStore.account)

    // 获取用户歌单
    const userPlaylist = ref<PlaylistArray>()
    const getTest = async () => {
        if (account.value?.userId) {
            const result = await getPlaylistApi(String(account.value.userId))
            console.log("获取用户歌单getPlaylistApi", result.data.playlist);
            userPlaylist.value = result.data.playlist
        }
    }

    // 获取每日推荐歌曲
    const recommendPlaylist = ref<Song[]>()
    const getRecommend = async () => {
        const res = await getRecommendApi()
        recommendPlaylist.value = res.data.data.dailySongs
        console.log("获取每日推荐歌曲", recommendPlaylist.value);

    }


    //获取推荐歌单
    const suggestPlayList = ref<PlaylistItem[]>()
    const getSuggestPlayList = async () => {
        const res = await getPresonApi()
        suggestPlayList.value = res.data.result
        console.log("获取推荐歌单", suggestPlayList.value);

    }

    return {
        userPlaylist, // 用户歌单
        getTest,// 获取用户歌单

        recommendPlaylist, // 每日推荐歌曲
        getRecommend,// 获取每日推荐歌曲


        suggestPlayList, // 推荐歌单
        getSuggestPlayList,// 获取推荐歌单

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


