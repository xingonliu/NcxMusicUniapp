/**
 * 歌曲艺术家信息
 */
type Artist = {
    id: number;           // 艺术家 ID
    name: string;         // 艺术家名称
    tns: string[];        // 翻译名（通常为空）
    alias: string[];      // 别名（通常为空）
}

/**
 * 专辑信息
 */
type Album = {
    id: number;           // 专辑 ID
    name: string;         // 专辑名称
    picUrl: string;       // 专辑封面 URL
    tns: string[];        // 翻译名
    pic_str: string;      // 封面 ID 字符串形式
    pic: number;          // 封面 ID（数字形式）
}

/**
 * 音频质量信息（如高清、标准等）
 */
type AudioQuality = {
    br: number;           // 比特率（bps）
    fid: number;          // 文件 ID（通常为 0）
    size: number;         // 文件大小（字节）
    vd: number;           // 音质评分（越小越好）
    sr: number;           // 采样率（Hz）
}

/**
 * 原始歌曲简要信息（用于翻唱/引用）
 */
type OriginSongSimpleData = {
    songId: number;       // 原曲 ID
    name: string;         // 原曲名称
    artists: {
        id: number;
        name: string;
    }[];                  // 原唱艺术家列表
    albumMeta: {
        id: number;
        name: string;
    };                    // 原专辑信息
}

/**
 * /recommend/songs每日歌曲 
 * 歌曲对象
 */
type Song = {
    name: string;                         // 歌曲名称
    mainTitle: string | null;             // 主标题（通常为 null）
    additionalTitle: string | null;       // 副标题（如“翻自 XXX”）
    id: number;                           // 歌曲 ID
    pst: number;                          // 推荐类型（0 表示普通）
    t: number;                            // 未知字段（通常为 0）
    ar: Artist[];                         // 歌手列表
    alia: string[];                       // 别名
    pop: number;                          // 热度（0-100）
    st: number;                           // 歌曲状态（0=正常，-200=无版权）
    rt: string;                           // 未知（通常为空）
    fee: number;                          // 是否收费（0=免费，1/8=VIP 或 付费）
    v: number;                            // 版本号
    crbt: string | null;                  // 彩铃信息（通常为 null）
    cf: string;                           // 未知（通常为空）
    al: Album;                            // 所属专辑
    dt: number;                           // 歌曲时长（毫秒）
    h: AudioQuality | null;               // 高品质音频信息
    m: AudioQuality | null;               // 中品质音频信息
    l: AudioQuality | null;               // 低品质音频信息
    sq: AudioQuality | null;              // 无损音质（如 FLAC）
    hr: AudioQuality | null;              // Hi-Res 音质（更高品质）
    a: unknown;                           // 未知字段（通常为 null）
    cd: string;                           // CD 编号（如 "01"）
    no: number;                           // 曲目编号
    rtUrl: string | null;                 // 重定向 URL（通常为 null）
    ftype: number;                        // 文件类型（0=普通）
    rtUrls: string[];                     // 重定向 URL 列表
    djId: number;                         // DJ ID（非电台歌曲为 0）
    copyright: number;                    // 版权状态（0=无限制，1=受限）
    s_id: number;                         // 未知（通常为 0）
    mark: number;                         // 标记位（用于权限等）
    originCoverType: number;              // 封面来源类型
    originSongSimpleData: OriginSongSimpleData | null; // 原曲信息（翻唱时存在）
    tagPicList: unknown;                  // 标签图片（通常为 null）
    resourceState: boolean;               // 资源是否可用
    version: number;                      // 版本号
    songJumpInfo: unknown;                // 跳转信息（通常为 null）
    entertainmentTags: unknown;           // 娱乐标签（通常为 null）
    awardTags: unknown;                   // 奖项标签（通常为 null）
    displayTags: unknown;                 // 展示标签（通常为 null）
    single: number;                       // 是否为单曲（0=否）
    noCopyrightRcmd: {
        type: number;
        typeDesc: string;
        songId: number | null;
        thirdPartySong: unknown;
        expInfo: unknown;
    } | null;                             // 无版权时的推荐信息
    mv: number;                           // MV ID（0 表示无 MV）
    rtype: number;                        // 资源类型（0=普通）
    rurl: string | null;                  // 资源 URL（通常为 null）
    mst: number;                          // 未知（通常为 9）
    cp: number;                           // 版权方 ID
    publishTime: number;                  // 发布时间（时间戳，毫秒）
}

/**
 * 歌曲权限信息（播放/下载权限）
 */
type Privilege = {
    id: number;                           // 歌曲 ID
    fee: number;                          // 是否收费（同 Song.fee）
    payed: number;                        // 是否已付费（0=否）
    st: number;                           // 歌曲状态（同 Song.st）
    pl: number;                           // 最高可播放音质比特率
    dl: number;                           // 最高可下载音质比特率（0=不可下载）
    sp: number;                           // 试听权限（7=可试听）
    cp: number;                           // 是否有版权（1=有）
    subp: number;                         // 是否支持子权限（通常为 1）
    cs: boolean;                          // 是否支持评论（通常为 false）
    maxbr: number;                        // 最大比特率（如 999000）
    fl: number;                           // 免费用户最高音质
    toast: boolean;                       // 是否提示（如无版权提示）
    flag: number;                         // 权限标志位
    preSell: boolean;                     // 是否为预售歌曲
    playMaxbr: number;                    // 播放最大比特率
    downloadMaxbr: number;                // 下载最大比特率
    maxBrLevel: 'lossless' | 'hires' | 'exhigh' | 'none'; // 最大音质等级
    playMaxBrLevel: 'lossless' | 'hires' | 'exhigh' | 'none';
    downloadMaxBrLevel: 'lossless' | 'hires' | 'exhigh' | 'none';
    plLevel: 'exhigh' | 'none';           // 播放音质等级
    dlLevel: 'lossless' | 'hires' | 'none'; // 下载音质等级
    flLevel: 'exhigh' | 'none';           // 免费音质等级
    rscl: unknown;                        // 未知（通常为 null）
    freeTrialPrivilege: {
        resConsumable: boolean;
        userConsumable: boolean;
        listenType: unknown;
        cannotListenReason: number | null;  // 1 表示无版权无法播放
        playReason: unknown;
        freeLimitTagType: unknown;
    };
    rightSource: number;                  // 权限来源
    chargeInfoList: {
        rate: number;                       // 比特率
        chargeUrl: string | null;
        chargeMessage: string | null;
        chargeType: number;                 // 0=免费，1=付费
    }[];
    code: number;                         // 状态码（0=成功）
    message: string | null;               // 消息（通常为 null）
    plLevels: unknown;
    dlLevels: unknown;
    ignoreCache: unknown;
    bd: unknown;
}

/**
 * 歌曲列表 API 响应结构
 */
type SongListResponse = {
    data: {
        dailySongs: Song[];                  // 歌曲列表
        privileges: Privilege[];              // 每首歌对应的权限信息

    }

    code: number;                         // 接口状态码（200=成功）
}
