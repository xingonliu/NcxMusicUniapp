/**
 * Cookie登录脚本 - 浏览器控制台版本
 * 基于LuorixDev的GPL3脚本改造
 * 可以直接在浏览器控制台中运行
 */

(async () => {
    /* ====== 脚本作者Github LuorixDev GPL3 ====== */
    /* ====== 替换为你自己的 Cookie 字符串 ====== */
    const newCookieString = `请替换这里`; // ← 请替换这里！

    if (newCookieString === '请替换这里') {
        console.error('❌ 请先替换cookie字符串！');
        alert('请先替换cookie字符串！');
        return;
    }

    try {
        console.log('🚀 开始Cookie登录流程...');

        /* === 0. 清除现有 Cookie === */
        console.log("🚿 [0] 清空可写 Cookie …");
        const currentCookies = document.cookie.split(";").filter(Boolean);
        if (currentCookies.length === 0) {
            console.log("⚪ 当前无可清除 Cookie。");
        } else {
            for (const kv of currentCookies) {
                const name = kv.split("=")[0].trim();
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
                console.log("🗑️ 删除:", name);
            }
            console.log("✅ Cookie 清除完成（HttpOnly Cookie 不可移除）。");
        }

        /* === 1. 写入新 Cookie === */
        console.log("📥 [1] 写入新 Cookie …");
        const maxAgeSeconds = 60 * 60 * 24 * 15; // 15天
        const cookieArray = [];

        for (const cookie of newCookieString.split(";")) {
            const c = cookie.trim();
            if (!c) continue;

            const [key, ...rest] = c.split("=");
            const value = rest.join("=");
            if (!key || !value) continue;

            const encoded = `${key}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}`;
            document.cookie = encoded;
            console.log("🍪 写入持久 Cookie:", encoded);

            // 同步写入 localStorage
            localStorage.setItem(`cookie-${key}`, value);
            console.log(`💾 localStorage 写入: cookie-${key} = ${value}`);

            cookieArray.push(`${key}=${value}`);
        }

        // 保存完整cookie到localStorage
        const fullCookieString = cookieArray.join('; ');
        localStorage.setItem('music_cookie', fullCookieString);
        localStorage.setItem('user-cookie', fullCookieString);

        console.log("✅ 新 Cookie 写入完成。");

        /* === 2. 获取用户信息 === */
        console.log("🌐 [2] 正在请求 /user/account …");
        let payload;
        try {
            const res = await fetch("/user/account", { 
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!res.ok) {
                throw new Error(`HTTP错误: ${res.status} ${res.statusText}`);
            }
            
            payload = await res.json();
            console.log("📦 返回数据:", payload);
        } catch (e) {
            console.error("❌ 请求失败:", e);
            throw new Error(`请求用户信息失败: ${e.message}`);
        }

        // 检查响应数据
        if (payload.code !== 200 || !payload.profile) {
            console.error("❌ 响应异常:", payload);
            throw new Error(`获取用户信息失败: ${payload.message || '未知错误'}`);
        }

        const profile = payload.profile;
        console.log(`✅ 获取成功，昵称: ${profile.nickname}`);

        /* === 3. 更新 localStorage.data === */
        console.log("📂 [3] 读取 localStorage.data …");
        let oldData;
        try {
            oldData = JSON.parse(localStorage.getItem("data") || "{}");
            console.log("📄 当前 data:", oldData);
        } catch {
            console.warn("⚠️ 当前 data 解析失败，将重置为空对象。");
            oldData = {};
        }

        const newData = {
            ...oldData,
            user: profile,
            account: payload.account || null,
            loginMode: "account",
            loginTime: Date.now(),
            rawResponse: payload
        };

        try {
            localStorage.setItem("data", JSON.stringify(newData));
            console.log("✅ [4] 新 data 写入完成:", newData);
        } catch (e) {
            console.error("❌ localStorage 写入失败:", e);
            throw new Error('数据存储失败');
        }

        /* === 4. 设置会话信息 === */
        sessionStorage.setItem('user-session', JSON.stringify({
            userId: profile.userId,
            loginTime: Date.now(),
            nickname: profile.nickname
        }));

        // 创建用户数据备份
        const userDataBackup = {
            timestamp: Date.now(),
            userInfo: profile,
            account: payload.account,
            profile: profile
        };
        localStorage.setItem("user-backup", JSON.stringify(userDataBackup));

        console.log("✅ Cookie登录流程完成");

        /* === 5. 跳转至首页 === */
        console.log("🏠 正在跳转到首页 …");
        setTimeout(() => {
            location.href = "/"; // 可改为你自己的首页路径
        }, 1000); // 延迟 1 秒跳转

        // 显示成功消息
        alert(`登录成功！欢迎 ${profile.nickname}`);

    } catch (error) {
        console.error('❌ Cookie登录失败:', error);
        alert(`登录失败: ${error.message}`);
    }
})();

/**
 * 检查当前登录状态的函数
 */
function checkCurrentLoginStatus() {
    console.log('🔍 检查当前登录状态...');
    
    // 检查浏览器cookie
    const cookies = document.cookie;
    const hasLoginCookie = cookies.includes('MUSIC_A_T=') ||
        cookies.includes('MUSIC_A=') ||
        cookies.includes('MUSIC=') ||
        cookies.includes('MUSIC_U=');
    console.log('浏览器Cookie状态:', hasLoginCookie);
    
    // 检查localStorage数据
    try {
        const data = JSON.parse(localStorage.getItem("data") || "{}");
        console.log('localStorage数据:', data);
        console.log('用户信息:', data.user);
    } catch (error) {
        console.warn('localStorage数据解析失败:', error);
    }
    
    // 检查会话信息
    const session = sessionStorage.getItem('user-session');
    console.log('会话信息:', session ? JSON.parse(session) : null);
    
    return {
        hasLoginCookie,
        hasUserData: !!localStorage.getItem("data")
    };
}

/**
 * 清除所有登录数据的函数
 */
function clearAllLoginData() {
    console.log('🧹 清除所有登录数据...');
    
    // 清除浏览器cookie
    const currentCookies = document.cookie.split(";").filter(Boolean);
    for (const kv of currentCookies) {
        const name = kv.split("=")[0].trim();
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
    
    // 清除localStorage
    localStorage.removeItem('music_cookie');
    localStorage.removeItem('user-cookie');
    localStorage.removeItem('user-session');
    localStorage.removeItem('user-backup');
    localStorage.removeItem('data');
    
    console.log('✅ 所有登录数据已清除');
    alert('已清除所有登录数据');
}

// 将函数挂载到window对象，方便在控制台调用
window.checkCurrentLoginStatus = checkCurrentLoginStatus;
window.clearAllLoginData = clearAllLoginData;

console.log('🎵 Cookie登录脚本已加载');
console.log('📝 使用方法:');
console.log('1. 替换脚本中的cookie字符串');
console.log('2. 直接运行脚本');
console.log('3. 使用 checkCurrentLoginStatus() 检查登录状态');
console.log('4. 使用 clearAllLoginData() 清除登录数据');
