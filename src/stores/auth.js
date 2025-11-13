import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)

  // 模拟用户数据
  const mockUsers = [
    { username: 'admin', password: '123456', name: '管理员', avatar: '👨‍💼' },
    { username: 'user', password: '123456', name: '普通用户', avatar: '👤' }
  ]

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.username === username && u.password === password)
        if (foundUser) {
          user.value = { ...foundUser }
          isAuthenticated.value = true
          resolve(foundUser)
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 1000)
    })
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }

  const checkAuth = () => {
    // 检查本地存储中是否有用户信息
    const storedUser = localStorage.getItem('mylife-auth')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
      } catch (error) {
        console.error('解析用户信息失败:', error)
        logout()
      }
    }
  }

  // 监听用户状态变化，自动保存到本地存储
  const saveUserToStorage = () => {
    if (user.value) {
      localStorage.setItem('mylife-auth', JSON.stringify(user.value))
    } else {
      localStorage.removeItem('mylife-auth')
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    saveUserToStorage
  }
}, {
  persist: {
    key: 'auth',
    storage: localStorage,
    paths: ['user', 'isAuthenticated']
  }
})