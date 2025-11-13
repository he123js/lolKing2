<template>
  <n-card class="github-card" title="GitHub 数据">
    <div class="github-content">
      <div v-if="loading" class="loading-state">
        <n-spin size="large">
          <template #description>
            正在获取 GitHub 数据...
          </template>
        </n-spin>
      </div>
      
      <div v-else-if="error" class="error-state">
        <n-icon size="48" class="error-icon">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z"/>
          </svg>
        </n-icon>
        <p>获取 GitHub 数据失败</p>
        <n-button @click="fetchGitHubData" type="primary" size="small">
          重试
        </n-button>
      </div>
      
      <div v-else class="github-data">
        <div class="user-info">
          <n-avatar
            round
            size="large"
            :src="userData.avatar_url"
            :fallback-src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.login}`"
          />
          <div class="user-details">
            <h3>{{ userData.name || userData.login }}</h3>
            <p>{{ userData.bio || '暂无简介' }}</p>
            <div class="user-stats">
              <span>📍 {{ userData.location || '未知' }}</span>
              <span>📧 {{ userData.email || '未公开' }}</span>
            </div>
          </div>
        </div>
        
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ userData.public_repos || 0 }}</div>
            <div class="stat-label">仓库</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ userData.followers || 0 }}</div>
            <div class="stat-label">粉丝</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ userData.following || 0 }}</div>
            <div class="stat-label">关注</div>
          </div>
        </div>
        
        <div class="recent-activity">
          <h4>最近动态</h4>
          <div v-if="recentActivity.length === 0" class="no-activity">
            <p>暂无最近动态</p>
          </div>
          <div v-else class="activity-list">
            <div 
              v-for="activity in recentActivity" 
              :key="activity.id" 
              class="activity-item"
            >
              <n-icon size="16" class="activity-icon">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z"/>
                </svg>
              </n-icon>
              <span class="activity-text">{{ activity.text }}</span>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
        
        <div class="github-actions">
          <n-button 
            type="primary" 
            ghost 
            size="small"
            @click="openGitHubProfile"
          >
            查看 GitHub 主页
          </n-button>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NCard, NAvatar, NIcon, NButton, NSpin } from 'naive-ui'

const loading = ref(true)
const error = ref(false)
const userData = ref({})
const recentActivity = ref([])

// 模拟 GitHub 用户数据
const mockUserData = {
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  bio: 'A mysterious octocat',
  location: 'San Francisco',
  email: 'octocat@github.com',
  public_repos: 8,
  followers: 3938,
  following: 9
}

// 模拟最近动态
const mockActivity = [
  { id: 1, text: '提交了新的代码', time: '2小时前' },
  { id: 2, text: '创建了新的仓库', time: '1天前' },
  { id: 3, text: '关注了新的开发者', time: '3天前' }
]

const fetchGitHubData = async () => {
  try {
    loading.value = true
    error.value = false
    
    // 模拟 API 调用延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 实际项目中这里会调用 GitHub API
    // const response = await fetch('https://api.github.com/users/用户名')
    // const data = await response.json()
    
    // 使用模拟数据
    userData.value = mockUserData
    recentActivity.value = mockActivity
    
  } catch (err) {
    console.error('获取 GitHub 数据失败:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

const openGitHubProfile = () => {
  // 实际项目中这里会打开真实的 GitHub 主页
  window.open('https://github.com/octocat', '_blank')
}

onMounted(() => {
  fetchGitHubData()
})
</script>

<style scoped>
.github-card {
  height: 100%;
}

.github-content {
  padding: 8px 0;
}

.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.error-icon {
  margin-bottom: 16px;
  color: #ff4d4f;
}

.github-data {
  padding: 8px 0;
}

.user-info {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.user-details {
  margin-left: 16px;
  flex: 1;
}

.user-details h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.user-details p {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 0.9rem;
}

.user-stats {
  display: flex;
  gap: 16px;
  font-size: 0.8rem;
  color: #999;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
}

.recent-activity {
  margin-bottom: 20px;
}

.recent-activity h4 {
  margin: 0 0 12px 0;
  font-size: 1rem;
  font-weight: 600;
}

.no-activity {
  text-align: center;
  padding: 20px;
  color: #999;
  font-style: italic;
}

.activity-list {
  space-y: 8px;
}

.activity-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f8f9fa;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  margin-right: 8px;
  color: #52c41a;
  flex-shrink: 0;
}

.activity-text {
  flex: 1;
  font-size: 0.9rem;
}

.activity-time {
  font-size: 0.8rem;
  color: #999;
  flex-shrink: 0;
}

.github-actions {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}
</style>