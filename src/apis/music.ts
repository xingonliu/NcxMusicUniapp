import { http } from '@/utils/http'

export const getPlaylistApi = (uid: string) => { //获取用户歌单
    return http({
        url: '/user/playlist',
        method: 'POST',
        data: {
            uid,
            limit: 50,
            offset: 0
        }
    })
}

export const getRecommendApi = () => { //获取每日推荐歌曲
    return http({
        url: '/recommend/songs',
    })
}


export const getPresonApi = () => { //获取推荐歌单
    return http({
        url: '/personalized'
    })
}
export const getLikeListApi = (uid: string) => { //获取喜欢的音乐列表
    return http({
        url: '/likelist',
        data: {
            uid
        }
    })
}



/**
 *  网友精选
*/
export type TopPlayList = {
    /** 歌单名字 */
    name: string
    /** 歌单id */
    id: string
    /** 歌曲数量 */
    trackCount: number
    /** 歌单封面 */
    coverImgUrl: string
    /** 歌单描述 */
    description: string
    /** 总时长（毫秒），0 表示未计算 */
    totalDuration: number


}
export const getTopPlayListApi = () => {  //网友精选
    return http({
        url: '/top/playlist',
        data: {
            limit: 12,
            offset: 0,
            order: 'new'
        }
    })
}



export const getPlayListDataApi = (id: string) => { //获取歌单详情 SongListResponse
    return http({
        url: '/playlist/track/all',
        data: {
            id
        }
    })
}



export const getSongUrlApi = (id: string) => { //获取歌曲url
    return http({
        url: '/song/url/v1',
        data: {
            id,
            level: 'standard'  //'exhigh'极高//默认标准音质
        }
    })
}

export const getMusicDataApi = (id: string) => { //获取歌曲详情
    return http({
        url: '/song/detail',
        data: {
            ids: id
        }
    })
}

export const getMusicLyricApi = (id: string) => { //获取歌曲歌词
    return http({
        url: '/lyric',
        data: {
            id
        }
    })
}