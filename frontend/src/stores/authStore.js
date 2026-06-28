import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '../services/authService';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null);
    
    const savedUser = localStorage.getItem('user');
    const user = ref(savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null);
    
    const loading = ref(false);    
    const errorMsg = ref(null);
    
    const isAuthenticated = computed(() => !!token.value);
    const userRole = computed(() => user.value?.rol || null); 

    async function login(username, password) {
        loading.value = true;
        errorMsg.value = null;
        try {
            const data = await authService.login({ username, password });
            token.value = data.token;
            localStorage.setItem('token', data.token);

            const userData = await authService.getMe();
            user.value = userData; 
            localStorage.setItem('user', JSON.stringify(userData));
            
            return true;
        } catch (err) {
            console.error('Error en Login:', err);
            errorMsg.value = err.response?.data?.mensaje || 'Credenciales Inválidas';
            return false;
        } finally {
            loading.value = false;
        }
    }

    function logout() {
        token.value = null;
        user.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }

    return {
        token,
        user,
        loading,
        errorMsg,
        isAuthenticated,
        userRole,
        login,
        logout
    };
});