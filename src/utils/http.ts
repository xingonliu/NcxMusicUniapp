import { useUserStore } from "@/store/user"

// 请求基地址
const baseURL = 'https://1313212416-e24y60n3lr.ap-guangzhou.tencentscf.com'

//拦截方法：
const httpInterceptor = {
    //uniapp自带拦截器
    invoke(options: UniApp.RequestOptions) {
        // 1. 非 http 开头需拼接地址
        // 例如/home
        if (!options.url.startsWith('http')) {
            options.url = baseURL + options.url
        }
        // 2. 请求超时
        options.timeout = 10000
        //3.伪造电脑端发送请求
        options.header = {
            "Cookie": uni.getStorageSync('netease_cookie'),
            'source-client': 'pc',
            //如果需要再添加自定义请求头，保留source-client
            ...options.header,
        }
    },




}


//拦截器
uni.addInterceptor('request', httpInterceptor)



export const http = (options: UniApp.RequestOptions) => {
    return new Promise<any>((resolve, reject) => {
        uni.request({
            ...options,
            // 响应成功
            //uni.request() 的success只要有响应就会触发，不像axios必须2xx的才调用resolve
            //所以还要继续处理res的状态码
            success: (res) => {
                //200~300内的状态码都是成功
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    //提取响应数据
                    resolve(res)
                    //401为失败，清理用户信息然后调转登录页
                } else if (res.statusCode === 401) {
                    const useUser = useUserStore()
                    //清除会员信息
                    useUser.clearAccount()
                    //2.跳转到登录页
                    uni.navigateTo({
                        url: '/pages/login/login',
                    })
                    //3.拒绝promise
                    reject(res)
                } else {
                    uni.showToast({
                        title: ('请求失败'),
                        icon: 'none',
                    })
                    //拒绝promise
                    reject(res)
                }
            },
            // 响应失败
            fail: (err) => {
                uni.showToast({
                    //提示请求失败更换网络
                    title: '请求失败，请检查网络',
                    icon: 'none',
                })
                reject(err)
            },
        })
    })
}