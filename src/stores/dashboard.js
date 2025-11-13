import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  // 用户配置
  const userName = ref('访客')
  const githubUsername = ref('')
  const bilibiliUid = ref('')
  const city = ref('北京')
  
  // 主题设置
  const isDarkMode = ref(true)
  
  // 布局配置
  const layoutConfig = ref({
    welcome: { x: 0, y: 0, w: 4, h: 2 },
    github: { x: 4, y: 0, w: 4, h: 3 },
    bilibili: { x: 8, y: 0, w: 4, h: 3 },
    weather: { x: 0, y: 2, w: 4, h: 3 },
    todo: { x: 4, y: 3, w: 4, h: 4 },
    habits: { x: 8, y: 3, w: 4, h: 4 },
    music: { x: 0, y: 5, w: 6, h: 3 },
    system: { x: 6, y: 5, w: 6, h: 3 }
  })

  // 名言库
  const quotes = ref([
    "今天的努力，明天的成就",
    "生活不止眼前的苟且，还有诗和远方",
    "每一个不曾起舞的日子，都是对生命的辜负",
    "Stay hungry, stay foolish",
    "代码改变世界",
    "简单的事情重复做，重复的事情用心做"
  ])

  // 获取随机名言
  const randomQuote = computed(() => {
    return quotes.value[Math.floor(Math.random() * quotes.value.length)]
  })

  // 更新用户配置
  const updateUserConfig = (config) => {
    Object.assign(userName, config.userName || {})
    Object.assign(githubUsername, config.githubUsername || {})
    Object.assign(bilibiliUid, config.bilibiliUid || {})
    Object.assign(city, config.city || {})
  }

  // 切换主题
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }

  // 更新布局
  const updateLayout = (newLayout) => {
    layoutConfig.value = { ...layoutConfig.value, ...newLayout }
  }

  return {
    userName,
    githubUsername,
    bilibiliUid,
    city,
    isDarkMode,
    layoutConfig,
    randomQuote,
    updateUserConfig,
    toggleTheme,
    updateLayout
  }
}, {
  persist: true
})