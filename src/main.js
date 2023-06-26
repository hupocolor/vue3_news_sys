// import './assets/main.css'
import './assets/css/main.css'
import './assets/css/admin.css'
import './assets/css/read.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import store from './stores'
// import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
