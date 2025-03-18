import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入初始化样式
import '@/assets/styles/base.css'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
