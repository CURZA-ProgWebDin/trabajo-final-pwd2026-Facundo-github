<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const productos = ref([
    { id: 1, nombre: 'Tornillo de 1 pulgada', descripcion: 'Acero inoxidable x100 unidades', precio: 1500, stock: 50 },
    { id: 2, nombre: 'Arandela plana M6', descripcion: 'Zincada bolsa x50 unidades', precio: 450, stock: 120 },
    { id: 3, nombre: 'Tuerca autofrenante 1/4', descripcion: 'Caja x20 unidades', precio: 980, stock: 15 }
])

const handleLogout = () => {
    authStore.logout();
    router.push('/login');
};

const eliminarProducto = (id) => {
    alert(`Está por eliminar el producto con el ID: ${id}`);
};

</script>

<template>
    <div class="dashboard-container">
        <header class="dashboard-header">
            <div class="brand">
                <h1>Sistema de Gestión de Stock</h1>
            </div>
            <div class="user-info">
                <span>Bienvenido, <strong>{{ authStore.username }}</strong> (<span class="role-badge">{{ authStore.useRole }}</span>)</span>
                <button @click="handleLogout" class="btn-logout">Cerrar Sesión</button>
            </div>
        </header>

        <main class="dashboard-content">
            <div class="section-header">
                <h2>Panel de Productos</h2>
                <button v-if="authStore.useRole === 'admin'" class="btn-primary">+ Agregar Producto</button>
            </div>

            <div class="table-container">
                <table class="productos-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th v-if="authStore.useRole === 'admin'">Acciones</th>                                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prod in productos" :key="prod.id">
                            <td>{{ prod.id }}</td>
                            <td><strong>{{ prod.nombre }}</strong></td>
                            <td>{{ prod.descripcion }}</td>
                            <td>${{ prod.precio }}</td>
                            <td>
                                <span :class="['stock-badge', prod.stock < 20 ? 'stock-low' : 'stock-ok']">
                                    {{ prod.stock }} unidades {{ prod.stock < 20 ? '— ¡Bajo Stock!' : '' }}
                                </span>
                            </td>
                            <td v-if="authStore.useRole === 'admin'">
                                <div class="actions-gap">
                                    <button class="btn-action edit">Editar</button>
                                    <button @click="eliminarProducto(prod.id)" class="btn-action delete">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</template>

<style scoped>
.dashboard-container {
    padding: 30px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #333;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #e2e8f0;
    padding-bottom: 15px;
    margin-bottom: 30px;
}

.dashboard-header h1 {
    font-size: 24px;
    margin: 0;
    color: #2d3748;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 15px;
}

.role-badge { 
    background: #edf2f7;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 13px; 
}

.btn-logout {
    background-color: #e53e3e;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 6px;
    font-weight: 500;
    transition: 0.2s;
}

.btn-logout:hover {
    background-color: #c53030;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.section-header h2 { 
    margin: 0;
    color: #4a5568; 
}

.btn-primary { 
    background-color: #3182ce;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.2s; 
}

.btn-primary:hover {
    background-color: #2b6cb0;
}

.table-container {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    border: 1px solid #e2e8f0;
}

.productos-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}
.productos-table th { 
    background-color: #f7fafc;
    padding: 14px;
    color: #718096;
    font-weight: 600;
    border-bottom: 2px solid #e2e8f0;
}

.productos-table td { 
    padding: 14px;
    border-bottom: 1px solid #edf2f7;
    font-size: 15px;
}

.productos-table tr:hover { 
    background-color: #f8fafc;
}

.stock-badge { 
    padding: 4px 8px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
}

.stock-ok { 
    background-color: #c6f6d5;
    color: #22543d;
}

.stock-low { 
    background-color: #fed7d7;
    color: #742a2a;
}

.actions-gap { 
    display: flex;
    gap: 8px;
}

.btn-action { 
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: 0.2s;
}

.btn-action.edit { 
    background-color: #feebc8;
    color: #744210;
}

.btn-action.edit:hover { 
    background-color: #fbd38d;
}

.btn-action.delete { 
    background-color: #fed7d7;
    color: #742a2a;
}

.btn-action.delete:hover { 
    background-color: #feb2b2;
}

</style>