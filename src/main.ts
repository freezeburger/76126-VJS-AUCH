import { createApp } from 'vue'

import './style.css'

import App from './App.vue'
import { router } from './routes'
import { auchanLibrary } from './components/ui.plugin'
import { createPinia } from 'pinia'

const pinia = createPinia();
const app = createApp(App);

app.use(auchanLibrary)
app.use(pinia)
app.use(router)

app.mount('#app')
