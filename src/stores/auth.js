import { defineStore } from 'pinia'
import { ref } from 'vue'

// 认证存储键名
const AUTH_STORAGE_KEY = 'mylife-auth-token'

export const useAuthStore = defineStore('auth', () => {
  // 使用简单的token认证，而不是完整的用户对象
  const authToken = ref(null)
  const isAuthenticated = ref(false)

  // 模拟用户数据 - 使用中文用户名
  const mockUsers = [
    { username: '豆腐干', password: '123456', name: '豆腐干', avatar: '👨‍💼' },
    { username: 'lol大王', password: '123456', name: 'lol大王', avatar: '👤' },
    { username: '比奇堡饿霸', password: '123456', name: '比奇堡饿霸', avatar: '👤' }
  ]

  // 登录方法
  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.username === username && u.password === password)
        if (foundUser) {
          // 生成简单的token（用户名+时间戳）- 使用UTF-8安全编码
          const tokenData = `${username}:${Date.now()}`
          const token = btoa(encodeURIComponent(tokenData))
          authToken.value = token
          isAuthenticated.value = true
          
          // 保存token到本地存储
          localStorage.setItem(AUTH_STORAGE_KEY, token)
          
          resolve({ username: foundUser.username, name: foundUser.name, avatar: foundUser.avatar })
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 1000)
    })
  }

  // 退出登录方法
  const logout = () => {
    authToken.value = null
    isAuthenticated.value = false
    // 清除本地存储
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  // 检查认证状态
  const checkAuth = () => {
    const token = localStorage.getItem(AUTH_STORAGE_KEY)
    if (token) {
      try {
        // 验证token格式（使用UTF-8安全解码）
        const decoded = decodeURIComponent(atob(token))
        if (decoded.includes(':')) {
          authToken.value = token
          isAuthenticated.value = true
          return true
        }
      } catch (error) {
        console.error('Token验证失败:', error)
        logout()
      }
    }
    return false
  }

  // 获取当前用户信息（简化的）
  const getCurrentUser = () => {
    if (!authToken.value) return null
    
    try {
      // 使用UTF-8安全解码
      const decoded = decodeURIComponent(atob(authToken.value))
      const [username] = decoded.split(':')
      const foundUser = mockUsers.find(u => u.username === username)
      return foundUser ? { username: foundUser.username, name: foundUser.name, avatar: foundUser.avatar } : null
    } catch {
      return null
    }
  }

  return {
    authToken,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    getCurrentUser
  }
})