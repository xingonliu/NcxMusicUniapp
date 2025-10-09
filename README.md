# NCX Music

基于UniApp开发的音乐应用，采用Vue 3 + TypeScript技术栈。

## 项目特点

- 🎵 完整的音乐应用界面设计
- 📱 响应式设计，支持多端发布
- 🎨 现代化的UI设计，基于iOS设计规范
- ⚡ Vue 3 + TypeScript + UniApp技术栈
- 🎮 丰富的交互效果和动画

## 技术栈

- **框架**: UniApp 3.x
- **前端**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式**: SCSS
- **类型支持**: 完整的TypeScript类型定义

## 开发环境

### 环境要求

- Node.js >= 16.0.0
- npm 或 pnpm

### 安装依赖

```bash
# 使用npm
npm install

# 使用pnpm (推荐)
pnpm install
```

### 开发命令

```bash
# H5开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin

# 支付宝小程序开发
npm run dev:mp-alipay

# 其他平台...
npm run dev:mp-qq
npm run dev:mp-toutiao
```

### 构建命令

```bash
# H5构建
npm run build:h5

# 微信小程序构建
npm run build:mp-weixin

# 其他平台构建...
```

## 项目结构

```
src/
├── pages/           # 页面文件
│   └── index/       # 首页
├── components/      # 组件文件
├── static/          # 静态资源
├── App.vue          # 应用入口
├── main.ts          # 主入口文件
├── pages.json       # 页面配置
└── manifest.json    # 应用配置
```

## 设计特色

### 界面设计

- **状态栏**: iPhone风格的状态栏设计
- **导航栏**: 简洁的导航栏，包含返回、标题、控制按钮
- **用户信息**: 头像、用户名、等级、VIP标识展示
- **搜索功能**: 优雅的搜索框设计
- **内容区域**: 推荐音乐和分类音乐列表
- **播放器**: 底部固定音乐播放器
- **导航栏**: 底部标签栏导航

### 交互效果

- 点击反馈动画
- 状态切换效果
- 播放按钮动画
- 分类标签切换
- 导航切换效果

## 配置说明

### TypeScript配置

项目支持JSON注释功能，可以在以下文件中使用注释：

- `tsconfig.json` - TypeScript配置
- `pages.json` - 页面配置
- `manifest.json` - 应用配置
- 其他JSON配置文件

**注意**: 虽然TypeScript本身不支持JSON注释，但项目配置了 `allowJs: true`，并且使用了支持JSON注释的编辑器配置。

### 样式系统

项目使用SCSS预处理器，包含：

- 全局CSS变量
- 响应式设计
- 动画效果
- 组件样式

## 开发指南

### 添加新页面

1. 在 `src/pages/` 下创建页面文件夹
2. 在 `pages.json` 中添加页面配置
3. 实现页面逻辑和样式

### 添加新组件

1. 在 `src/components/` 下创建组件
2. 在需要使用的地方导入组件
3. 遵循Vue 3 Composition API规范

### 样式开发

- 使用SCSS预处理器
- 遵循BEM命名规范
- 使用CSS变量统一管理颜色和尺寸
- 响应式设计适配不同屏幕

## 部署说明

### H5部署

构建完成后，将 `dist/build/h5` 目录部署到Web服务器即可。

### 小程序部署

1. 使用对应平台的开发者工具打开项目
2. 导入构建后的代码
3. 上传代码并提交审核

## 注意事项

1. **TypeScript版本**: 项目锁定TypeScript 4.9版本，已移除过时的配置选项
2. **JSON注释**: 支持JSON注释，但需要编辑器支持
3. **类型定义**: 使用完整的UniApp类型定义，提供良好的开发体验
4. **兼容性**: 支持多端发布，注意不同平台的API差异

## 许可证

MIT License
