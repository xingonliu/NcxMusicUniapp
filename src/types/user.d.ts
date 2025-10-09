
/**
 * 用户内容统计数据响应
 * 通常用于表示用户在平台上的各类内容创建与订阅数量
 * 用户信息 , 歌单，收藏，mv, dj 数量
 * 
 */
interface UserContentStats {
    /**
     * 用户发布的节目（音频节目/播客）总数
     * @example 0
     */
    programCount: number;

    /**
     * 用户创建的电台（DJ Radio）总数
     * @example 0
     */
    djRadioCount: number;

    /**
     * 用户上传或关联的 MV 数量
     * @example 0
     */
    mvCount: number;

    /**
     * 用户关注或拥有的歌手（艺术家）数量
     * @example 0
     */
    artistCount: number;

    /**
     * 用户的新节目数量（可能指未读或近期发布的节目）
     * @example 0
     */
    newProgramCount: number;

    /**
     * 用户创建的 DJ 电台数量（与 djRadioCount 可能重复，但某些平台区分“创建”与“拥有”）
     * @example 0
     */
    createDjRadioCount: number;

    /**
     * 用户创建的歌单数量
     * @example 1
     */
    createdPlaylistCount: number;

    /**
     * 用户订阅（收藏）的歌单数量
     * @example 0
     */
    subPlaylistCount: number;

    /**
     * 接口响应状态码
     * - 200 表示请求成功
     * @example 200
     */
    code: number;
}

/**
 * 用户个人资料信息（完整版）
 * 账号信息
 */
interface UserProfile {
    /**
     * 内嵌的用户简要信息（部分字段与外层重复）
     */
    profile: {
        userId: number;
        userType: number;
        nickname: string;
        avatarImgId: number;
        // 如果 profile 还有其他字段，可继续补充
    };

    /**
     * 账户状态
     * - 0 通常表示正常
     * @example 0
     */
    accountStatus: number;

    /**
     * 账户类型
     * - 1 可能表示普通用户，其他值可能代表测试、企业等
     * @example 1
     */
    accountType: number;

    /**
     * 是否为主播（Anchor）
     * @example false
     */
    anchor: boolean;

    /**
     * 实名认证状态
     * - 0 表示未认证
     * @example 0
     */
    authStatus: number;

    /**
     * 是否已完成实名认证
     * @example false
     */
    authenticated: boolean;

    /**
     * 支持的认证类型（位掩码或枚举）
     * - 0 表示无认证类型
     * @example 0
     */
    authenticationTypes: number;

    /**
     * 用户权限等级
     * - 0 表示普通权限
     * @example 0
     */
    authority: number;

    /**
     * 头像详细信息（如 VIP 标识等）
     * - null 表示无特殊标识
     * @example null
     */
    avatarDetail: null | Record<string, any>; // 可根据实际结构细化

    /**
     * 头像图片资源 ID（用于生成 URL）
     * @example 109951169050083600
     */
    avatarImgId: number;

    /**
     * 用户头像完整 URL
     * @example "https://p1.music.126.net/.../109951169050083607.jpg"
     */
    avatarUrl: string;

    /**
     * 背景图资源 ID
     * @example 109951165096447820
     */
    backgroundImgId: number;

    /**
     * 个人主页背景图 URL
     * @example "https://p1.music.126.net/.../109951165096447821.jpg"
     */
    backgroundUrl: string;

    /**
     * 生日时间戳（毫秒）
     * - 可转换为 Date 对象
     * @example 1035332445267 → 对应 2002-10-23 左右
     */
    birthday: number;

    /**
     * 所在城市代码（中国行政区划代码）
     * - 360700 表示江西省赣州市
     * @example 360700
     */
    city: number;

    /**
     * 账户创建时间（Unix 毫秒时间戳）
     * @example 1515336918120 → 2018-01-07 左右
     */
    createTime: number;

    /**
     * 是否使用默认头像
     * @example false
     */
    defaultAvatar: boolean;

    /**
     * 用户简介（简短描述）
     * - null 表示未填写
     * @example null
     */
    description: string | null;

    /**
     * 详细个人介绍
     * - null 表示未填写
     * @example null
     */
    detailDescription: string | null;

    /**
     * DJ 状态（是否为电台主播）
     * - 0 表示否
     * @example 0
     */
    djStatus: number;

    /**
     * 专家标签（如“音乐达人”等）
     * - null 表示无标签
     * @example null
     */
    expertTags: string[] | null;

    /**
     * 专家认证信息（如认证领域）
     * - null 表示未认证为专家
     * @example null
     */
    experts: Record<string, string> | null;

    /**
     * 当前用户是否已关注该用户
     * @example false
     */
    followed: boolean;

    /**
     * 性别
     * - 0: 未知 / 保密
     * - 1: 男
     * - 2: 女
     * @example 1
     */
    gender: number;

    /**
     * 上次登录 IP 地址
     * @example "39.144.171.18"
     */
    lastLoginIP: string;

    /**
     * 上次登录时间（毫秒时间戳）
     * @example 1759128911906 → 2025-09-29 左右
     */
    lastLoginTime: number;

    /**
     * 地理位置状态（可能用于隐私控制）
     * - 30 可能表示已授权或公开
     * @example 30
     */
    locationStatus: number;

    /**
     * 是否为互相关注（双向关注）
     * @example false
     */
    mutual: boolean;

    /**
     * 用户昵称
     * @example "xingon45"
     */
    nickname: string;

    /**
     * 所在省份代码（中国行政区划）
     * - 360000 表示江西省
     * @example 360000
     */
    province: number;

    /**
     * 备注名（好友备注，当前用户视角）
     * - null 表示未设置
     * @example null
     */
    remarkName: string | null;

    /**
     * 短用户名（可能用于显示脱敏）
     * @example "********767"
     */
    shortUserName: string;

    /**
     * 个性签名
     * - 空字符串表示未设置
     * @example ""
     */
    signature: string;

    /**
     * 用户唯一 ID
     * @example 1335231335
     */
    userId: number;

    /**
     * 用户登录名（可能脱敏）
     * @example "1_********767"
     */
    userName: string;

    /**
     * 用户类型
     * - 0: 普通用户
     * - 其他值可能代表歌手、机构等
     * @example 0
     */
    userType: number;

    /**
     * VIP 类型
     * - 110 可能表示某种联合 VIP 或高级会员（网易云常见值）
     * @example 110
     */
    vipType: number;

    /**
     * VIP 类型版本时间戳（用于校验或刷新）
     * @example 1753664247936
     */
    viptypeVersion: number;
}