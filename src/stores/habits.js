import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHabitsStore = defineStore('habits', () => {
  // 习惯列表
  const habits = ref([
    {
      id: 1,
      name: '早起',
      description: '每天7点前起床',
      color: '#3b82f6',
      icon: '⏰',
      streak: 5,
      completed: true,
      frequency: 'daily',
      targetDays: 7,
      history: [
        { date: '2025-10-25', completed: true },
        { date: '2025-10-26', completed: true },
        { date: '2025-10-27', completed: true },
        { date: '2025-10-28', completed: true },
        { date: '2025-10-29', completed: true },
        { date: '2025-10-30', completed: true }
      ]
    },
    {
      id: 2,
      name: '健身',
      description: '每天运动30分钟',
      color: '#10b981',
      icon: '💪',
      streak: 3,
      completed: false,
      frequency: 'daily',
      targetDays: 5,
      history: [
        { date: '2025-10-27', completed: true },
        { date: '2025-10-28', completed: true },
        { date: '2025-10-29', completed: true },
        { date: '2025-10-30', completed: false }
      ]
    },
    {
      id: 3,
      name: '阅读',
      description: '每天阅读30分钟',
      color: '#8b5cf6',
      icon: '📚',
      streak: 7,
      completed: false,
      frequency: 'daily',
      targetDays: 7,
      history: [
        { date: '2025-10-23', completed: true },
        { date: '2025-10-24', completed: true },
        { date: '2025-10-25', completed: true },
        { date: '2025-10-26', completed: true },
        { date: '2025-10-27', completed: true },
        { date: '2025-10-28', completed: true },
        { date: '2025-10-29', completed: true },
        { date: '2025-10-30', completed: false }
      ]
    },
    {
      id: 4,
      name: '学习编程',
      description: '每天学习新技术',
      color: '#f59e0b',
      icon: '💻',
      streak: 10,
      completed: true,
      frequency: 'daily',
      targetDays: 7,
      history: [
        { date: '2025-10-20', completed: true },
        { date: '2025-10-21', completed: true },
        { date: '2025-10-22', completed: true },
        { date: '2025-10-23', completed: true },
        { date: '2025-10-24', completed: true },
        { date: '2025-10-25', completed: true },
        { date: '2025-10-26', completed: true },
        { date: '2025-10-27', completed: true },
        { date: '2025-10-28', completed: true },
        { date: '2025-10-29', completed: true },
        { date: '2025-10-30', completed: true }
      ]
    }
  ])

  // 获取今日日期
  const today = computed(() => {
    return new Date().toISOString().split('T')[0]
  })

  // 计算本周日期范围
  const getWeekDates = computed(() => {
    const dates = []
    const today = new Date()
    const dayOfWeek = today.getDay()
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - dayOfWeek)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    
    return dates
  })

  // 计算习惯统计
  const stats = computed(() => {
    const total = habits.value.length
    const completedToday = habits.value.filter(habit => habit.completed).length
    const completionRate = total > 0 ? Math.round((completedToday / total) * 100) : 0
    
    const longestStreak = Math.max(...habits.value.map(habit => habit.streak))
    const totalStreak = habits.value.reduce((sum, habit) => sum + habit.streak, 0)
    
    return {
      total,
      completedToday,
      completionRate,
      longestStreak,
      totalStreak
    }
  })

  // 获取本周完成情况
  const weeklyProgress = computed(() => {
    const progress = {}
    getWeekDates.value.forEach(date => {
      progress[date] = habits.value.filter(habit => 
        habit.history.some(record => record.date === date && record.completed)
      ).length
    })
    return progress
  })

  // 切换习惯完成状态
  const toggleHabit = (habitId) => {
    const habit = habits.value.find(h => h.id === habitId)
    if (habit) {
      const todayRecord = habit.history.find(record => record.date === today.value)
      
      if (todayRecord) {
        // 更新今日记录
        todayRecord.completed = !todayRecord.completed
      } else {
        // 添加今日记录
        habit.history.push({ date: today.value, completed: true })
      }
      
      // 更新完成状态
      habit.completed = !habit.completed
      
      // 更新连续天数
      updateStreak(habit)
    }
  }

  // 更新连续天数
  const updateStreak = (habit) => {
    const sortedHistory = habit.history
      .filter(record => record.completed)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    
    if (sortedHistory.length === 0) {
      habit.streak = 0
      return
    }
    
    let streak = 1
    let currentDate = new Date(sortedHistory[sortedHistory.length - 1].date)
    
    for (let i = sortedHistory.length - 2; i >= 0; i--) {
      const prevDate = new Date(sortedHistory[i].date)
      const diffTime = currentDate.getTime() - prevDate.getTime()
      const diffDays = diffTime / (1000 * 60 * 60 * 24)
      
      if (diffDays === 1) {
        streak++
        currentDate = prevDate
      } else {
        break
      }
    }
    
    habit.streak = streak
  }

  // 添加新习惯
  const addHabit = (habitData) => {
    const newHabit = {
      id: Date.now(),
      name: habitData.name,
      description: habitData.description || '',
      color: habitData.color || '#3b82f6',
      icon: habitData.icon || '✅',
      streak: 0,
      completed: false,
      frequency: habitData.frequency || 'daily',
      targetDays: habitData.targetDays || 7,
      history: []
    }
    habits.value.push(newHabit)
  }

  // 删除习惯
  const deleteHabit = (habitId) => {
    const index = habits.value.findIndex(h => h.id === habitId)
    if (index !== -1) {
      habits.value.splice(index, 1)
    }
  }

  // 编辑习惯
  const editHabit = (habitId, updates) => {
    const habit = habits.value.find(h => h.id === habitId)
    if (habit) {
      Object.assign(habit, updates)
    }
  }

  // 获取习惯的周完成情况
  const getHabitWeeklyProgress = (habitId) => {
    const habit = habits.value.find(h => h.id === habitId)
    if (!habit) return {}
    
    const progress = {}
    getWeekDates.value.forEach(date => {
      const record = habit.history.find(r => r.date === date)
      progress[date] = record ? record.completed : false
    })
    
    return progress
  }

  // 计算习惯完成率
  const getHabitCompletionRate = (habitId) => {
    const habit = habits.value.find(h => h.id === habitId)
    if (!habit) return 0
    
    const completedCount = habit.history.filter(record => record.completed).length
    const totalDays = habit.history.length
    
    return totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0
  }

  return {
    habits,
    today,
    getWeekDates,
    stats,
    weeklyProgress,
    toggleHabit,
    addHabit,
    deleteHabit,
    editHabit,
    getHabitWeeklyProgress,
    getHabitCompletionRate
  }
}, {
  persist: true
})