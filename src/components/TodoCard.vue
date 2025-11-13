<template>
  <n-card class="todo-card" title="待办事项">
    <template #header-extra>
      <n-button text @click="showAddModal = true">
        <n-icon size="18">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </n-icon>
      </n-button>
    </template>

    <div class="todo-stats">
      <n-statistic label="总任务" :value="stats.total" />
      <n-statistic label="已完成" :value="stats.completed" />
      <n-statistic label="完成率" :value="`${stats.completionRate}%`" />
    </div>

    <n-list class="todo-list">
      <n-list-item v-for="todo in visibleTodos" :key="todo.id">
        <div class="todo-item">
          <n-checkbox 
            :checked="todo.completed" 
            @update:checked="toggleTodo(todo.id)"
          />
          <div class="todo-content" :class="{ completed: todo.completed }">
            <div class="todo-title">{{ todo.title }}</div>
            <div class="todo-meta">
              <n-tag 
                size="small" 
                :color="{ color: getPriorityColor(todo.priority), textColor: 'white' }"
              >
                {{ getPriorityLabel(todo.priority) }}
              </n-tag>
              <n-tag size="small" type="info">{{ todo.category }}</n-tag>
              <span v-if="todo.dueDate" class="due-date">{{ formatDate(todo.dueDate) }}</span>
            </div>
          </div>
          <n-button 
            text 
            type="error" 
            @click="deleteTodo(todo.id)"
            class="delete-btn"
          >
            <n-icon size="16">
              <svg viewBox="0 0 24 24">
                <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </n-icon>
          </n-button>
        </div>
      </n-list-item>
    </n-list>

    <div v-if="upcomingTodos.length > 0" class="upcoming-section">
      <n-divider />
      <h4>即将到期</h4>
      <n-list>
        <n-list-item v-for="todo in upcomingTodos" :key="todo.id">
          <div class="upcoming-item">
            <span class="todo-title">{{ todo.title }}</span>
            <n-tag size="small" type="warning">{{ formatDate(todo.dueDate) }}</n-tag>
          </div>
        </n-list-item>
      </n-list>
    </div>

    <!-- 添加待办事项模态框 -->
    <n-modal v-model:show="showAddModal" preset="dialog" title="添加待办事项">
      <n-form :model="newTodo" :rules="rules" ref="formRef">
        <n-form-item label="任务标题" path="title">
          <n-input v-model:value="newTodo.title" placeholder="请输入任务内容" />
        </n-form-item>
        <n-form-item label="分类" path="category">
          <n-select v-model:value="newTodo.category" :options="categories" />
        </n-form-item>
        <n-form-item label="优先级" path="priority">
          <n-select v-model:value="newTodo.priority" :options="priorityOptions" />
        </n-form-item>
        <n-form-item label="截止日期" path="dueDate">
          <n-date-picker v-model:value="newTodo.dueDate" type="date" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-button @click="showAddModal = false">取消</n-button>
        <n-button type="primary" @click="handleAddTodo">添加</n-button>
      </template>
    </n-modal>
  </n-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  NCard, NButton, NIcon, NList, NListItem, NCheckbox, NTag, 
  NStatistic, NDivider, NModal, NForm, NFormItem, NInput, 
  NSelect, NDatePicker 
} from 'naive-ui'
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

const showAddModal = ref(false)
const newTodo = ref({
  title: '',
  category: '工作',
  priority: 'medium',
  dueDate: null
})

const rules = {
  title: {
    required: true,
    message: '请输入任务标题',
    trigger: 'blur'
  }
}

const categories = computed(() => 
  todoStore.categories.map(cat => ({ label: cat, value: cat }))
)

const priorityOptions = [
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' }
]

const stats = computed(() => todoStore.stats)
const visibleTodos = computed(() => todoStore.todos.slice(0, 5))
const upcomingTodos = computed(() => todoStore.upcomingTodos)

const toggleTodo = (id) => {
  todoStore.toggleTodo(id)
}

const deleteTodo = (id) => {
  todoStore.deleteTodo(id)
}

const handleAddTodo = () => {
  if (!newTodo.value.title.trim()) return
  
  const todoData = {
    ...newTodo.value,
    dueDate: newTodo.value.dueDate ? 
      new Date(newTodo.value.dueDate).toISOString().split('T')[0] : ''
  }
  
  todoStore.addTodo(todoData)
  showAddModal.value = false
  newTodo.value = {
    title: '',
    category: '工作',
    priority: 'medium',
    dueDate: null
  }
}

const getPriorityColor = (priority) => {
  const priorityObj = todoStore.priorities.find(p => p.value === priority)
  return priorityObj ? priorityObj.color : '#d4d4d8'
}

const getPriorityLabel = (priority) => {
  const priorityObj = todoStore.priorities.find(p => p.value === priority)
  return priorityObj ? priorityObj.label : '中'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.todo-card {
  height: 100%;
}

.todo-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.todo-list {
  max-height: 300px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.todo-content {
  flex: 1;
  min-width: 0;
}

.todo-content.completed .todo-title {
  text-decoration: line-through;
  opacity: 0.6;
}

.todo-title {
  font-weight: 500;
  margin-bottom: 4px;
  word-break: break-word;
}

.todo-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.due-date {
  font-size: 0.8rem;
  color: #666;
}

.delete-btn {
  opacity: 0;
  transition: opacity 0.2s;
}

.todo-item:hover .delete-btn {
  opacity: 1;
}

.upcoming-section h4 {
  margin: 0 0 12px 0;
  color: #f59e0b;
}

.upcoming-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

:deep(.n-list-item) {
  padding: 8px 0;
}

:deep(.n-list-item:not(:last-child)) {
  border-bottom: 1px solid #f0f0f0;
}
</style>