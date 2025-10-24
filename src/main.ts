import { createApp } from 'vue'

import './style.css'

import App from './App.vue'
import { router } from './routes'

import * as UI from '@/components';

const app = createApp(App)

Object.values(UI).forEach((component) => {
  app.component((component as any).__name.split('.')[0], component);
});


app.use(router)

app.mount('#app')
