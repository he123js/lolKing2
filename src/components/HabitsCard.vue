<template>
  <n-card class="habits-card" title="习惯打卡">
    <template #header-extra>
      <n-button text @click="showAddModal = true">
        <n-icon size="18">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </n-icon>
      </n-button>
    </template>

    <div class="habits-stats">
      <n-statistic label="总习惯" :value="stats.total" />
      <n-statistic label="今日完成" :value="stats.completedToday" />
      <n-statistic label="完成率" :value="`${stats.completionRate}%`" />
    </div>

    <div class="habits-grid">
      <div 
        v-for="habit in habits" 
        :key="habit.id" 
        class="habit-item"
        :style="{ borderColor: habit.color }"
        @click="toggleHabit(habit.id)"
      >
        <div class="habit-icon" :style="{ backgroundColor: habit.color }">
          {{ habit.icon }}
        </div>
        <div class="habit-info">
          <div class="habit-name">{{ habit.name }}</div>
          <div class="habit-streak">连续 {{ habit.streak }} 天</div>
        </div>
        <div class="habit-status" :class="{ completed: habit.completed }">
          <n-icon v-if="habit.completed" size="24" color="#10b981">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </n-icon>
          <div v-else class="check-circle"></div>
        </div>
      </div>
    </div>

    <div class="weekly-calendar">
      <h4>本周完成情况</h4>
      <div class="calendar-grid">
        <div v-for="date in weekDates" :key="date" class="calendar-day">
          <div class="day-label">{{ formatDay(date) }}</div>
          <div class="day-progress">
            <div 
              v-for="habit in habits" 
              :key="habit.id"
              class="progress-dot"
              :class="{ completed: isHabitCompleted(habit.id, date) }"
              :style="{ backgroundColor: habit.color }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加习惯模态框 -->
    <n-modal v-model:show="showAddModal" preset="dialog" title="添加新习惯">
      <n-form :model="newHabit" :rules="rules">
        <n-form-item label="习惯名称" path="name">
          <n-input v-model:value="newHabit.name" placeholder="请输入习惯名称" />
        </n-form-item>
        <n-form-item label="描述" path="description">
          <n-input v-model:value="newHabit.description" placeholder="请输入习惯描述" />
        </n-form-item>
        <n-form-item label="图标" path="icon">
          <n-input v-model:value="newHabit.icon" placeholder="请输入表情符号图标" />
        </n-form-item>
        <n-form-item label="颜色" path="color">
          <n-color-picker v-model:value="newHabit.color" />
        </n-form-item>
        <n-form-item label="目标天数" path="targetDays">
          <n-input-number v-model:value="newHabit.targetDays" :min="1" :max="30" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button @click="showAddModal = false">取消</n-button>
        <n-button type="primary" @click="handleAddHabit">添加</n-button>
      </template>
    </n-modal>
  </n-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  NCard, NButton, NIcon, NStatistic, NModal, 
  NForm, NFormItem, NInput, NColorPicker, NInputNumber 
} from 'naive-ui'
import { useHabitsStore } from '@/stores/habits'

const habitsStore = useHabitsStore()

const showAddModal = ref(false)
const newHabit = ref({
  name: '',
  description: '',
  icon: '✅',
  color: '#3b82f6',
  targetDays: 7
})

const rules = {
  name: {
    required: true,
    message: '请输入习惯名称',
    trigger: 'blur'
  }
}

const habits = computed(() => habitsStore.habits)
const stats = computed(() => habitsStore.stats)
const weekDates = computed(() => habitsStore.getWeekDates)

const toggleHabit = (habitId) => {
  habitsStore.toggleHabit(habitId)
}

const isHabitCompleted = (habitId, date) => {
  const progress = habitsStore.getHabitWeeklyProgress(habitId)
  return progress[date] || false
}

const handleAddHabit = () => {
  if (!newHabit.value.name.trim()) return
  
  habitsStore.addHabit(newHabit.value)
  showAddModal.value = false
  newHabit.value = {
    name: '',
    description: '',
    icon: '✅',
    color: '#3b82f6',
    targetDays: 7
  }
}

const formatDay = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  
  if (date.toDateString() === today.toDateString()) {
    return '今天'
  }
  
  const days = ['日', '一', '二', '三', '四', '五', '六']
  return days[date.getDay()]
}
</script>

<style scoped>
.habits-card {
  height: 100%;
}

.habits-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.habits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.habit-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 2px solid;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.habit-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.habit-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-right: 12px;
  color: white;
}

.habit-info {
  flex: 1;
  min-width: 0;
}

.habit-name {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 1rem;
}

.habit-streak {
  font-size: 0.8rem;
  color: #666;
}

.habit-status {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.check-circle {
  width: 24px;
  height: 24px;
  border: 2px solid #d4d4d8;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.habit-item:hover .check-circle {
  border-color: #10b981;
}

.weekly-calendar {
  margin-top: 24px;
}

.weekly-calendar h4 {
  margin: 0 0 16px 0;
  color: #374151;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-day {
  text-align: center;
  padding: 8px;
  background: #f8fafc;
  border-radius: 8px;
}

.day-label {
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #374151;
}

.day-progress {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.3;
  transition: all 0.3s ease;
}

.progress-dot.completed {
  opacity: 1;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .habits-grid {
    grid-template-columns: 1fr;
  }
  
  .calendar-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
  }
}
</style>