import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index.js'
import App from './App.vue'

// import { ElIcon, ElInput } from 'element-plus'
import ElementPlus from 'element-plus'

import 'normalize.css' //reset.css
import '@/assets/common.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/permission' // permission control

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router).use(ElementPlus).use(createPinia()).mount('#app')
