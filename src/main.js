import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

// 配置持久化存储
pinia.use(createPersistedState({
  storage: localStorage,
  key: id => `mylife-${id}`
}))

app.use(pinia)
app.use(router)
app.use(naive)

app.mount('#app')
