import { createRouter, createWebHistory } from 'vue-router'

import * as Pages from '@/pages'

const routes = [
    { path: '/', component: Pages.HomePage, meta: { title: 'Home' } },
    { path: '/about', component: Pages.AboutPage, meta: { title: 'About' } }
]

export const router = createRouter({
    history: createWebHistory(), // createWebHashHistory(), // , // createMemoryHistory(),
    routes,
})
