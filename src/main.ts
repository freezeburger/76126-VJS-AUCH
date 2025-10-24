import { createApp } from 'vue'

import './style.css'

import App from './App.vue'
import { router } from './routes'
import { auchanLibrary } from './components/ui.plugin'



const app = createApp(App)

app.use(auchanLibrary)
app.use(router)

app.mount('#app')
