<template>
  <div class="lol-tracker">
    <!-- 蓝白色主题背景 -->
    <div class="blue-white-background">
      <div class="bg-gradient"></div>
      <div class="bg-particles">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
      </div>
    </div>

    <!-- 主标题区域 -->
    <div class="header-section">
      <div class="header-content">
        <div class="title-container">
          <h1 class="main-title">
            <span class="title-blue">英雄联盟</span>
            <span class="title-white">胜率排行榜</span>
          </h1>
          <p class="header-description">实时追踪游戏战绩，查看好友胜率排名</p>
        </div>
        
        <!-- 搜索和添加按钮 -->
        <div class="header-actions">
          <div class="search-container">
            <n-input
              v-model:value="searchKeyword"
              placeholder="搜索游戏ID..."
              size="large"
              round
              class="search-input"
            >
              <template #prefix>
                <n-icon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                </n-icon>
              </template>
            </n-input>
          </div>
          <n-button 
            type="primary" 
            size="large" 
            @click="showAddModal = true"
            class="add-button"
          >
            <template #icon>
              <n-icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                </svg>
              </n-icon>
            </template>
            添加记录
          </n-button>
        </div>
      </div>
    </div>

    <!-- 胜率排行榜 -->
    <div class="ranking-section">
      <div class="ranking-container">
        <!-- 排行榜头部 -->
        <div class="ranking-header">
          <h2 class="ranking-title">
            <n-icon size="24" class="ranking-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
            </n-icon>
            胜率排行榜
          </h2>
          <div class="ranking-stats">
            <span class="stat-item">总记录：{{ filteredFriends.length }}</span>
            <span class="stat-item">总场次：{{ totalGames }}</span>
            <span class="stat-item">平均胜率：{{ overallWinRate }}%</span>
          </div>
        </div>

        <!-- 排行榜内容 -->
        <div class="ranking-content">
          <n-table :bordered="false" :single-line="false" class="ranking-table">
            <thead>
              <tr>
                <th width="80">排名</th>
                <th>游戏ID</th>
                <th width="100">胜场</th>
                <th width="100">总场次</th>
                <th width="150">胜率</th>
                <th width="120">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(friend, index) in filteredFriends" :key="friend.id" class="ranking-row">
                <td>
                  <div class="rank-badge" :class="getRankClass(index + 1)">
                    {{ index + 1 }}
                  </div>
                </td>
                <td class="friend-name">
                  <div class="name-container">
                    <span class="name-text">{{ friend.name }}</span>
                    <span v-if="friend.winRate >= 60" class="expert-badge">大神</span>
                    <span v-else-if="friend.winRate >= 40" class="normal-badge">普通</span>
                    <span v-else class="novice-badge">新手</span>
                  </div>
                </td>
                <td class="win-count">{{ friend.wins }}</td>
                <td class="total-games">{{ friend.totalGames }}</td>
                <td class="win-rate">
                  <div class="win-rate-container">
                    <span class="rate-text">{{ friend.winRate }}%</span>
                    <div class="rate-bar">
                      <div 
                        class="rate-fill" 
                        :style="{ width: friend.winRate + '%' }"
                        :class="{ 'high-rate': friend.winRate >= 60, 'medium-rate': friend.winRate >= 40 && friend.winRate < 60, 'low-rate': friend.winRate < 40 }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="action-buttons">
                    <n-button 
                      size="small" 
                      type="primary" 
                      @click="editFriend(friend)"
                      class="edit-btn"
                    >
                      编辑
                    </n-button>
                    <n-button 
                      size="small" 
                      type="error" 
                      @click="removeFriend(friend.id)"
                      class="remove-btn"
                    >
                      删除
                    </n-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </n-table>
          
          <div v-if="filteredFriends.length === 0" class="empty-state">
            <n-empty description="暂无游戏记录">
              <template #icon>
                <n-icon>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
                    <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z"/>
                    <path d="M24 16c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 12c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
                  </svg>
                </n-icon>
              </template>
            </n-empty>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加记录弹窗 -->
    <n-modal v-model:show="showAddModal" class="add-modal">
      <n-card
        style="width: 500px"
        title="添加游戏记录"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-content">
          <div class="form-group">
            <label class="form-label">游戏ID</label>
            <n-input
              v-model:value="newFriendName"
              placeholder="请输入游戏ID"
              size="large"
              class="modal-input"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">总场次</label>
            <n-input-number
              v-model:value="newTotalGames"
              :min="1"
              :max="9999"
              placeholder="请输入总场次"
              size="large"
              class="modal-input"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">胜场数</label>
            <n-input-number
              v-model:value="newWins"
              :min="0"
              :max="newTotalGames || 9999"
              placeholder="请输入胜场数"
              size="large"
              class="modal-input"
            />
          </div>
          
          <div class="modal-actions">
            <n-button @click="showAddModal = false" class="cancel-btn">取消</n-button>
            <n-button 
              type="primary" 
              @click="addFriend" 
              :disabled="!newFriendName.trim() || !newTotalGames || !newWins"
              class="confirm-btn"
            >
              保存记录
            </n-button>
          </div>
        </div>
      </n-card>
    </n-modal>

    <!-- 编辑记录弹窗 -->
    <n-modal v-model:show="showEditModal" class="edit-modal">
      <n-card
        style="width: 500px"
        :title="'编辑游戏记录 - ' + editFriendName"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <div class="modal-content">
          <div class="form-group">
            <label class="form-label">游戏ID</label>
            <n-input
              v-model:value="editFriendName"
              placeholder="请输入游戏ID"
              size="large"
              class="modal-input"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">总场次</label>
            <n-input-number
              v-model:value="editTotalGames"
              :min="1"
              :max="9999"
              placeholder="请输入总场次"
              size="large"
              class="modal-input"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">胜场数</label>
            <n-input-number
              v-model:value="editWins"
              :min="0"
              :max="editTotalGames || 9999"
              placeholder="请输入胜场数"
              size="large"
              class="modal-input"
            />
          </div>
          
          <div class="modal-actions">
            <n-button @click="showEditModal = false" class="cancel-btn">取消</n-button>
            <n-button 
              type="primary" 
              @click="updateFriend" 
              :disabled="!editFriendName.trim() || !editTotalGames || !editWins"
              class="confirm-btn"
            >
              保存修改
            </n-button>
          </div>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { NInput, NButton, NTable, NCard, NEmpty, NModal, NInputNumber } from 'naive-ui'

const message = useMessage()

// 数据状态
const newFriendName = ref('')
const newTotalGames = ref(null)
const newWins = ref(null)
const searchKeyword = ref('')
const showAddModal = ref(false)

// 编辑相关状态
const showEditModal = ref(false)
const editFriendId = ref('')
const editFriendName = ref('')
const editTotalGames = ref(null)
const editWins = ref(null)

// 好友数据
const friends = ref([])

// 计算属性
const filteredFriends = computed(() => {
  if (!searchKeyword.value.trim()) {
    return [...friends.value].sort((a, b) => b.winRate - a.winRate)
  }
  
  const keyword = searchKeyword.value.toLowerCase().trim()
  return friends.value
    .filter(friend => friend.name.toLowerCase().includes(keyword))
    .sort((a, b) => b.winRate - a.winRate)
})

const sortedFriends = computed(() => {
  return [...friends.value].sort((a, b) => b.winRate - a.winRate)
})

const totalGames = computed(() => {
  return friends.value.reduce((total, friend) => total + friend.totalGames, 0)
})

const totalWins = computed(() => {
  return friends.value.reduce((total, friend) => total + friend.wins, 0)
})

const overallWinRate = computed(() => {
  if (totalGames.value === 0) return 0
  return Math.round((totalWins.value / totalGames.value) * 100)
})

// 方法
const addFriend = () => {
  const name = newFriendName.value.trim()
  const totalGames = newTotalGames.value
  const wins = newWins.value
  
  if (!name || !totalGames || wins === null) {
    message.warning('请填写完整信息！')
    return
  }
  
  if (wins > totalGames) {
    message.warning('胜场数不能大于总场次！')
    return
  }
  
  // 检查是否已存在
  if (friends.value.some(friend => friend.name === name)) {
    message.warning('该游戏ID已存在！')
    return
  }
  
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0
  
  const newFriend = {
    id: Date.now().toString(),
    name: name,
    wins: wins,
    totalGames: totalGames,
    winRate: winRate
  }
  
  friends.value.push(newFriend)
  
  // 重置表单
  newFriendName.value = ''
  newTotalGames.value = null
  newWins.value = null
  showAddModal.value = false
  
  saveData()
  message.success(`游戏记录 ${name} 添加成功！`)
}

const removeFriend = (friendId) => {
  const friend = friends.value.find(f => f.id === friendId)
  if (friend) {
    friends.value = friends.value.filter(f => f.id !== friendId)
    saveData()
    message.success(`游戏记录 ${friend.name} 已删除`)
  }
}



// 编辑相关方法
const editFriend = (friend) => {
  editFriendId.value = friend.id
  editFriendName.value = friend.name
  editTotalGames.value = friend.totalGames
  editWins.value = friend.wins
  showEditModal.value = true
}

const updateFriend = () => {
  const name = editFriendName.value.trim()
  const totalGames = editTotalGames.value
  const wins = editWins.value
  
  if (!name || !totalGames || wins === null) {
    message.warning('请填写完整信息！')
    return
  }
  
  if (wins > totalGames) {
    message.warning('胜场数不能大于总场次！')
    return
  }
  
  // 检查是否已存在（排除当前编辑的记录）
  const existingFriend = friends.value.find(friend => 
    friend.name === name && friend.id !== editFriendId.value
  )
  if (existingFriend) {
    message.warning('该游戏ID已存在！')
    return
  }
  
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0
  
  // 更新记录
  const friendIndex = friends.value.findIndex(f => f.id === editFriendId.value)
  if (friendIndex !== -1) {
    friends.value[friendIndex] = {
      ...friends.value[friendIndex],
      name: name,
      wins: wins,
      totalGames: totalGames,
      winRate: winRate
    }
  }
  
  // 重置表单
  editFriendId.value = ''
  editFriendName.value = ''
  editTotalGames.value = null
  editWins.value = null
  showEditModal.value = false
  
  saveData()
  message.success(`游戏记录 ${name} 更新成功！`)
}

const getRankClass = (rank) => {
  if (rank === 1) return 'rank-1'
  if (rank === 2) return 'rank-2'
  if (rank === 3) return 'rank-3'
  return 'rank-other'
}

// 数据持久化
const saveData = () => {
  localStorage.setItem('lol-tracker-friends', JSON.stringify(friends.value))
}

const loadData = () => {
  const saved = localStorage.getItem('lol-tracker-friends')
  if (saved) {
    friends.value = JSON.parse(saved)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.lol-tracker {
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 50%, #d9ecff 100%);
  overflow-x: hidden;
}

/* 蓝白色主题背景 */
.blue-white-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(240, 248, 255, 0.95) 0%, 
    rgba(230, 243, 255, 0.9) 50%, 
    rgba(217, 236, 255, 0.85) 100%);
}

.bg-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: linear-gradient(45deg, #1890ff, #40a9ff, #69c0ff);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
  opacity: 0.2;
}

.particle-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.particle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.particle-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.particle-4 {
  width: 120px;
  height: 120px;
  top: 30%;
  right: 30%;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.2;
  }
  50% {
    transform: translateY(-20px) rotate(180deg) scale(1.1);
    opacity: 0.4;
  }
}

/* 头部区域 */
.header-section {
  position: relative;
  z-index: 1;
  padding: 40px 20px 30px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(24, 144, 255, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.title-container {
  flex: 1;
  min-width: 300px;
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.2;
}

.title-blue {
  color: #1890ff;
}

.title-white {
  color: #333;
  margin-left: 10px;
}

.header-description {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

/* 头部操作区域 */
.header-actions {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.search-container {
  min-width: 250px;
}

.search-input :deep(.n-input__input) {
  background: rgba(255, 255, 255, 0.95) !important;
  border: 2px solid rgba(24, 144, 255, 0.2) !important;
  border-radius: 12px !important;
  color: #333 !important;
  font-weight: 500 !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.1) !important;
}

.search-input :deep(.n-input__input:hover) {
  border-color: rgba(24, 144, 255, 0.4) !important;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15) !important;
}

.search-input :deep(.n-input__input:focus) {
  border-color: #1890ff !important;
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.2), 0 4px 16px rgba(24, 144, 255, 0.2) !important;
  transform: translateY(-1px) !important;
}

.search-input :deep(.n-input__input::placeholder) {
  color: #999 !important;
  font-weight: 400 !important;
}

.add-button {
  background: linear-gradient(135deg, #1890ff, #40a9ff) !important;
  border: none !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.add-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(24, 144, 255, 0.3) !important;
}

/* 排行榜区域 */
.ranking-section {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.ranking-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(24, 144, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(24, 144, 255, 0.1);
}

.ranking-header {
  background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
  padding: 25px 30px;
  border-bottom: 1px solid rgba(24, 144, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
}

.ranking-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1890ff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ranking-icon {
  color: #1890ff;
}

.ranking-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.ranking-content {
  padding: 0;
}

.ranking-table {
  width: 100%;
  margin: 0;
}

.ranking-table :deep(th) {
  background: #f0f8ff !important;
  color: #1890ff !important;
  font-weight: 600 !important;
  border-bottom: 1px solid #e6f3ff !important;
  padding: 16px 12px !important;
}

.ranking-table :deep(td) {
  background: rgba(255, 255, 255, 0.9) !important;
  color: #333 !important;
  border-bottom: 1px solid #f0f0f0 !important;
  padding: 16px 12px !important;
}

.ranking-row:hover {
  background-color: #f8fbff !important;
}

/* 排名徽章 */
.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-weight: 700;
  color: white;
  font-size: 14px;
}

.rank-1 {
  background: linear-gradient(135deg, #ffd700, #ffa500);
}

.rank-2 {
  background: linear-gradient(135deg, #c0c0c0, #a0a0a0);
}

.rank-3 {
  background: linear-gradient(135deg, #cd7f32, #a0522d);
}

.rank-other {
  background: #69c0ff;
}

/* 游戏ID样式 */
.name-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-text {
  font-weight: 600;
  color: #333;
}

.expert-badge {
  background: linear-gradient(135deg, #52c41a, #73d13d);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.normal-badge {
  background: linear-gradient(135deg, #1890ff, #40a9ff);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.novice-badge {
  background: linear-gradient(135deg, #ff4d4f, #ff7875);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

/* 胜率条样式 */
.win-rate-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rate-text {
  font-weight: 600;
  color: #333;
  min-width: 40px;
}

.rate-bar {
  flex: 1;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.rate-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.high-rate {
  background: linear-gradient(90deg, #52c41a, #73d13d);
}

.medium-rate {
  background: linear-gradient(90deg, #1890ff, #40a9ff);
}

.low-rate {
  background: linear-gradient(90deg, #ff4d4f, #ff7875);
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.edit-btn {
  font-size: 12px;
  background: linear-gradient(135deg, #52c41a, #73d13d) !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.edit-btn:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.3) !important;
}

.remove-btn {
  font-size: 12px;
  background: linear-gradient(135deg, #ff4d4f, #ff7875) !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.remove-btn:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(255, 77, 79, 0.3) !important;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}

/* 弹窗样式 */
.add-modal :deep(.n-card) {
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.add-modal :deep(.n-card-header) {
  background: linear-gradient(135deg, #f0f8ff, #e6f3ff);
  border-bottom: 1px solid #e6f3ff;
  color: #1890ff;
  font-weight: 600;
}

.modal-content {
  padding: 10px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

.modal-input :deep(.n-input__input) {
  background: #f8fbff !important;
  border: 1px solid #d9d9d9 !important;
  color: #333 !important;
}

.modal-input :deep(.n-input__input:focus) {
  border-color: #1890ff !important;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2) !important;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 25px;
}

.cancel-btn {
  color: #666 !important;
  border-color: #d9d9d9 !important;
}

.confirm-btn {
  background: linear-gradient(135deg, #1890ff, #40a9ff) !important;
  border: none !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-section {
    padding: 30px 15px 20px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .title-container {
    text-align: center;
    min-width: auto;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .search-container {
    min-width: auto;
    flex: 1;
  }
  
  .ranking-header {
    padding: 20px;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  
  .ranking-stats {
    justify-content: space-between;
  }
  
  .ranking-table :deep(th),
  .ranking-table :deep(td) {
    padding: 12px 8px !important;
    font-size: 14px;
  }
  
  .name-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .win-rate-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  
  .rate-bar {
    width: 100%;
  }
}
</style>