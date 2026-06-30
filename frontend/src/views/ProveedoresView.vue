<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const proveedores = ref([
    { id: 1, nombre: 'Distribuidora Metalúrgica S.A.', contacto: '11-4444-5555', localidad: 'Buenos Aires' },
    { id: 2, nombre: 'Bulones del Sur', contacto: '2920-123456', localidad: 'Viedma' },
    { id: 3, nombre: 'Gases & Soldaduras SRL', contacto: '341-987654', localidad: 'Rosario' }
]);

const nuevoProveedor = ref({ nombre: '', contacto: '', localidad: '' });

const agregarProveedor = () => {
    if (!nuevoProveedor.value.nombre) return alert('El nombre es obligatorio');
    const nuevoId = proveedores.value.length ? Math.max(...proveedores.value.map(p => p.id)) + 1 : 1;
    proveedores.value.push({
        id: nuevoId,
        nombre: nuevoProveedor.value.nombre,
        contacto: nuevoProveedor.value.contacto,
        localidad: nuevoProveedor.value.localidad
    });
    nuevoProveedor.value = { nombre: '', contacto: '', localidad: '' };
    alert('Proveedor agregado con éxito (Simulado)');
};

const eliminarProveedor = (id) => {
    // Simulamos control de conflictos (Parte 4)
    if (id === 1 || id === 2) {
        alert('Error 409 Conflict: Este proveedor no se puede borrar porque tiene productos activos en el catálogo de stock.');
    } else {
        proveedores.value = proveedores.value.filter(p => p.id !== id);
        alert(`Proveedor con ID ${id} eliminado con éxito.`);
    }
};
</script>

<template>
    <div class="dashboard-container">
        <header class="dashboard-header">
            <div class="brand">
                <h1>Gestión de Proveedores — Admin</h1>
            </div>
            <div class="user-info">
                <router-link to="/" class="btn-nav">📦 Volver a Productos</router-link>
                <span>Administrador: <strong>{{ authStore.username }}</strong></span>
            </div>
        </header>

        <main class="dashboard-content">
            <div class="form-card">
                <h3>Registrar Nuevo Proveedor</h3>
                <form @submit.prevent="agregarProveedor" class="inline-form">
                    <input v-model="nuevoProveedor.nombre" type="text" placeholder="Razón Social / Nombre" required class="input-field" />
                    <input v-model="nuevoProveedor.contacto" type="text" placeholder="Teléfono de contacto" class="input-field" />
                    <input v-model="nuevoProveedor.localidad" type="text" placeholder="Localidad" class="input-field" />
                    <button type="submit" class="btn-primary">Registrar</button>
                </form>
            </div>

            <div class="table-container">
                <table class="productos-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre / Razón Social</th>
                            <th>Contacto</th>
                            <th>Localidad</th>
                            <th>Acciones</th>                                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prov in proveedores" :key="prov.id">
                            <td>{{ prov.id }}</td>
                            <td><strong>{{ prov.nombre }}</strong></td>
                            <td>{{ prov.contacto }}</td>
                            <td>{{ prov.localidad }}</td>
                            <td>
                                <div class="actions-gap">
                                    <button class="btn-action edit">Editar</button>
                                    <button @click="eliminarProveedor(prov.id)" class="btn-action delete">Eliminar</button>
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
.btn-nav { 
    text-decoration: none; 
    color: #3182ce; 
    font-weight: bold; 
    padding: 6px 12px; 
    border-radius: 4px; 
    background: #ebf8ff; 
    transition: 0.2s; 
}
.btn-nav:hover { 
    background: #e0f2fe; 
}
.form-card { 
    background: white; 
    padding: 20px; 
    border-radius: 8px; 
    border: 1px solid #e2e8f0; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); 
    margin-bottom: 25px; 
}
.form-card h3 { 
    margin-top: 0; 
    margin-bottom: 15px; 
    color: #4a5568; 
}
.inline-form { 
    display: flex; 
    gap: 12px; 
}
.input-field { 
    flex: 1; 
    padding: 10px; 
    border: 1px solid #cbd5e0; 
    border-radius: 6px; 
    font-size: 14px; 
}
.btn-primary { 
    background-color: #3182ce; 
    color: white; border: none; 
    padding: 10px 20px; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold; 
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