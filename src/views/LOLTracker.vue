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

    <!-- 主标题区域 - 产品经理优化版 -->
    <div class="header-section">
      <div class="header-content">
        <!-- 面包屑导航 -->
        <div class="breadcrumb">
          <span class="breadcrumb-item" @click="switchTab('dashboard')">
            <n-icon size="14" class="breadcrumb-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </n-icon>
            仪表盘
          </span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item active">LOL战绩查询</span>
        </div>
        
        <!-- 主标题和描述 -->
        <div class="title-container">
          <h1 class="main-title">
            <span class="title-gradient">英雄联盟</span>
            <span class="title-subtitle">胜率分析</span>
          </h1>
          <p class="header-description">记录好友游戏战绩，分析胜率趋势，制定专属上分策略</p>
        </div>
        
        <!-- 关键指标卡片 -->
        <div class="key-metrics">
          <div class="metric-card">
            <div class="metric-value">{{ filteredFriends.length }}</div>
            <div class="metric-label">记录总数</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ totalGames }}</div>
            <div class="metric-label">总场次</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ overallWinRate }}%</div>
            <div class="metric-label">平均胜率</div>
          </div>
        </div>

        <!-- 操作区域 -->
        <div class="header-actions">
          <!-- 搜索框 -->
          <div class="search-container">
            <n-input
              v-model:value="searchKeyword"
              placeholder="搜索游戏ID或玩家昵称..."
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
          
          <!-- 筛选控件 -->
          <div class="filter-container">
            <n-select
              v-model:value="filterField"
              :options="filterOptions"
              size="large"
              style="width: 140px"
              placeholder="筛选条件"
              clearable
            />
            <n-select
              v-model:value="filterValue"
              :options="filterValueOptions"
              size="large"
              style="width: 140px"
              placeholder="筛选值"
              clearable
              :disabled="!filterField"
            />
          </div>
          
          <!-- 添加记录按钮 -->
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
          
          <!-- 批量操作按钮 -->
          <n-button 
            size="large" 
            @click="toggleBatchMode"
            :type="isBatchMode ? 'primary' : 'default'"
            class="batch-mode-btn"
          >
            <template #icon>
              <n-icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                  <path v-if="!isBatchMode" d="M7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7zm4-8h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2zm4-8h2v2h-2zm0 4h2v2h-2zm0 4h2v2h-2z"/>
                  <path v-else d="M7 7h10v2H7zm0 4h10v2H7zm0 4h10v2H7z"/>
                </svg>
              </n-icon>
            </template>
            {{ isBatchMode ? '批量操作' : '批量操作' }}
          </n-button>
          
          <!-- 操作菜单 -->
          <n-dropdown :options="actionOptions" @select="handleAction">
            <n-button size="large" class="action-menu-btn">
              <template #icon>
                <n-icon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </n-icon>
              </template>
            </n-button>
          </n-dropdown>
        </div>
      </div>
    </div>





    <!-- 批量操作工具栏 -->
    <div class="batch-toolbar" v-show="showBatchToolbar">
      <div class="batch-toolbar-content">
        <div class="batch-info">
          <span class="batch-count">已选择 {{ selectedFriends.size }} 项</span>
          <n-button size="small" text @click="clearSelection">取消选择</n-button>
        </div>
        <div class="batch-actions">
          <n-button size="small" type="warning" @click="batchDelete" :disabled="selectedFriends.size === 0">
            <template #icon>
              <n-icon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </n-icon>
            </template>
            批量删除
          </n-button>
          <n-button size="small" type="primary" @click="batchEdit" :disabled="selectedFriends.size !== 1">
            <template #icon>
              <n-icon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </n-icon>
            </template>
            批量编辑
          </n-button>
          <n-button size="small" @click="exitBatchMode">
            <template #icon>
              <n-icon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </n-icon>
            </template>
            退出批量模式
          </n-button>
        </div>
      </div>
    </div>

    <!-- 胜率排行榜 -->
    <div class="ranking-section">
      <div class="ranking-container">
        <!-- 排行榜头部 -->
        <div class="ranking-header">
          <div class="ranking-title-section">
            <h2 class="ranking-title">
              <n-icon size="24" class="ranking-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                </svg>
              </n-icon>
              胜率排行榜
            </h2>
            <div class="sort-controls">
              <n-select
                v-model:value="sortField"
                :options="sortOptions"
                size="small"
                style="width: 120px"
                placeholder="排序方式"
              />
              <n-button
                size="small"
                :type="sortOrder === 'desc' ? 'primary' : 'default'"
                @click="toggleSortOrder"
                class="sort-order-btn"
              >
                <template #icon>
                  <n-icon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
                    </svg>
                  </n-icon>
                </template>
                {{ sortOrder === 'desc' ? '降序' : '升序' }}
              </n-button>
            </div>
          </div>
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
                <th width="50">
                  <n-checkbox
                    v-model:checked="selectAllChecked"
                    :indeterminate="selectAllIndeterminate"
                    @update:checked="handleSelectAll"
                    v-show="isBatchMode"
                  />
                </th>
                <th width="80">排名</th>
                <th>游戏ID</th>
                <th width="100">胜场</th>
                <th width="100">总场次</th>
                <th width="150">胜率</th>
                <th width="120">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(friend, index) in pagedFriends" :key="friend.id" class="ranking-row" @click="handleRowClick(friend.id)">
                <td>
                  <n-checkbox 
                    :checked="isFriendSelected(friend.id)"
                    @update:checked="(value) => handleFriendSelect(friend.id, value)"
                    v-show="isBatchMode"
                    @click.stop
                  />
                </td>
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
          
          <!-- 分页组件 -->
          <div v-if="filteredFriends.length > 0" class="pagination-section">
            <div class="pagination-container">
              <n-pagination
                v-model:page="currentPage"
                :page-size="pageSize"
                :item-count="filteredFriends.length"
                :page-count="pageCount"
                show-quick-jumper
                show-size-changer
                :page-sizes="[10, 20, 50, 100]"
                @update:page="handlePageChange"
                @update:page-size="handlePageSizeChange"
              />
            </div>
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
import { ref, computed, onMounted, h } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage, useDialog } from 'naive-ui'
import { NInput, NButton, NTable, NCard, NEmpty, NModal, NInputNumber, NIcon, NDropdown, NCheckbox, NPagination } from 'naive-ui'

const router = useRouter()
const message = useMessage()
const dialog = useDialog()

// 切换标签页
const activeTab = ref('lol')
const switchTab = (tab) => {
  activeTab.value = tab
  if (tab === 'dashboard') {
    router.push('/dashboard')
  } else if (tab === 'lol') {
    router.push('/lol-tracker')
  }
}

// 数据状态
const newFriendName = ref('')
const newTotalGames = ref(null)
const newWins = ref(null)
const searchKeyword = ref('')
const showAddModal = ref(false)
// 加载状态
const operationInProgress = ref(false)

// 编辑相关状态
const showEditModal = ref(false)
const editFriendId = ref('')
const editFriendName = ref('')
const editTotalGames = ref(null)
const editWins = ref(null)

// 好友数据
const friends = ref([])

// 批量操作状态
const selectedFriends = ref(new Set())
const isBatchMode = ref(false)
const showBatchToolbar = ref(false)
const selectAllChecked = ref(false)
const selectAllIndeterminate = ref(false)

// 排序功能
const sortField = ref('winRate') // 默认按胜率排序
const sortOrder = ref('desc') // 默认降序

// 排序选项
const sortOptions = [
  { label: '胜率', value: 'winRate' },
  { label: '游戏场次', value: 'totalGames' },
  { label: '胜场数', value: 'wins' },
  { label: '名称', value: 'name' }
]

// 分页功能
const currentPage = ref(1)
const pageSize = ref(10)
const pageCount = computed(() => Math.ceil(filteredFriends.value.length / pageSize.value))
const pagedFriends = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return filteredFriends.value.slice(startIndex, endIndex)
})

const handlePageChange = (page) => {
  currentPage.value = page
}

const handlePageSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
}

// 筛选功能
const filterField = ref(null)

// 筛选选项
const filterOptions = [
  { label: '胜率范围', value: 'winRate' },
  { label: '游戏场次', value: 'totalGames' },
  { label: '胜场数', value: 'wins' }
]

// 筛选值选项
const filterValueOptions = computed(() => {
  if (!filterField.value) return []
  
  switch (filterField.value) {
    case 'winRate':
      return [
        { label: '高胜率 (≥60%)', value: 'high' },
        { label: '中等胜率 (40-60%)', value: 'medium' },
        { label: '低胜率 (<40%)', value: 'low' }
      ]
    case 'totalGames':
      return [
        { label: '少于100场', value: 'less100' },
        { label: '100-500场', value: '100-500' },
        { label: '500-1000场', value: '500-1000' },
        { label: '超过1000场', value: 'more1000' }
      ]
    case 'wins':
      return [
        { label: '少于50胜', value: 'less50' },
        { label: '50-200胜', value: '50-200' },
        { label: '超过200胜', value: 'more200' }
      ]
    default:
      return []
  }
})

// 处理操作菜单选择
const handleAction = (key) => {
  switch (key) {
    case 'export':
      exportData()
      break
    case 'import':
      importData()
      break
    case 'clear':
      clearAllData()
      break
  }
}

// 导出数据
const exportData = () => {
  const data = {
    friends: friends.value,
    exportDate: new Date().toISOString(),
    version: '1.0'
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lol-tracker-data-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  message.success('数据导出成功！')
}

// 导入数据
const importData = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result)
          if (data.friends && Array.isArray(data.friends)) {
            friends.value = data.friends
            saveData()
            message.success('数据导入成功！')
          } else {
            message.error('文件格式不正确！')
          }
        } catch (error) {
          message.error('文件解析失败！')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

// 清空所有数据
const clearAllData = () => {
  dialog.warning({
    title: '确认清空',
    content: '确定要清空所有游戏记录吗？此操作不可撤销！',
    positiveText: '确认清空',
    negativeText: '取消',
    onPositiveClick: () => {
      friends.value = []
      saveData()
      message.success('所有记录已清空！')
    }
  })
}

// 操作菜单选项
const actionOptions = [
  {
    label: '导出数据',
    key: 'export',
    icon: () => h('n-icon', {
      size: '16'
    }, () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor'
    }, [
      h('path', { d: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z' })
    ]))
  },
  {
    label: '导入数据',
    key: 'import',
    icon: () => h('n-icon', {
      size: '16'
    }, () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor'
    }, [
      h('path', { d: 'M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z' })
    ]))
  },
  {
    type: 'divider'
  },
  {
    label: '清空所有记录',
    key: 'clear',
    icon: () => h('n-icon', {
      size: '16'
    }, () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'currentColor'
    }, [
      h('path', { d: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' })
    ]))
  }
]

// 切换排序方向
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
}

// 排序函数
const sortFriends = (friendsArray) => {
  const sorted = [...friendsArray]
  
  sorted.sort((a, b) => {
    let comparison = 0
    
    switch (sortField.value) {
      case 'winRate':
        comparison = a.winRate - b.winRate
        break
      case 'totalGames':
        comparison = a.totalGames - b.totalGames
        break
      case 'wins':
        comparison = a.wins - b.wins
        break
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      default:
        comparison = a.winRate - b.winRate
    }
    
    return sortOrder.value === 'desc' ? -comparison : comparison
  })
  
  return sorted
}

// 筛选函数
const filterFriends = (friendsArray) => {
  let result = friendsArray
  
  // 筛选条件
  if (filterField.value && filterValue.value) {
    switch (filterField.value) {
      case 'winRate':
        switch (filterValue.value) {
          case 'high':
            result = result.filter(friend => friend.winRate >= 60)
            break
          case 'medium':
            result = result.filter(friend => friend.winRate >= 40 && friend.winRate < 60)
            break
          case 'low':
            result = result.filter(friend => friend.winRate < 40)
            break
        }
        break
      case 'totalGames':
        switch (filterValue.value) {
          case 'less100':
            result = result.filter(friend => friend.totalGames < 100)
            break
          case '100-500':
            result = result.filter(friend => friend.totalGames >= 100 && friend.totalGames < 500)
            break
          case '500-1000':
            result = result.filter(friend => friend.totalGames >= 500 && friend.totalGames < 1000)
            break
          case 'more1000':
            result = result.filter(friend => friend.totalGames >= 1000)
            break
        }
        break
      case 'wins':
        switch (filterValue.value) {
          case 'less50':
            result = result.filter(friend => friend.wins < 50)
            break
          case '50-200':
            result = result.filter(friend => friend.wins >= 50 && friend.wins < 200)
            break
          case 'more200':
            result = result.filter(friend => friend.wins >= 200)
            break
        }
        break
    }
  }
  
  return result
}

// 批量操作相关方法
const toggleBatchMode = () => {
  isBatchMode.value = !isBatchMode.value
  showBatchToolbar.value = isBatchMode.value
  if (!isBatchMode.value) {
    clearSelection()
  }
  updateSelectAllState()
}

const handleSelectAll = (checked) => {
  if (checked) {
    filteredFriends.value.forEach(friend => {
      selectedFriends.value.add(friend.id)
    })
  } else {
    selectedFriends.value.clear()
  }
  updateSelectAllState()
}

const handleFriendSelect = (friendId, checked) => {
  if (checked) {
    selectedFriends.value.add(friendId)
  } else {
    selectedFriends.value.delete(friendId)
  }
  updateSelectAllState()
}

const handleRowClick = (friendId) => {
  if (isBatchMode.value) {
    const isSelected = isFriendSelected(friendId)
    handleFriendSelect(friendId, !isSelected)
  }
}

const isFriendSelected = (friendId) => {
  return selectedFriends.value.has(friendId)
}

const updateSelectAllState = () => {
  const filteredCount = filteredFriends.value.length
  const selectedCount = selectedFriends.value.size
  
  if (selectedCount === 0) {
    selectAllChecked.value = false
    selectAllIndeterminate.value = false
  } else if (selectedCount === filteredCount) {
    selectAllChecked.value = true
    selectAllIndeterminate.value = false
  } else {
    selectAllChecked.value = false
    selectAllIndeterminate.value = true
  }
}

const clearSelection = () => {
  selectedFriends.value.clear()
  updateSelectAllState()
}

const exitBatchMode = () => {
  isBatchMode.value = false
  showBatchToolbar.value = false
  clearSelection()
}

// 批量删除
const batchDelete = () => {
  if (selectedFriends.value.size === 0) {
    message.warning('请先选择要删除的记录！')
    return
  }
  
  const selectedNames = friends.value
    .filter(friend => selectedFriends.value.has(friend.id))
    .map(friend => friend.name)
    .join(', ')
  
  dialog.warning({
    title: '确认批量删除',
    content: `确定要删除选中的 ${selectedFriends.value.size} 条记录吗？
${selectedNames}`,
    positiveText: '确认删除',
    negativeText: '取消',
    onPositiveClick: () => {
      friends.value = friends.value.filter(friend => !selectedFriends.value.has(friend.id))
      saveData()
      clearSelection()
      message.success(`成功删除 ${selectedFriends.value.size} 条记录`)
    }
  })
}

// 批量编辑（只支持单条编辑）
const batchEdit = () => {
  if (selectedFriends.value.size !== 1) {
    message.warning('批量编辑只支持单条记录编辑')
    return
  }
  
  const friendId = Array.from(selectedFriends.value)[0]
  const friend = friends.value.find(f => f.id === friendId)
  if (friend) {
    editFriend(friend)
  }
}

// 计算属性
const filteredFriends = computed(() => {
  let result = friends.value
  
  // 搜索过滤
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase().trim()
    result = result.filter(friend => friend.name.toLowerCase().includes(keyword))
  }
  
  // 筛选过滤
  result = filterFriends(result)
  
  // 排序
  return sortFriends(result)
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

// 胜率分布统计
const highWinRateCount = computed(() => {
  return friends.value.filter(friend => friend.winRate >= 60).length
})

const mediumWinRateCount = computed(() => {
  return friends.value.filter(friend => friend.winRate >= 40 && friend.winRate < 60).length
})

const lowWinRateCount = computed(() => {
  return friends.value.filter(friend => friend.winRate < 40).length
})

const highRatePercentage = computed(() => {
  const total = friends.value.length
  if (total === 0) return 0
  return Math.round((highWinRateCount.value / total) * 100)
})

const mediumRatePercentage = computed(() => {
  const total = friends.value.length
  if (total === 0) return 0
  return Math.round((mediumWinRateCount.value / total) * 100)
})

const lowRatePercentage = computed(() => {
  const total = friends.value.length
  if (total === 0) return 0
  return Math.round((lowWinRateCount.value / total) * 100)
})

// 游戏场次统计
const maxGames = computed(() => {
  if (friends.value.length === 0) return 0
  return Math.max(...friends.value.map(friend => friend.totalGames))
})

const minGames = computed(() => {
  if (friends.value.length === 0) return 0
  return Math.min(...friends.value.map(friend => friend.totalGames))
})

const avgGames = computed(() => {
  if (friends.value.length === 0) return 0
  const sum = friends.value.reduce((total, friend) => total + friend.totalGames, 0)
  return Math.round(sum / friends.value.length)
})

// 胜场统计
const totalLosses = computed(() => {
  return totalGames.value - totalWins.value
})

const winStreak = computed(() => {
  if (friends.value.length === 0) return 0
  let maxStreak = 0
  let currentStreak = 0
  
  // 模拟连胜统计（基于胜率）
  friends.value.forEach(friend => {
    if (friend.winRate >= 60) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  })
  
  return maxStreak
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
    dialog.warning({
      title: '确认删除',
      content: `确定要删除游戏记录 "${friend.name}" 吗？此操作不可撤销。`,
      positiveText: '确认删除',
      negativeText: '取消',
      onPositiveClick: () => {
        friends.value = friends.value.filter(f => f.id !== friendId)
        saveData()
        message.success(`游戏记录 ${friend.name} 已删除`)
      }
    })
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
  operationInProgress.value = true
  try {
    localStorage.setItem('lol-tracker-friends', JSON.stringify(friends.value))
  } finally {
    operationInProgress.value = false
  }
}

const loadData = () => {
  operationInProgress.value = true
  try {
    const saved = localStorage.getItem('lol-tracker-friends')
    if (saved) {
      friends.value = JSON.parse(saved)
    }
  } finally {
    operationInProgress.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
/* Apple风格设计系统 */
.lol-tracker {
  min-height: 100vh;
  background: #f5f5f7; /* 苹果官网背景色 */
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
  overflow-x: hidden;
}

/* 简洁背景 */
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
    rgba(245, 245, 247, 0.95) 0%, 
    rgba(230, 230, 235, 0.9) 50%, 
    rgba(220, 220, 225, 0.85) 100%);
}

/* 头部区域 - Apple风格 */
.header-section {
  position: relative;
  z-index: 1;
  padding: 32px 24px 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e8e8ed;
}

.header-content {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  width: 100%;
}

.title-container {
  flex: 1;
  min-width: 300px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 15px;
  color: #86868b;
}

.breadcrumb-item {
  cursor: pointer;
  transition: color 0.3s ease;
  color: #86868b;
}

.breadcrumb-item:hover {
  color: #007AFF;
}

.breadcrumb-item.active {
  color: #1d1d1f;
  font-weight: 600;
}

.breadcrumb-separator {
  color: #d2d2d7;
}

.main-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.2;
  color: #1d1d1f;
  letter-spacing: -0.5px;
}

.title-gradient {
  background: linear-gradient(135deg, #007AFF, #5856D6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-subtitle {
  color: #1d1d1f;
  margin-left: 8px;
}

.header-description {
  font-size: 17px;
  color: #86868b;
  margin: 0;
  font-weight: 400;
}

/* 关键指标卡片 */
.key-metrics {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.metric-card {
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  border: 1px solid #e8e8ed;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-width: 120px;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.metric-value {
  font-size: 28px;
  font-weight: 700;
  color: #007AFF;
  line-height: 1;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 14px;
  color: #86868b;
  font-weight: 500;
}

/* 头部操作区域 */
.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.search-container {
  min-width: 280px;
}

.filter-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input :deep(.n-input__input) {
  background: white !important;

  color: #1d1d1f !important;
  font-weight: 500 !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  font-size: 15px;
}

.search-input :deep(.n-input__input:hover) {
  border-color: #c7c7cc !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
}

.search-input :deep(.n-input__input:focus) {
  border-color: #007AFF !important;
  box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2) !important;
}

.add-button {
  background: #007AFF !important;
  border: none !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  font-size: 15px;
}

.add-button:hover {
  background: #0056CC !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3) !important;
}

.batch-mode-btn {
  background: #34C759 !important;
  border: none !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  font-size: 15px;
}

.batch-mode-btn:hover {
  background: #30A14E !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(52, 199, 89, 0.3) !important;
}

/* 批量操作工具栏 */
.batch-toolbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: #007AFF;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 122, 255, 0.3);
}

.batch-toolbar-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.batch-info {
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
}

.batch-count {
  font-weight: 600;
  font-size: 15px;
}

.batch-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* 排行榜区域 */
.ranking-section {
  position: relative;
  z-index: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 32px 24px;
}

.ranking-container {
  background: white;
  border: 1px solid #e8e8ed;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.ranking-header {
  background: #f5f5f7;
  padding: 24px 32px;
  border-bottom: 1px solid #e8e8ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.ranking-title-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ranking-title {
  font-size: 20px;
  font-weight: 600;
  color: #1d1d1f;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.sort-order-btn {
  border-radius: 8px !important;
  font-size: 14px;
}

.ranking-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  font-size: 14px;
  color: #86868b;
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
  background: #f5f5f7 !important;
  color: #1d1d1f !important;
  font-weight: 600 !important;
  border-bottom: 1px solid #e8e8ed !important;
  padding: 16px 12px !important;
  font-size: 15px;
}

.ranking-table :deep(td) {
  background: white !important;
  color: #1d1d1f !important;
  border-bottom: 1px solid #f0f0f0 !important;
  padding: 16px 12px !important;
  font-size: 15px;
}

.ranking-row:hover {
  background-color: #f8f9fa !important;
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
  background: #FF9500;
}

.rank-2 {
  background: #8E8E93;
}

.rank-3 {
  background: #FF3B30;
}

.rank-other {
  background: #007AFF;
}

/* 游戏ID样式 */
.name-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.name-text {
  font-weight: 600;
  color: #1d1d1f;
}

.expert-badge {
  background: #34C759;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.normal-badge {
  background: #007AFF;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.novice-badge {
  background: #FF3B30;
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
  gap: 12px;
}

.rate-text {
  font-weight: 600;
  color: #1d1d1f;
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
  background: #34C759;
}

.medium-rate {
  background: #007AFF;
}

.low-rate {
  background: #FF3B30;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 8px;
  align-items: center;
}

.edit-btn {
  background: #007AFF !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  font-size: 14px;
}

.edit-btn:hover {
  background: #0056CC !important;
  transform: translateY(-1px) !important;
}

.remove-btn {
  background: #FF3B30 !important;
  border: none !important;
  color: white !important;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  font-size: 14px;
}

.remove-btn:hover {
  background: #D70015 !important;
  transform: translateY(-1px) !important;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #86868b;
}

/* 弹窗样式 */
.add-modal ,
.edit-modal {
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e8e8ed;
}

.add-modal :deep(.n-card-header),
.edit-modal :deep(.n-card-header) {
  
  background: #f5f5f7;
  border-bottom: 1px solid #e8e8ed;
  color: #1d1d1f;
  font-weight: 600;
  font-size: 17px;
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
  color: #1d1d1f;
  font-size: 15px;
}

.modal-input :deep(.n-input__input) {
  background: white !important;

  color: #1d1d1f !important;
  font-size: 15px;
}

.modal-input :deep(.n-input__input:focus) {
  border-color: #007AFF !important;
  box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2) !important;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.cancel-btn {
  color: #86868b !important;
  border-color: #d2d2d7 !important;
}

.confirm-btn {
  background: #007AFF !important;
  border: none !important;
}

/* 批量模式下行的样式 */
.ranking-row {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.ranking-row:hover {
  background-color: #f8f9fa !important;
}

.ranking-row.selected {
  background-color: #e6f2ff !important;
  border-left: 3px solid #007AFF;
}

/* 响应式设计 */
@media (max-width: 767px) {
  .dashboard-container {
    padding: 20px 16px;
  }
  
  .header-section {
    padding: 20px 16px;
  }
  
  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .main-title {
    font-size: 28px;
  }
  
  .header-actions {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .search-container {
    min-width: auto;
    flex: 1;
  }
  
  .key-metrics {
    justify-content: space-around;
  }
  
  .ranking-header {
    padding: 20px;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  
  .ranking-stats {
    justify-content: space-between;
  }
  
  .batch-toolbar-content {
    padding: 12px 16px;
    flex-direction: column;
    gap: 12px;
  }
  
  .batch-actions {
    justify-content: space-around;
  }
  
  /* 分页样式 - Apple风格 */
  .pagination-section {
    margin-top: 24px;
    padding: 16px 0;
    display: flex;
    justify-content: center;
    border-top: 1px solid #e8e8ed;
  }
  
  .pagination-container {
    width: 100%;
    max-width: 600px;
  }
  
  .pagination-container :deep(.n-pagination) {
    justify-content: center;
  }
  
  .pagination-container :deep(.n-pagination-item) {
    background: white;
    border: 1px solid #d2d2d7;
    border-radius: 8px;
    color: #1d1d1f;
    font-weight: 500;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  .pagination-container :deep(.n-pagination-item:hover) {
    background: #f5f5f7;
    border-color: #c7c7cc;
    transform: translateY(-1px);
  }
  
  .pagination-container :deep(.n-pagination-item--active) {
    background: #007AFF;
    border-color: #007AFF;
    color: white;
  }
  
  .pagination-container :deep(.n-pagination-item--active:hover) {
    background: #0056CC;
    border-color: #0056CC;
  }
  
  .pagination-container :deep(.n-pagination-jump) {
    color: #86868b;
  }
  
  .pagination-container :deep(.n-pagination-quick-jumper) {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
  .pagination-container :deep(.n-pagination-quick-jumper-input) {
    background: white;
    border: 1px solid #d2d2d7;
    border-radius: 6px;
    color: #1d1d1f;
  }
  
  .pagination-container :deep(.n-pagination-quick-jumper-input:focus) {
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
  }
  
  .pagination-container :deep(.n-pagination-sizes) {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
  .pagination-container :deep(.n-pagination-sizes-select) {
    background: white;
    border: 1px solid #d2d2d7;
    border-radius: 6px;
  }
  
  .pagination-container :deep(.n-pagination-sizes-select:hover) {
    border-color: #c7c7cc;
  }
  
  .pagination-container :deep(.n-pagination-sizes-select:focus) {
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
  }
}
</style>