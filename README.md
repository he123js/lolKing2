# MyLife Dashboard - 你的数字生活中心

一个基于 Vue 3 的现代化数据仪表盘，聚合你的 GitHub、天气、音乐、待办事项、习惯打卡等数字生活数据。

## 🚀 功能特性

### 📊 核心功能模块
- **欢迎卡片** - 个性化欢迎界面，显示用户信息、今日日期和随机名言
- **GitHub 数据** - 展示 GitHub 用户信息、仓库统计和最近动态
- **天气信息** - 实时天气数据和未来预报
- **最近播放** - 音乐播放记录和统计信息
- **待办事项** - 任务管理，支持添加、完成、删除操作
- **习惯打卡** - 习惯追踪和完成情况统计
- **系统信息** - 实时时间、浏览器信息、网络状态

### 🎨 设计特色
- **现代化 UI** - 使用 Naive UI 组件库，界面简洁美观
- **响应式布局** - 完美适配桌面、平板、手机等不同设备
- **深色/浅色主题** - 支持主题切换（预留功能）
- **动画效果** - 流畅的交互动画和加载效果
- **数据持久化** - 使用 Pinia + localStorage 保存用户数据

## 🛠 技术栈

- **框架**: Vue 3 + Composition API + `<script setup>`
- **状态管理**: Pinia + pinia-plugin-persistedstate
- **UI 组件**: Naive UI
- **构建工具**: Vite
- **图表**: ECharts（预留集成）
- **图标**: 内置 SVG 图标
- **HTTP 请求**: @vueuse/core useFetch

## 📦 项目结构

```
src/
├── components/          # 组件目录
│   ├── WelcomeCard.vue  # 欢迎卡片
│   ├── GitHubCard.vue   # GitHub 数据
│   ├── WeatherCard.vue  # 天气信息
│   ├── MusicCard.vue    # 音乐播放
│   ├── TodoCard.vue     # 待办事项
│   ├── HabitsCard.vue   # 习惯打卡
│   └── SystemCard.vue   # 系统信息
├── stores/              # 状态管理
│   ├── dashboard.js     # 仪表盘状态
│   ├── todo.js          # 待办事项状态
│   └── habits.js        # 习惯打卡状态
├── App.vue              # 主应用组件
└── main.js             # 应用入口
```

## 🚀 快速开始

### 环境要求
- Node.js >= 18.3.0
- npm >= 7.0.0

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 🔧 配置说明

### API 集成
项目目前使用模拟数据，可以轻松集成真实 API：

#### GitHub API
```javascript
// 在 GitHubCard.vue 中替换模拟数据
const response = await fetch('https://api.github.com/users/你的用户名')
const data = await response.json()
```

#### 天气 API
```javascript
// 在 WeatherCard.vue 中集成天气 API
// OpenWeatherMap: https://openweathermap.org/api
// 和风天气: https://dev.qweather.com/
```

#### 音乐 API
```javascript
// 在 MusicCard.vue 中集成音乐 API
// 网易云音乐 API 或 Last.fm API
```

### 自定义配置

#### 修改用户名
在 `src/stores/dashboard.js` 中修改默认用户名：
```javascript
userName: '你的名字'
```

#### 添加新的数据源
1. 创建新的组件文件
2. 在 `src/stores/` 中添加对应的状态管理
3. 在 `App.vue` 中引入并添加到布局

## 🎯 功能扩展建议

### 短期优化
- [ ] 集成真实的 API 数据
- [ ] 添加拖拽布局功能（vue-grid-layout）
- [ ] 实现深色/浅色主题切换
- [ ] 添加数据图表展示（ECharts）
- [ ] 优化移动端体验

### 长期规划
- [ ] 用户登录和个性化配置
- [ ] 数据导入/导出功能
- [ ] 多语言支持
- [ ] PWA 支持
- [ ] 数据备份到云端

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 📄 许可证

MIT License

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Naive UI](https://www.naiveui.com/) - 一个 Vue 3 组件库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pinia](https://pinia.vuejs.org/) - Vue 的存储库

---

**MyLife Dashboard** - 让数据可视化，让生活更有序！