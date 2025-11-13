<template>
  <n-card class="welcome-card" :bordered="false">
    <div class="welcome-content">
      <div class="welcome-header">
        <n-avatar
          class="user-avatar"
          round
          size="large"
          :src="userAvatar"
          fallback-src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
        />
        <div class="welcome-text">
          <h2 class="greeting">你好，{{ userName }}！</h2>
          <p class="date">{{ currentDate }}</p>
        </div>
      </div>
      
      <div class="quote-section">
        <div class="quote-icon">💭</div>
        <p class="quote">{{ randomQuote }}</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value">{{ todoStats.todayTodos }}</div>
          <div class="stat-label">今日待办</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ habitStats.completionRate }}%</div>
          <div class="stat-label">习惯完成</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ habitStats.longestStreak }}</div>
          <div class="stat-label">连续天数</div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed } from 'vue'
import { NCard } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { useDashboardStore } from '@/stores/dashboard'
import { useTodoStore } from '@/stores/todo'
import { useHabitsStore } from '@/stores/habits'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const todoStore = useTodoStore()
const habitsStore = useHabitsStore()

// 使用真实的登录用户信息
const userName = computed(() => {
  const currentUser = authStore.getCurrentUser()
  return currentUser ? currentUser.name : '用户'
})

const userAvatarEmoji = computed(() => {
  const currentUser = authStore.getCurrentUser()
  return currentUser ? currentUser.avatar : '👤'
})

const randomQuote = computed(() => dashboardStore.randomQuote)

const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
})

const userAvatar = computed(() => {
  // 这里可以集成真实用户头像
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName.value}`
})

const todoStats = computed(() => ({
  todayTodos: todoStore.todayTodos.length
}))

const habitStats = computed(() => habitsStore.stats)
</script>

<style scoped>
/* Apple风格欢迎卡片 */
.welcome-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.welcome-card:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.welcome-content {
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.welcome-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.user-avatar img{
  width: 60px;
}

.user-avatar-container {
  margin-right: 20px;
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, #007AFF 0%, #0056CC 100%);
  color: white;
  font-size: 28px;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

.welcome-text {
  flex: 1;
  margin-left: 20px;
}

.greeting {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: #1d1d1f;
  letter-spacing: -0.5px;
}

.date {
  margin: 0;
  font-size: 16px;
  color: #86868b;
  font-weight: 500;
}

.quote-section {
  display: flex;
  align-items: flex-start;
  margin-bottom: 32px;
  background: #f5f5f7;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid #007AFF;
}

.quote-icon {
  margin-right: 16px;
  font-size: 20px;
  color: #007AFF;
  flex-shrink: 0;
}

.quote {
  margin: 0;
  line-height: 1.6;
  font-size: 15px;
  color: #1d1d1f;
  font-style: italic;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.stat-item {
  text-align: center;
  background: #f8f9fa;
  padding: 20px 16px;
  border-radius: 12px;
  border: 1px solid #e8e8ed;
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: #f0f0f5;
  transform: translateY(-2px);
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #007AFF;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  color: #86868b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-content {
    padding: 24px 20px;
  }
  
  .welcome-header {
    flex-direction: column;
    text-align: center;
  }
  
  .user-avatar-container {
    margin-right: 0;
    margin-bottom: 16px;
  }
  
  .greeting {
    font-size: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .stat-value {
    font-size: 28px;
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

.welcome-card {
  animation: fadeInUp 0.6s ease-out;
}
</style>