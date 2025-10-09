import { getMusicDataApi, getMusicLyricApi, getSongUrlApi } from "@/apis/music";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayMusicStore = defineStore("playMusic", () => {

    let innerAudioContext: UniApp.InnerAudioContext | null = null;
    type Music = {
        id: string | string[] | number,//歌曲id
        name: string,//歌曲名
        url: string,//歌曲url
        artist: string[],//歌手
        cover: string,//歌曲封面
        time: number,//歌曲时长
        lrc: string//歌曲歌词


    }

    const playMusicData = ref<Music | null>({
        id: '',
        name: '',
        url: '',
        artist: [],
        cover: '',
        time: 0,
        lrc: ''
    }); //播放音乐信息
    const getMusicDataUrl = async (id: string) => { //获取歌曲url
        const res: MusicUrlResponse = await getSongUrlApi(id)
        console.log("歌曲url", res);

        playMusicData.value!.url = res.data.data[0].url
    }

    const getMusicData = async (id: string) => {//获取歌曲详情
        const res: SongDetailResponse = await getMusicDataApi(id)
        playMusicData.value!.id = res.data.songs[0].id
        playMusicData.value!.name = res.data.songs[0].name //歌曲名
        playMusicData.value!.artist = res.data.songs[0].ar.map(item => item.name)//歌手
        playMusicData.value!.cover = res.data.songs[0].al.picUrl//歌曲封面
        playMusicData.value!.time = res.data.songs[0].dt//歌曲时长
        console.log("歌曲信息", res);

    }
    const getMusicLrc = async (id: string) => {//获取歌曲歌词
        const res = await getMusicLyricApi(id)
        console.log("歌曲歌词", res.data.lrc.lyric);
        playMusicData.value!.lrc = res.data.lrc.lyric
    }


    const getMusicDataAll = async (id: string[]) => {
        await getMusicData(id[0])
        await getMusicDataUrl(id[0])
        await getMusicLrc(id[0])
        // 如果已有实例，先销毁旧的

        if (innerAudioContext) {
            try {
                innerAudioContext.pause();
                innerAudioContext.destroy();
            } catch (e) {
                console.warn("销毁旧音频失败", e);
            }
        }
        // 创建新的实例
        innerAudioContext = uni.createInnerAudioContext();
        innerAudioContext.autoplay = true;
        innerAudioContext.src = playMusicData.value!.url;
        innerAudioContext.onPlay(() => {
            console.log('开始播放');
        });
        innerAudioContext.onError((res) => {
            console.log(res.errMsg);
            console.log(res.errCode);
        });
    }



    return {
        playMusicData, //播放音乐信息
        getMusicDataAll //获取歌曲信息
    };
},// TODO: 持久化
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
