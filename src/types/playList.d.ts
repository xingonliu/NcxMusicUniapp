/**
 * 用户头像详情（当前数据中为 null，保留扩展性）
 */
interface AvatarDetail {
    // 可根据实际 API 补充字段，例如：identityIconUrl 等
}

/**
 * 歌单创建者（用户）信息
 */
interface Creator {
    accountStatus: number;           // 账号状态（0：正常）
    anchor: boolean;                 // 是否为主播
    authStatus: number;              // 认证状态（0：未认证）
    authenticationTypes: number;     // 认证类型
    authority: number;               // 权限值
    avatarDetail: AvatarDetail | null; // 头像挂件等详情
    avatarImgId: number;             // 头像图片 ID（数字形式）
    avatarImgIdStr: string;          // 头像图片 ID（字符串形式）
    avatarImgId_str: string;         // 同上，字段冗余（网易云历史原因）
    avatarUrl: string;               // 用户头像 URL
    backgroundImgId: number;         // 背景图 ID
    backgroundImgIdStr: string;      // 背景图 ID（字符串）
    backgroundUrl: string;           // 用户主页背景图 URL
    birthday: number;                // 生日时间戳（0 表示未设置）
    city: number;                    // 城市代码（如 360700 表示某市）
    defaultAvatar: boolean;          // 是否使用默认头像
    description: string;             // 简介（通常为空）
    detailDescription: string;       // 详细简介
    djStatus: number;                // DJ 状态
    expertTags: string[] | null;     // 专家标签（如“独立音乐人”等）
    experts: Record<string, string> | null; // 专家信息映射
    followed: boolean;               // 当前用户是否已关注该创建者
    gender: number;                  // 性别（0：未知，1：男，2：女）
    mutual: boolean;                 // 是否互相关注
    nickname: string;                // 用户昵称
    province: number;                // 省份代码（如 360000）
    remarkName: string | null;       // 备注名（好友备注，通常为 null）
    signature: string;               // 个性签名
    userId: number;                  // 用户 ID
    userType: number;                // 用户类型（0：普通用户）
    vipType: number;                 // VIP 类型（11 表示某类会员）
}

/**
 * 用户所有歌单（Playlist）数据结构
 */
interface Playlist {
    adType: number;                  // 广告类型（0 表示无广告）
    anonimous: boolean;              // 是否匿名（拼写应为 anonymous，但 API 如此）
    artists: unknown | null;         // 关联艺术家（歌单通常无此字段，为 null）
    backgroundCoverId: number;       // 背景封面 ID
    backgroundCoverUrl: string | null; // 背景封面 URL
    cloudTrackCount: number;         // 云盘歌曲数量
    commentThreadId: string;         // 评论线程 ID（格式如 "A_PL_0_歌单ID"）
    containsTracks: boolean;         // 是否包含歌曲（通常为 false，因 tracks 为 null）
    copied: boolean;                 // 是否已被当前用户复制
    coverImgId: number;              // 封面图 ID（数字）
    coverImgId_str: string;          // 封面图 ID（字符串，注意字段名下划线）
    coverImgUrl: string;             // 歌单封面图片 URL
    createTime: number;              // 创建时间（Unix 毫秒时间戳）
    creator: Creator;                // 歌单创建者信息
    description: string | null;      // 歌单描述（可能为 null）
    englishTitle: string | null;     // 英文标题（通常为 null）
    highQuality: boolean;            // 是否为高品质歌单
    id: number;                      // 歌单唯一 ID
    name: string;                    // 歌单名称
    newImported: boolean;            // 是否为新导入
    opRecommend: boolean;            // 是否为运营推荐
    ordered: boolean;                // 是否为有序歌单（通常为 true）
    playCount: number;               // 播放次数
    privacy: number;                 // 隐私设置（0：公开，10：私有）
    recommendInfo: unknown | null;   // 推荐信息（通常为 null）
    shareStatus: unknown | null;     // 分享状态
    sharedUsers: unknown | null;     // 共享用户列表
    specialType: number;             // 特殊类型（5 表示“我喜欢的音乐”）
    status: number;                  // 状态（0：正常）
    subscribed: boolean | null;      // 当前用户是否已收藏（null 表示未登录或未判断）
    subscribedCount: number;         // 收藏人数
    subscribers: unknown[];          // 收藏者列表（当前为空数组，可后续定义 Subscriber）
    tags: string[];                  // 歌单标签（“我喜欢的音乐”通常为空）
    titleImage: number;              // 标题图 ID（0 表示无）
    titleImageUrl: string | null;    // 标题图 URL
    top: boolean;                    // 是否置顶
    totalDuration: number;           // 歌单总时长（毫秒，0 表示未计算）
    trackCount: number;              // 歌曲数量
    trackNumberUpdateTime: number;   // 歌曲数量最后更新时间（时间戳）
    trackUpdateTime: number;         // 歌曲内容最后更新时间（时间戳）
    tracks: unknown | null;          // 歌曲列表（通常为 null，需单独接口获取）
    updateFrequency: string | null;  // 更新频率描述（如“每天更新”，null 表示无）
    updateTime: number;              // 歌单最后更新时间（时间戳）
    userId: number;                  // 创建者用户 ID（与 creator.userId 一致）
}

/**
 * 歌单数组类型
 */
type PlaylistArray = Playlist[];




/**
 * 网易云音乐歌单推荐接口的完整响应类型
 * 
 */
type PlaylistRecommendationResponse = {
    /**
     * 是否基于用户口味进行推荐（false 表示非个性化推荐）
     */
    hasTaste: boolean;

    /**
     * 接口返回状态码，200 表示成功
     */
    code: number;

    /**
     * 推荐分类标识，0 通常表示默认或通用类别
     */
    category: number;

    /**
     * 推荐歌单列表
     */
    result: PlaylistItem[];
};

/**
 * 单个歌单的数据结构
 */
type PlaylistItem = {
    /**
     * 歌单的唯一数字 ID
     */
    id: number;

    /**
     * 歌单类型，0 表示普通用户/系统歌单
     */
    type: number;

    /**
     * 歌单标题名称
     */
    name: string;

    /**
     * 宣传文案（当前数据中为空字符串）
     */
    copywriter: string;

    /**
     * 歌单封面图片的 URL 地址
     */
    picUrl: string;

    /**
     * 是否允许用户点击“不感兴趣”进行反馈
     */
    canDislike: boolean;

    /**
     * 歌单内曲目数量最后更新的时间戳（毫秒）
     */
    trackNumberUpdateTime: number;

    /**
     * 歌单累计播放次数
     */
    playCount: number;

    /**
     * 歌单包含的歌曲总数
     */
    trackCount: number;

    /**
     * 是否为高音质歌单（当前均为 false）
     */
    highQuality: boolean;

    /**
     * 使用的推荐算法标识（如：byNewUserGroup_combine）
     */
    alg: string;
};