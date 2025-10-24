import { createRouter, createWebHistory } from 'vue-router'

import * as Pages from '@/pages'
import * as Domains from '@/domains'

const routes = [
    { path: '/', component: Pages.HomePage, meta: { title: 'Home' } },
    { path: '/about', component: Pages.AboutPage, meta: { title: 'About' } },
    { path: '/notifications', component: Pages.NotificationsPage, meta: { title: 'Notifications' } },
    { name:'Products', path: '/products', component: Domains.Product, meta: { title: 'Products' } }
]

export const router = createRouter({
    history: createWebHistory(), 
    routes
})
