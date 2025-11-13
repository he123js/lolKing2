<template>
  <n-card class="system-card" title="系统信息">
    <div class="system-content">
      <div class="time-section">
        <div class="current-time">{{ currentTime }}</div>
        <div class="current-date">{{ currentDate }}</div>
      </div>
      
      <div class="system-stats">
        <div class="stat-item">
          <n-icon size="20" class="stat-icon">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,7V13L16.2,16.1L17,14.9L12.5,12.2V7H11M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12Z"/>
            </svg>
          </n-icon>
          <div class="stat-info">
            <span class="stat-label">在线时间</span>
            <span class="stat-value">{{ onlineTime }}</span>
          </div>
        </div>
        
        <div class="stat-item">
          <n-icon size="20" class="stat-icon">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"/>
            </svg>
          </n-icon>
          <div class="stat-info">
            <span class="stat-label">浏览器</span>
            <span class="stat-value">{{ browserInfo }}</span>
          </div>
        </div>
        
        <div class="stat-item">
          <n-icon size="20" class="stat-icon">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M6.5,20Q4.22,20 2.61,18.43Q1,16.85 1,14.58Q1,12.63 2.17,11.1Q3.35,9.57 5.25,9.15Q5.88,6.85 7.75,5.43Q9.63,4 12,4Q14.93,4 16.96,6.04Q19,8.07 19,11Q20.73,11.21 21.86,12.5Q23,13.78 23,15.5Q23,17.38 21.69,18.69Q20.38,20 18.5,20H6.5Z"/>
            </svg>
          </n-icon>
          <div class="stat-info">
            <span class="stat-label">操作系统</span>
            <span class="stat-value">{{ osInfo }}</span>
          </div>
        </div>
        
        <div class="stat-item">
          <n-icon size="20" class="stat-icon">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M6.5,20Q4.22,20 2.61,18.43Q1,16.85 1,14.58Q1,12.63 2.17,11.1Q3.35,9.57 5.25,9.15Q5.88,6.85 7.75,5.43Q9.63,4 12,4Q14.93,4 16.96,6.04Q19,8.07 19,11Q20.73,11.21 21.86,12.5Q23,13.78 23,15.5Q23,17.38 21.69,18.69Q20.38,20 18.5,20H6.5Z"/>
            </svg>
          </n-icon>
          <div class="stat-info">
            <span class="stat-label">网络状态</span>
            <span class="stat-value">
              <n-tag :type="networkStatus.online ? 'success' : 'error'" size="small">
                {{ networkStatus.online ? '在线' : '离线' }}
              </n-tag>
            </span>
          </div>
        </div>
      </div>
      
      <div class="quick-actions">
        <n-button-group>
          <n-button @click="refreshData" secondary>
            <template #icon>
              <n-icon>
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
                </svg>
              </n-icon>
            </template>
            刷新数据
          </n-button>
          <n-button @click="toggleTheme" secondary>
            <template #icon>
              <n-icon>
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7.5,2C5.71,3.15 4.5,5.18 4.5,7.5C4.5,9.82 5.71,11.85 7.53,13C4.46,13 2,10.54 2,7.5A5.5,5.5 0 0,1 7.5,2M19.07,3.5L20.5,4.93L4.93,20.5L3.5,19.07L19.07,3.5M12.89,5.93L11.41,5L9.97,6L10.39,4.3L9,3.24L10.75,3.12L11.33,1.47L12,3.1L13.73,3.13L12.38,4.26L12.89,5.93M9.59,9.54L8.43,8.81L7.31,9.59L7.65,8.27L6.56,7.44L7.92,7.35L8.37,6.06L8.88,7.33L10.24,7.36L9.19,8.23L9.59,9.54M19,13.5A5.5,5.5 0 0,1 13.5,19C12.28,19 11.15,18.6 10.24,17.93L17.93,10.24C18.6,11.15 19,12.28 19,13.5Z"/>
                </svg>
              </n-icon>
            </template>
            切换主题
          </n-button>
        </n-button-group>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { NCard, NIcon, NButton, NButtonGroup, NTag } from 'naive-ui'

const currentTime = ref('')
const currentDate = ref('')
const onlineTime = ref('0分钟')
const browserInfo = ref('')
const osInfo = ref('')
const networkStatus = ref({
  online: navigator.onLine
})

let startTime = Date.now()
let timer = null

// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
  
  currentDate.value = now.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
  
  // 计算在线时间
  const elapsed = Date.now() - startTime
  const minutes = Math.floor(elapsed / 60000)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (hours > 0) {
    onlineTime.value = `${hours}小时${remainingMinutes}分钟`
  } else {
    onlineTime.value = `${minutes}分钟`
  }
}

// 获取浏览器信息
const getBrowserInfo = () => {
  const ua = navigator.userAgent
  let browser = '未知浏览器'
  
  if (ua.includes('Chrome') && !ua.includes('Edg')) {
    browser = 'Chrome'
  } else if (ua.includes('Firefox')) {
    browser = 'Firefox'
  } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
    browser = 'Safari'
  } else if (ua.includes('Edg')) {
    browser = 'Edge'
  }
  
  browserInfo.value = browser
}

// 获取操作系统信息
const getOSInfo = () => {
  const ua = navigator.userAgent
  let os = '未知系统'
  
  if (ua.includes('Win')) {
    os = 'Windows'
  } else if (ua.includes('Mac')) {
    os = 'macOS'
  } else if (ua.includes('Linux')) {
    os = 'Linux'
  } else if (ua.includes('Android')) {
    os = 'Android'
  } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    os = 'iOS'
  }
  
  osInfo.value = os
}

// 监听网络状态
const handleOnline = () => {
  networkStatus.value.online = true
}

const handleOffline = () => {
  networkStatus.value.online = false
}

// 刷新数据
const refreshData = () => {
  startTime = Date.now()
  updateTime()
  getBrowserInfo()
  getOSInfo()
}

// 切换主题（示例功能）
const toggleTheme = () => {
  console.log('切换主题')
  // 实际项目中这里会集成主题切换功能
}

onMounted(() => {
  updateTime()
  getBrowserInfo()
  getOSInfo()
  
  // 每秒更新时间
  timer = setInterval(updateTime, 1000)
  
  // 监听网络状态
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
})
</script>

<style scoped>
.system-card {
  height: 100%;
}

.system-content {
  padding: 8px 0;
}

.time-section {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #646465 0%, #e3dee9 100%);
  border-radius: 12px;
  color: white;
}

.current-time {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 8px;
}

.current-date {
  font-size: 1rem;
  opacity: 0.9;
}

.system-stats {
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-icon {
  margin-right: 12px;
  color: #1890ff;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.stat-value {
  font-weight: 600;
  color: #1890ff;
}

.quick-actions {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
</style>