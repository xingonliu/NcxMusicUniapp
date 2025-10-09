
//URL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
 * 免费试听权限信息
 */
type FreeTrialPrivilege = {
    /** 资源是否可消费（试听） */
    resConsumable: boolean;
    /** 用户是否可消费（试听） */
    userConsumable: boolean;
    /** 试听类型（当前为 null） */
    listenType: null | string;
    /** 无法试听的原因（当前为 null） */
    cannotListenReason: null | string;
    /** 播放原因（当前为 null） */
    playReason: null | string;
    /** 免费限制标签类型（当前为 null） */
    freeLimitTagType: null | string;
};

/**
 * 限时免费试听权限信息
 */
type FreeTimeTrialPrivilege = {
    /** 资源是否可消费 */
    resConsumable: boolean;
    /** 用户是否可消费 */
    userConsumable: boolean;
    /** 试听类型标识（0 表示无） */
    type: number;
    /** 剩余试听时间（毫秒） */
    remainTime: number;
};

/**
 * 单个音乐 URL 的详细信息
 */
type MusicUrlData = {
    /** 歌曲资源 ID */
    id: number;
    /** 可播放的音频 URL（带时效性） */
    url: string;
    /** 比特率（bps），例如 320000 表示 320kbps */
    br: number;
    /** 文件大小（字节） */
    size: number;
    /** 文件 MD5 校验值 */
    md5: string;
    /** 状态码（200 表示成功） */
    code: number;
    /** URL 有效期（秒），例如 1200 表示 20 分钟 */
    expi: number;
    /** 音频格式（如 "mp3"） */
    type: string;
    /** 音量增益（通常为 0） */
    gain: number;
    /** 音频峰值（归一化后最大为 1） */
    peak: number;
    /** 关闭增益（通常为 0） */
    closedGain: number;
    /** 关闭峰值（通常为 0） */
    closedPeak: number;
    /** 是否收费（0 表示免费） */
    fee: number;
    /** 未知字段，当前为 null */
    uf: null | string;
    /** 是否已付费（0 表示未付费） */
    payed: number;
    /** 标志位（通常为 1） */
    flag: number;
    /** 是否支持扩展（如更高音质） */
    canExtend: boolean;
    /** 免费试听信息（当前为 null） */
    freeTrialInfo: null | unknown;
    /** 音质等级（如 "exhigh" 表示极高音质） */
    level: 'standard' | 'exhigh' | 'lossless' | 'hires' | string;
    /** 编码类型（如 "mp3"） */
    encodeType: string;
    /** 声道布局（如 stereo，当前为 null） */
    channelLayout: null | string;
    /** 免费试听权限 */
    freeTrialPrivilege: FreeTrialPrivilege;
    /** 限时免费试听权限 */
    freeTimeTrialPrivilege: FreeTimeTrialPrivilege;
    /** URL 来源标识 */
    urlSource: number;
    /** 版权来源标识 */
    rightSource: number;
    /** 播客相关字段（当前为 null） */
    podcastCtrp: null | unknown;
    /** 音效类型（当前为 null） */
    effectTypes: null | unknown;
    /** 歌曲时长（毫秒） */
    time: number;
    /** 附加消息（当前为 null） */
    message: null | string;
    /** 音质混淆信息（当前为 null） */
    levelConfuse: null | unknown;
    /** 网易云音乐歌曲 ID（注意：虽然是数字，但 API 返回为字符串） */
    musicId: string;
    /** 伴奏信息（当前为 null） */
    accompany: null | unknown;
    /** 采样率（Hz），例如 44100 */
    sr: number;
    /** 音频效果（当前为 null） */
    auEff: null | unknown;
};

/**
 * 获取音乐 URL 接口的完整响应结构
 */
type MusicUrlResponse = {
    /** 歌曲 URL 数据列表（通常只包含一项） */
    data: {
        data: MusicUrlData[];
    }
    /** 接口状态码（200 表示成功） */
    code: number;
};






//DATA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
 * 艺人（歌手）信息
 */
type Artist = {
    /** 艺人 ID */
    id: number;
    /** 艺人名称 */
    name: string;
    /** 艺人译名（通常为空数组） */
    tns: string[];
    /** 艺人别名 */
    alias: string[];
};

/**
 * 专辑信息
 */
type Album = {
    /** 专辑 ID */
    id: number;
    /** 专辑名称 */
    name: string;
    /** 专辑封面 URL */
    picUrl: string;
    /** 专辑译名 */
    tns: string[];
    /** 封面图片 ID（字符串形式） */
    pic_str: string;
    /** 封面图片 ID（数字形式，可能因精度丢失而与 pic_str 不完全一致） */
    pic: number;
};

/**
 * 音频质量信息（如 h/m/l/sq/hr）
 */
type AudioQuality = {
    /** 比特率（bps），如 320000 */
    br: number;
    /** 文件 ID（通常为 0） */
    fid: number;
    /** 文件大小（字节） */
    size: number;
    /** 音质评分（负值表示质量较好） */
    vd: number;
    /** 采样率（Hz） */
    sr: number;
};

/**
 * 原曲简易信息（用于翻唱/改编曲关联原曲）
 */
type OriginSongSimpleData = {
    /** 原曲 ID */
    songId: number;
    /** 原曲名称 */
    name: string;
    /** 原曲艺人列表 */
    artists: {
        id: number;
        name: string;
    }[];
    /** 原曲所属专辑 */
    albumMeta: {
        id: number;
        name: string;
    };
};

/**
 * 单首歌曲的详细信息
 */
type SongData = {
    /** 歌曲完整名称 */
    name: string;
    /** 主标题（不含括号后缀） */
    mainTitle: string;
    /** 附加标题（如 "(童声版)"） */
    additionalTitle: string;
    /** 歌曲 ID */
    id: number;
    /** 歌曲状态（0 表示正常） */
    pst: number;
    /** 未知字段（通常为 0） */
    t: number;
    /** 艺人列表 */
    ar: Artist[];
    /** 歌曲别名（alia 是 alias 的缩写） */
    alia: string[];
    /** 热度/流行度（数值越大越热门） */
    pop: number;
    /** 歌曲状态码（0 表示正常） */
    st: number;
    /** 版权相关字段（通常为 null） */
    rt: null | string;
    /** 是否收费（0 表示免费） */
    fee: number;
    /** 版本号（用于去重或更新判断） */
    v: number;
    /** CRBT 彩铃信息（通常为 null） */
    crbt: null | string;
    /** 未知字段（通常为空字符串） */
    cf: string;
    /** 所属专辑 */
    al: Album;
    /** 歌曲时长（毫秒） */
    dt: number;
    /** 高品质音频信息（320kbps） */
    h: AudioQuality | null;
    /** 中品质音频信息（192kbps） */
    m: AudioQuality | null;
    /** 低品质音频信息（128kbps） */
    l: AudioQuality | null;
    /** 无损音质（通常为 null，若存在则为更高音质） */
    sq: AudioQuality | null;
    /** Hi-Res 音质（通常为 null） */
    hr: AudioQuality | null;
    /** 未知字段（通常为 null） */
    a: null | unknown;
    /** CD 编号 */
    cd: string;
    /** 歌曲在专辑中的序号 */
    no: number;
    /** 重定向 URL（通常为 null） */
    rtUrl: null | string;
    /** 文件类型（0 表示普通音频） */
    ftype: number;
    /** 重定向 URL 列表 */
    rtUrls: string[];
    /** DJ 电台 ID（非电台歌曲为 0） */
    djId: number;
    /** 版权标识（2 表示有版权） */
    copyright: number;
    /** 未知字段（通常为 0） */
    s_id: number;
    /** 标记位（用于内部逻辑） */
    mark: number;
    /** 封面来源类型（2 表示专辑封面） */
    originCoverType: number;
    /** 原曲简易信息（用于翻唱/改编） */
    originSongSimpleData: OriginSongSimpleData | null;
    /** 标签图片列表（通常为 null） */
    tagPicList: null | unknown;
    /** 资源是否可用 */
    resourceState: boolean;
    /** 歌曲版本号 */
    version: number;
    /** 跳转信息（通常为 null） */
    songJumpInfo: null | unknown;
    /** 娱乐标签（通常为 null） */
    entertainmentTags: null | unknown;
    /** 奖项标签（通常为 null） */
    awardTags: null | unknown;
    /** 显示标签（通常为 null） */
    displayTags: null | unknown;
    /** 是否为单曲（0 表示否） */
    single: number;
    /** 无版权推荐信息（通常为 null） */
    noCopyrightRcmd: null | unknown;
    /** MV ID（0 表示无 MV） */
    mv: number;
    /** 未知字段（通常为 0） */
    rtype: number;
    /** 重定向 URL（通常为 null） */
    rurl: null | string;
    /** 音质评分等级（9 表示极高） */
    mst: number;
    /** 版权提供方（0 表示无） */
    cp: number;
    /** 发布时间（毫秒时间戳） */
    publishTime: number;
};

/**
 * 歌曲权限信息（与用户权限、音质可播放/下载相关）
 */
type Privilege = {
    /** 歌曲 ID */
    id: number;
    /** 是否收费（0 表示免费） */
    fee: number;
    /** 是否已付费（0 表示未付费） */
    payed: number;
    /** 歌曲状态（0 表示正常） */
    st: number;
    /** 最高可播放比特率 */
    pl: number;
    /** 最高可下载比特率 */
    dl: number;
    /** 试听策略（7 表示可完整播放） */
    sp: number;
    /** 版权标识（1 表示有版权） */
    cp: number;
    /** 子权限（1 表示允许） */
    subp: number;
    /** 是否强制试听（false 表示否） */
    cs: boolean;
    /** 支持的最大比特率 */
    maxbr: number;
    /** 免费用户可播放比特率 */
    fl: number;
    /** 是否显示提示（toast） */
    toast: boolean;
    /** 标志位 */
    flag: number;
    /** 是否为预售歌曲 */
    preSell: boolean;
    /** 播放支持的最大比特率 */
    playMaxbr: number;
    /** 下载支持的最大比特率 */
    downloadMaxbr: number;
    /** 最大音质等级（如 "exhigh"） */
    maxBrLevel: string;
    /** 播放最大音质等级 */
    playMaxBrLevel: string;
    /** 下载最大音质等级 */
    downloadMaxBrLevel: string;
    /** 播放音质等级 */
    plLevel: string;
    /** 下载音质等级 */
    dlLevel: string;
    /** 免费音质等级 */
    flLevel: string;
    /** 未知字段（通常为 null） */
    rscl: null | unknown;
    /** 免费试听权限 */
    freeTrialPrivilege: {
        resConsumable: boolean;
        userConsumable: boolean;
        listenType: null | string;
        cannotListenReason: null | string;
        playReason: null | string;
        freeLimitTagType: null | string;
    };
    /** 版权来源 */
    rightSource: number;
    /** 各音质收费信息 */
    chargeInfoList: {
        /** 比特率 */
        rate: number;
        /** 收费跳转链接（通常为 null） */
        chargeUrl: null | string;
        /** 收费提示信息 */
        chargeMessage: null | string;
        /** 收费类型（0 免费，1 收费） */
        chargeType: number;
    }[];
    /** 状态码（0 表示成功） */
    code: number;
    /** 附加消息 */
    message: null | string;
    /** 播放音质等级列表（通常为 null） */
    plLevels: null | unknown;
    /** 下载音质等级列表 */
    dlLevels: null | unknown;
    /** 是否忽略缓存 */
    ignoreCache: null | boolean;
    /** 未知字段（通常为 null） */
    bd: null | unknown;
};

/**
 * 歌曲详情接口的完整响应结构
 */
type SongDetailResponse = {
    /** 歌曲列表（通常只包含一首） */
    data: {
        songs: SongData[];
        /** 对应的权限信息列表 */
        privileges: Privilege[];
    }
    /** 接口状态码（200 表示成功） */
    code: number;
};




