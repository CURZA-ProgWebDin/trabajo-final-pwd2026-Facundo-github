<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const username = ref('');
const password = ref('');

const handleLogin = async () => {
    if (!username.value || !password.value) return;

    const success = await authStore.login(username.value, password.value);
    if (success) {
        alert(`¡Login exitoso! Bienvenido/a. Tu rol es: ${authStore.userRole}`);
    }
}

</script>
<template>
<div class="login-container">
    <div class="login-card">
        <h2>Gestión de Stock</h2>
        <p class="subtitle">Iniciar sesión para continuar</p>

        <form @submit.prevent="handleLogin">
            <div class="form-group">
                <label for="username">Usuario</label>
                <input type="text" id="username" v-model="username" placeholder="Ej: admin" required :disabled="authStore.loading" />
            </div>

            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" v-model="password" placeholder="••••••••" required :disabled="authStore.loading" />
            </div>

            <div v-if="authStore.errorMsg" class="error-message">
                {{ authStore.errorMsg }}
            </div>

            <button type="submit" :disabled="authStore.loading">
                {{ authStore.loading ? 'Ingresando ...' : 'Iniciar Sesión' }}
            </button>
        </form>
    </div>
</div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    font-family: sans-serif;
}

.login-card {
    background: #ffffff;
    padding: 2.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
}

h2 {
    margin-bottom: 0.5rem;
    color: #333;
}

.subtitle {
    color: #666;
    margin-bottom: 2rem;
    font-size: 0.9rem;
}

.form-group {
    text-align: left;
    margin-bottom: 1.5rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    color: #444;
    font-weight: 600;
    font-size: 0.9rem;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1rem;
}

input:focus {
    border-color: #4f46e5;
    outline: none;
}

button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}

button:hover {
    background-color: #4338ca;
}

button:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
}

.error-message {
    background-color: #fee2e2;
    color: #dc2626;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    text-align: left;
    border-left: 4px solid #dc2626;
}

</style>