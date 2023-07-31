import { createApp } from 'vue'
import router from './router'
import naive from 'naive-ui'
import './styles/global.css'
import App from './App.vue'

createApp(App)
    .use(router)
    .use(naive)
    .mount('#app')
