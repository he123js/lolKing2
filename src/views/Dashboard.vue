<template>
  <NConfigProvider>
    <NGlobalStyle />
    <NMessageProvider>
      <NLayout class="dashboard-layout">
        <NLayoutContent class="dashboard-content">
          <div class="dashboard-container">
            <!-- 顶部导航栏 - Apple风格设计 -->
            <header class="dashboard-header">
              <div class="header-content">
                <div class="header-left">
                  <h1 class="app-title">MyLife</h1>
                  <p class="app-subtitle">你的数字生活中心</p>
                </div>
                <div class="header-center">
                  <!-- 简约导航标签 -->
                  <nav class="nav-tabs">
                    <button 
                      :class="['nav-tab', { active: activeTab === 'dashboard' }]"
                      @click="switchTab('dashboard')"
                    >
                      <span class="tab-icon">📊</span>
                      <span class="tab-label">仪表盘</span>
                    </button>
                    <button 
                      :class="['nav-tab', { active: activeTab === 'lol' }]"
                      @click="switchTab('lol')"
                    >
                      <span class="tab-icon">🎮</span>
                      <span class="tab-label">LOL战绩</span>
                    </button>
                  </nav>
                </div>
                <div class="header-right">
                  <div class="user-area">
                    <div class="user-avatar">
                      <span class="avatar-emoji">{{ authStore.getCurrentUser()?.avatar || '👤' }}</span>
                    </div>
                    <div class="user-details">
                      <span class="user-name">{{ authStore.getCurrentUser()?.name || '用户' }}</span>
                      <button class="logout-btn" @click="handleLogout">
                        <span class="logout-icon">🚪</span>
                        <span class="logout-text">退出</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            
            <div class="dashboard-grid">
              <!-- 欢迎卡片 -->
              <div class="grid-item welcome">
                <WelcomeCard />
              </div>
              
              <!-- 天气卡片 -->
              <div class="grid-item weather">
                <WeatherCard />
              </div>
              
              <!-- 系统信息 -->
              <div class="grid-item system">
                <SystemCard />
              </div>
              
              <!-- 待办事项 -->
              <div class="grid-item todo">
                <TodoCard />
              </div>
              
              <!-- 习惯打卡 -->
              <div class="grid-item habits">
                <HabitsCard />
              </div>
              
              <!-- 音乐卡片 -->
              <div class="grid-item music">
                <MusicCard />
              </div>
              
              <!-- GitHub卡片 -->
              <div class="grid-item github">
                <GitHubCard />
              </div>
            </div>
          </div>
        </NLayoutContent>
      </NLayout>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NConfigProvider, NGlobalStyle, NLayout, NLayoutContent, NMessageProvider, NAvatar, NButton, NIcon } from 'naive-ui'
import WelcomeCard from '@/components/WelcomeCard.vue'
import TodoCard from '@/components/TodoCard.vue'
import HabitsCard from '@/components/HabitsCard.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import MusicCard from '@/components/MusicCard.vue'
import SystemCard from '@/components/SystemCard.vue'
import GitHubCard from '@/components/GitHubCard.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const message = useMessage()
const authStore = useAuthStore()

const theme = ref('light')
const activeTab = ref('dashboard')

// 切换标签页
const switchTab = (tab) => {
  activeTab.value = tab
  if (tab === 'dashboard') {
    router.push('/dashboard')
  } else if (tab === 'lol') {
    router.push('/lol-tracker')
  }
}
// document.addEventListener('contextmenu', function(e) {
//   console.log('右键菜单被禁用');
//   e.preventDefault();
// });
// document.addEventListener('copy', function(e) {
//   console.log('复制被禁用');
//   e.preventDefault();
// });

// document.addEventListener('cut', function(e) {
//   console.log('剪切被禁用');
//   e.preventDefault();
// });

// document.addEventListener('paste', function(e) {
//   console.log('粘贴被禁用');
//   e.preventDefault();
// });
// 响应式布局配置
const layoutConfig = ref({
  lg: [
    { x: 0, y: 0, w: 4, h: 2, i: 'welcome' },
    { x: 4, y: 0, w: 2, h: 2, i: 'weather' },
    { x: 6, y: 0, w: 2, h: 2, i: 'system' },
    { x: 0, y: 2, w: 3, h: 3, i: 'todo' },
    { x: 3, y: 2, w: 3, h: 3, i: 'habits' },
    { x: 6, y: 2, w: 2, h: 3, i: 'music' },
    { x: 0, y: 5, w: 4, h: 3, i: 'github' }
  ],
  md: [
    { x: 0, y: 0, w: 4, h: 2, i: 'welcome' },
    { x: 0, y: 2, w: 4, h: 2, i: 'weather' },
    { x: 0, y: 4, w: 4, h: 2, i: 'system' },
    { x: 0, y: 6, w: 4, h: 3, i: 'todo' },
    { x: 0, y: 9, w: 4, h: 3, i: 'habits' },
    { x: 0, y: 12, w: 4, h: 3, i: 'music' },
    { x: 0, y: 15, w: 4, h: 3, i: 'github' }
  ],
  sm: [
    { x: 0, y: 0, w: 2, h: 2, i: 'welcome' },
    { x: 0, y: 2, w: 2, h: 2, i: 'weather' },
    { x: 0, y: 4, w: 2, h: 2, i: 'system' },
    { x: 0, y: 6, w: 2, h: 3, i: 'todo' },
    { x: 0, y: 9, w: 2, h: 3, i: 'habits' },
    { x: 0, y: 12, w: 2, h: 3, i: 'music' },
    { x: 0, y: 15, w: 2, h: 3, i: 'github' }
  ]
})

const currentLayout = ref(layoutConfig.value.lg)

// 响应式布局处理
const handleResize = () => {
  const width = window.innerWidth
  if (width >= 1200) {
    currentLayout.value = layoutConfig.value.lg
  } else if (width >= 768) {
    currentLayout.value = layoutConfig.value.md
  } else {
    currentLayout.value = layoutConfig.value.sm
  }
}

// 退出登录
const handleLogout = () => {
  console.log('开始退出登录流程');
  
  // 清除认证状态
  authStore.logout()
  
  console.log('已清除认证数据');
  
  // 使用replace而不是push，避免用户可以回退到dashboard
  router.replace('/login')
  console.log('执行路由跳转到登录页面');
  
  message.success('已退出登录')
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
  
  // 检查用户认证状态
  if (!authStore.isAuthenticated) {
    router.push('/login')
  }
})
</script>

<style scoped>
/* Apple风格设计系统 */
.dashboard-layout {
  min-height: 100vh;
  background: #f5f5f7; /* 苹果官网背景色 */
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
}

.dashboard-content {
  padding: 0;
}

.dashboard-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 24px;
}

/* 顶部导航栏样式 */
.dashboard-header {
  margin-bottom: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e8e8ed;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
}

.header-left {
  flex: 1;
  min-width: 200px;
}

.app-title {
  font-size: 32px;
  font-weight: 700;
  color: #1d1d1f; /* 苹果深色文字 */
  margin-bottom: 4px;
  letter-spacing: -0.5px;
}

.app-subtitle {
  font-size: 17px;
  color: #86868b; /* 苹果副标题灰色 */
  font-weight: 400;
  margin: 0;
}

.header-center {
  display: flex;
  justify-content: center;
  flex: 1;
}

/* 导航标签样式 */
.nav-tabs {
  display: flex;
  background: #f5f5f7;
  border-radius: 12px;
  padding: 4px;
  border: 1px solid #e8e8ed;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-size: 15px;
  font-weight: 500;
  color: #86868b;
}

.nav-tab:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1d1d1f;
}

.nav-tab.active {
  background: white;
  color: #007AFF; /* 苹果蓝色 */
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.15);
}

.tab-icon {
  font-size: 18px;
}

.tab-label {
  font-weight: 600;
}

.header-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  min-width: 200px;
}

/* 用户区域样式 */
.user-area {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e8ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.avatar-emoji {
  font-size: 20px;
}

.user-details {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid #e8e8ed;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #ff3b30; /* 苹果红色 */
}

.logout-btn:hover {
  background: #ff3b30;
  color: white;
  border-color: #ff3b30;
}

/* 仪表盘网格布局 */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  grid-auto-rows: minmax(100px, auto);
  max-height: calc(100vh - 200px);
  padding: 10px 0;
}

.grid-item {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: white;
  border: 1px solid #f0f0f0;
  position: relative;
}

.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* 响应式布局 */
.welcome { grid-area: 1 / 1 / 3 / 7; min-height: 240px; }
.weather { grid-area: 1 / 7 / 3 / 10; min-height: 240px; }
.system { grid-area: 1 / 10 / 3 / 13; min-height: 240px; }
.todo { grid-area: 3 / 1 / 6 / 5; min-height: 320px; }
.habits { grid-area: 3 / 5 / 6 / 9; min-height: 320px; }
.music { grid-area: 3 / 9 / 6 / 13; min-height: 320px; }
.github { grid-area: 6 / 1 / 9 / 9; min-height: 320px; }

/* 中等屏幕 */
@media (max-width: 1199px) {
  .dashboard-grid {
    grid-template-columns: repeat(8, 1fr);
  }
  
  .welcome { grid-area: 1 / 1 / 3 / 5; }
  .weather { grid-area: 1 / 5 / 3 / 7; }
  .system { grid-area: 1 / 7 / 3 / 9; }
  .todo { grid-area: 3 / 1 / 6 / 4; }
  .habits { grid-area: 3 / 4 / 6 / 7; }
  .music { grid-area: 3 / 7 / 6 / 9; }
  .github { grid-area: 6 / 1 / 9 / 5; }
}

/* 小屏幕 */
@media (max-width: 767px) {
  .dashboard-container {
    padding: 20px 16px;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .app-title {
    font-size: 28px;
  }
  
  .user-area {
    justify-content: center;
  }
  
  /* 重置所有grid-area */
  .welcome, .weather, .system, .todo, .habits, .music, .github {
    grid-area: auto;
  }
}

/* 微动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid-item {
  animation: fadeInUp 0.6s ease-out;
}

.grid-item:nth-child(2) { animation-delay: 0.1s; }
.grid-item:nth-child(3) { animation-delay: 0.2s; }
.grid-item:nth-child(4) { animation-delay: 0.3s; }
.grid-item:nth-child(5) { animation-delay: 0.4s; }
.grid-item:nth-child(6) { animation-delay: 0.5s; }
.grid-item:nth-child(7) { animation-delay: 0.6s; }
</style>