import { http } from '@/utils/http'

export const getLoginApi = () => {//获取账号信息
    return http({
        url: "/user/account",
        method: 'GET'
    })
}
export const getUserStatusApi = () => {//获取登录状态

    return http({
        url: '/login/status',
        method: 'GET'
    })
}

export const loguotApi = () => {//退出登陆

    return http({
        url: '/logout'
    })
}

export const refreshApi = () => {//刷新登录
    return http({
        url: '/login/refresh'
    })
}