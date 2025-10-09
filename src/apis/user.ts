import { http } from '@/utils/http'

export const getUserDetailAPI = (uid: string) => { //获取用户详情 //弃用 
    return http({
        url: '/user/detail',
        method: 'POST',
        data: {
            uid
        }
    })
}

