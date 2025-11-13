<template>
  <n-card class="welcome-card" :bordered="false">
    <div class="welcome-content">
      <div class="welcome-header">
        <n-avatar
          round
          size="large"
          :src="userAvatar"
          fallback-src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
        />
        <div class="welcome-text">
          <h2>你好，{{ userName }}！</h2>
          <p class="date">{{ currentDate }}</p>
        </div>
      </div>
      
      <div class="quote-section">
        <n-icon size="24" class="quote-icon">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621c.537-.278 1.24-.375 1.929-.311c1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
          </svg>
        </n-icon>
        <p class="quote">{{ randomQuote }}</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-item">
          <n-statistic label="今日待办" :value="todoStats.todayTodos" />
        </div>
        <div class="stat-item">
          <n-statistic label="习惯完成" :value="`${habitStats.completionRate}%`" />
        </div>
        <div class="stat-item">
          <n-statistic label="连续天数" :value="habitStats.longestStreak" />
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed } from 'vue'
import { NCard, NAvatar, NIcon, NStatistic } from 'naive-ui'
import { useDashboardStore } from '@/stores/dashboard'
import { useTodoStore } from '@/stores/todo'
import { useHabitsStore } from '@/stores/habits'

const dashboardStore = useDashboardStore()
const todoStore = useTodoStore()
const habitsStore = useHabitsStore()

const userName = computed(() => dashboardStore.userName)
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
.welcome-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.welcome-content {
  padding: 20px;
}

.welcome-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.welcome-text {
  margin-left: 16px;
}

.welcome-text h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.date {
  margin: 4px 0 0 0;
  opacity: 0.9;
  font-size: 0.9rem;
}

.quote-section {
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.quote-icon {
  margin-right: 12px;
  opacity: 0.8;
  flex-shrink: 0;
}

.quote {
  margin: 0;
  font-style: italic;
  line-height: 1.5;
  font-size: 0.95rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

:deep(.n-statistic .n-statistic-value) {
  color: white !important;
  font-size: 1.2rem;
  font-weight: 600;
}

:deep(.n-statistic .n-statistic-label) {
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 0.8rem;
}
</style>