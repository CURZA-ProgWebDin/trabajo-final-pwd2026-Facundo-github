import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import LoginView from '../views/LoginView.vue';
import ProductosView from '../views/ProductosView.vue';

const routes = [
    {
    path: '/login',
    name: 'login',
    component: LoginView
    },
    {
    path: '/',
    name: 'productos',
    component: ProductosView,
    meta: { requiresAuth: true }
    }
];

const router = createRouter(
    {
    history: createWebHistory(),
    routes
});


router.beforeEach((to: any, _from: any, next: any) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
    } else if (to.name === 'login' && authStore.isAuthenticated) {
    next('/');
    } else {
    next();
}
});

export default router;