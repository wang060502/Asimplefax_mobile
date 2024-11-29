import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'  // 引入 Vant 样式

const app = createApp(App)

// 使用 Pinia、Router 和 Vant
app.use(createPinia())
app.use(router)
app.use(Vant)  // 使用 Vant

app.mount('#app')
