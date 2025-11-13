import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const Login = () => import('@/views/Login.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const LOLTracker = () => import('@/views/LOLTracker.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/lol-tracker',
      name: 'LOLTracker',
      component: LOLTracker,
      meta: { requiresAuth: true }
    }
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // 检查认证状态
  const isAuthenticated = authStore.checkAuth()
  
  // 处理根路径重定向
  if (to.path === '/') {
    next('/login')
    return
  }
  
  // 如果需要认证但未登录，重定向到登录页
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
    return
  }
  
  // 如果已登录但访问登录页，重定向到仪表盘
  if (to.path === '/login' && isAuthenticated) {
    next('/dashboard')
    return
  }
  
  // 其他情况允许访问
  next()
})

export default router
