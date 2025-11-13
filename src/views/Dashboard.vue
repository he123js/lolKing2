<template>
  <NConfigProvider>
    <NGlobalStyle />
    <NMessageProvider>
      <NLayout class="dashboard-layout">
        <NLayoutContent class="dashboard-content">
          <div class="dashboard-container">
            <!-- 顶部导航栏 -->
            <header class="dashboard-header">
              <div class="header-content">
                <div class="header-left">
                  <h1>MyLife Dashboard</h1>
                  <p>你的数字生活中心</p>
                </div>
                <div class="header-right">
                  <div class="user-info">
                    <n-avatar round size="small">{{ authStore.user?.avatar || '👤' }}</n-avatar>
                    <span class="user-name">{{ authStore.user?.name || '用户' }}</span>
                    <n-button size="small" @click="handleLogout">
                      退出登录
                    </n-button>
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { NConfigProvider, NGlobalStyle, NLayout, NLayoutContent, NMessageProvider, NAvatar, NButton } from 'naive-ui'
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
document.addEventListener('contextmenu', function(e) {
  console.log('右键菜单被禁用');
  e.preventDefault();
});
document.addEventListener('copy', function(e) {
  console.log('复制被禁用');
  e.preventDefault();
});

document.addEventListener('cut', function(e) {
  console.log('剪切被禁用');
  e.preventDefault();
});

document.addEventListener('paste', function(e) {
  console.log('粘贴被禁用');
  e.preventDefault();
});
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
  authStore.logout()
  authStore.saveUserToStorage()
  message.success('已退出登录')
  router.push('/login')
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
.dashboard-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.dashboard-content {
  padding: 20px;
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 40px;
  padding: 20px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-left h1 {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.header-left p {
  font-size: 1.2rem;
  color: #666;
  opacity: 0.8;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.user-name {
  font-weight: 500;
  color: #333;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 20px;
  grid-auto-rows: minmax(100px, auto);
}

.grid-item {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

/* 响应式布局 */
.welcome { grid-area: 1 / 1 / 3 / 5; }
.weather { grid-area: 1 / 5 / 3 / 7; }
.system { grid-area: 1 / 7 / 3 / 9; }
.todo { grid-area: 3 / 1 / 6 / 4; }
.habits { grid-area: 3 / 4 / 6 / 7; }
.music { grid-area: 3 / 7 / 6 / 9; }
.github { grid-area: 6 / 1 / 9 / 5; }

/* 中等屏幕 */
@media (max-width: 1199px) {
  .dashboard-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .welcome { grid-area: 1 / 1 / 3 / 5; }
  .weather { grid-area: 3 / 1 / 5 / 3; }
  .system { grid-area: 3 / 3 / 5 / 5; }
  .todo { grid-area: 5 / 1 / 8 / 3; }
  .habits { grid-area: 5 / 3 / 8 / 5; }
  .music { grid-area: 8 / 1 / 11 / 3; }
  .github { grid-area: 8 / 3 / 11 / 5; }
}

/* 小屏幕 */
@media (max-width: 767px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
  }
  
  .header-left h1 {
    font-size: 2rem;
  }
  
  .welcome { grid-area: 1 / 1 / 3 / 3; }
  .weather { grid-area: 3 / 1 / 5 / 2; }
  .system { grid-area: 3 / 2 / 5 / 3; }
  .todo { grid-area: 5 / 1 / 8 / 3; }
  .habits { grid-area: 8 / 1 / 11 / 3; }
  .music { grid-area: 11 / 1 / 14 / 3; }
  .github { grid-area: 14 / 1 / 17 / 3; }
}
</style>