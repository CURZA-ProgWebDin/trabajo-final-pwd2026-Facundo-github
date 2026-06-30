import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import LoginView from '../views/LoginView.vue';
import ProductosView from '../views/ProductosView.vue';
import UnauthorizedView from '../views/UnauthorizedView.vue';

const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: UnauthorizedView    
    },
    {
        path: '/',
        name: 'productos',
        component: ProductosView,
        meta: { requiresAuth: true }
    },
    {
        path: '/categorias',
        name: 'categorias',
        component: () => import('../views/CategoriasView.vue'),
        meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
        path: '/proveedores',
        name: 'proveedores',
        component: () => import('../views/ProveedoresView.vue'),
        meta: { requiresAuth: true, roles: ['admin'] }
    },
    {
        path: '/movimientos',
        name: 'movimientos',
        component: () => import('../views/MovimientosView.vue'),
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to: any, _from: any, next: any) => {
    const authStore = useAuthStore();
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login');
    }
    if (to.name === 'login' && authStore.isAuthenticated) {
        return next('/');
    }
    if (to.meta.roles && !to.meta.roles.includes(authStore.userRole)){
        return next('/unauthorized');
    }
    next();
});

export default router;