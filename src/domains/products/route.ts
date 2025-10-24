import { useRouter } from 'vue-router';

const routes = [
    {
        path: 'list',
        component: () => import('./features/ProductList.vue')
    }, {
        path: ':id',
        component: () => import('./features/ProductDetail.vue')
    }, {
        path: ':id/edit',
        component: () => import('./features/ProductEdit.vue')
    }
]

export const useDomainRoutes = () => {
    const router = useRouter()
    
    console.log('Ready', router.getRoutes());
    console.log('Router is ready, registering product routes...');
    routes.forEach(route => router.addRoute('Products', route));
    router.replace({ path: '/products/list' });
    console.log('Product routes registered', router.getRoutes());

}



