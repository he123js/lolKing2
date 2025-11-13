import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  // 待办事项列表
  const todos = ref([
    { id: 1, title: '完成仪表盘项目', completed: false, category: '工作', priority: 'high', dueDate: '2025-11-01' },
    { id: 2, title: '学习 Vue 3 新特性', completed: false, category: '学习', priority: 'medium', dueDate: '2025-11-05' },
    { id: 3, title: '健身 30 分钟', completed: true, category: '健康', priority: 'medium', dueDate: '2025-10-30' },
    { id: 4, title: '阅读技术文章', completed: false, category: '学习', priority: 'low', dueDate: '2025-11-10' }
  ])

  // 分类列表
  const categories = ref(['工作', '学习', '健康', '生活', '其他'])

  // 优先级选项
  const priorities = ref([
    { value: 'high', label: '高', color: '#f87171' },
    { value: 'medium', label: '中', color: '#fbbf24' },
    { value: 'low', label: '低', color: '#34d399' }
  ])

  // 计算统计信息
  const stats = computed(() => {
    const total = todos.value.length
    const completed = todos.value.filter(todo => todo.completed).length
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
    
    return { total, completed, pending, completionRate }
  })

  // 按分类统计
  const categoryStats = computed(() => {
    const stats = {}
    categories.value.forEach(category => {
      const categoryTodos = todos.value.filter(todo => todo.category === category)
      stats[category] = {
        total: categoryTodos.length,
        completed: categoryTodos.filter(todo => todo.completed).length
      }
    })
    return stats
  })

  // 添加待办事项
  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      title: todo.title,
      completed: false,
      category: todo.category || '其他',
      priority: todo.priority || 'medium',
      dueDate: todo.dueDate || '',
      createdAt: new Date().toISOString()
    }
    todos.value.unshift(newTodo)
  }

  // 删除待办事项
  const deleteTodo = (id) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  // 切换完成状态
  const toggleTodo = (id) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  // 更新待办事项
  const updateTodo = (id, updates) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      Object.assign(todo, updates)
    }
  }

  // 清空已完成
  const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed)
  }

  // 获取今日待办
  const todayTodos = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    return todos.value.filter(todo => todo.dueDate === today && !todo.completed)
  })

  // 获取即将到期（3天内）
  const upcomingTodos = computed(() => {
    const today = new Date()
    const threeDaysLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
    
    return todos.value.filter(todo => {
      if (!todo.dueDate || todo.completed) return false
      
      const dueDate = new Date(todo.dueDate)
      return dueDate >= today && dueDate <= threeDaysLater
    })
  })

  return {
    todos,
    categories,
    priorities,
    stats,
    categoryStats,
    todayTodos,
    upcomingTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo,
    clearCompleted
  }
}, {
  persist: true
})