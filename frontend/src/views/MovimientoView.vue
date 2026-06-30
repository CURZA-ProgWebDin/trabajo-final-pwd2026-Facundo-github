<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

const productos = ref([
    { id: 1, nombre: 'Tornillo de 1 pulgada', stock: 50 },
    { id: 2, nombre: 'Arandela plana M6', stock: 120 },
    { id: 3, nombre: 'Tuerca autofrenante 1/4', stock: 15 }
]);

const movimientos = ref([
    { id: 101, usuario: 'admin', producto: 'Tornillo de 1 pulgada', tipo: 'entrada', cantidad: 20, motivo: 'Compra a proveedor', fecha: '2026-06-28' },
    { id: 102, usuario: 'operador1', producto: 'Tuerca autofrenante 1/4', tipo: 'salida', cantidad: 5, motivo: 'Despacho a taller', fecha: '2026-06-29' }
]);

const nuevoMovimiento = ref({
    producto_id: '',
    tipo: 'entrada',
    cantidad: 1,
    motivo: ''
});

const productoSeleccionado = computed(() => {
    return productos.value.find(p => p.id === Number(nuevoMovimiento.value.producto_id));
});

const superaStockDisponible = computed(() => {
    if (nuevoMovimiento.value.tipo === 'salida' && productoSeleccionado.value) {
        return nuevoMovimiento.value.cantidad > productoSeleccionado.value.stock;
    }
    return false;
});

const registrarMovimiento = () => {
    if (!nuevoMovimiento.value.producto_id) return alert('Por favor, seleccioná un producto.');
    
    if (superaStockDisponible.value) {
        alert(`❌ Error: No podés registrar la salida. El stock actual de ${productoSeleccionado.value.nombre} es de ${productoSeleccionado.value.stock} unidades.`);
        return;
    }

    const prod = productos.value.find(p => p.id === Number(nuevoMovimiento.value.producto_id));
    if (nuevoMovimiento.value.tipo === 'entrada') {
        prod.stock += nuevoMovimiento.value.cantidad;
    } else {
        prod.stock -= nuevoMovimiento.value.cantidad;
    }

    movimientos.value.unshift({
        id: movimientos.value.length + 103,
        usuario: authStore.username || 'usuario_actual',
        producto: prod.nombre,
        tipo: nuevoMovimiento.value.tipo,
        cantidad: nuevoMovimiento.value.cantidad,
        motivo: nuevoMovimiento.value.motivo,
        fecha: new Date().toISOString().split('T')[0]
    });

    alert('✅ Movimiento registrado con éxito. El stock del producto fue actualizado.');
    
    nuevoMovimiento.value = { producto_id: '', tipo: 'entrada', cantidad: 1, motivo: '' };
};

const movimientosFiltrados = computed(() => {
    if (authStore.useRole === 'admin') {
        return movimientos.value;
    }
    return movimientos.value.filter(m => m.usuario === authStore.username);
});
</script>

<template>
    <div class="dashboard-container">
        <header class="dashboard-header">
            <div class="brand">
                <h1>Movimientos de Stock</h1>
            </div>
            <div class="user-info">
                <router-link to="/" class="btn-nav">📦 Volver a Productos</router-link>
                <span>Usuario: <strong>{{ authStore.username }}</strong> (<span class="role-badge">{{ authStore.useRole }}</span>)</span>
            </div>
        </header>

        <main class="dashboard-content">
            <div class="form-card">
                <h3>Registrar Entrada o Salida de Mercadería</h3>
                <form @submit.prevent="registrarMovimiento" class="movimiento-form">
                    <div class="form-group">
                        <label>Producto:</label>
                        <select v-model="nuevoMovimiento.producto_id" required class="input-field">
                            <option value="" disabled>Seleccione un artículo...</option>
                            <option v-for="p in productos" :key="p.id" :value="p.id">
                                {{ p.nombre }} (Stock actual: {{ p.stock }})
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Tipo de Movimiento:</label>
                        <select v-model="nuevoMovimiento.tipo" class="input-field">
                            <option value="entrada">📈 Entrada (+)</option>
                            <option value="salida">📉 Salida (-)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Cantidad:</label>
                        <input v-model.number="nuevoMovimiento.cantidad" type="number" min="1" required class="input-field" />
                    </div>

                    <div class="form-group">
                        <label>Motivo / Observaciones:</label>
                        <input v-model="nuevoMovimiento.motivo" type="text" placeholder="Ej: Ajuste de inventario, rotura..." required class="input-field" />
                    </div>

                    <button type="submit" class="btn-primary" :disabled="superaStockDisponible">
                        Registrar Movimiento
                    </button>
                </form>

                <div v-if="superaStockDisponible" class="alert-warning-box">
                    ⚠️ <strong>Atención:</strong> La cantidad ingresada supera las <strong>{{ productoSeleccionado?.stock }} unidades</strong> disponibles en stock.
                </div>
            </div>

            <div class="table-container">
                <div class="table-title">
                    <h3>{{ authStore.userRole === 'admin' ? '📋 Todos los Movimientos (Historial Global)' : '👤 Mis Movimientos' }}</h3>
                </div>
                <table class="productos-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Producto</th>
                            <th>Tipo</th>
                            <th>Cantidad</th>
                            <th>Motivo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="mov in movimientosFiltrados" :key="mov.id">
                            <td>#{{ mov.id }}</td>
                            <td>{{ mov.fecha }}</td>
                            <td><span class="user-badge">{{ mov.usuario }}</span></td>
                            <td><strong>{{ mov.producto }}</strong></td>
                            <td>
                                <span :class="['type-badge', mov.tipo === 'entrada' ? 'bg-entrada' : 'bg-salida']">
                                    {{ mov.tipo === 'entrada' ? 'Entrada' : 'Salida' }}
                                </span>
                            </td>
                            <td><strong>{{ mov.cantidad }} un.</strong></td>
                            <td><span class="motivo-text">{{ mov.motivo }}</span></td>
                        </tr>
                        <tr v-if="movimientosFiltrados.length === 0">
                            <td colspan="7" style="text-align: center; color: #a0aec0; padding: 20px;">No registrás movimientos en este turno.</td>
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
    padding: 25px; 
    border-radius: 8px; 
    border: 1px solid #e2e8f0; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); 
    margin-bottom: 30px; 
}
.form-card h3 { 
    margin-top: 0; 
    margin-bottom: 20px; 
    color: #4a5568; 
    border-bottom: 1px solid #edf2f7; 
    padding-bottom: 10px; 
}
.movimiento-form { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
    gap: 15px; 
    align-items: flex-end; 
}
.form-group { 
    display: flex; 
    flex-direction: column; 
    gap: 5px; font-size: 14px; 
    font-weight: 500; 
    color: #4a5568; 
}
.input-field { 
    padding: 10px; 
    border: 1px solid #cbd5e0; 
    border-radius: 6px; font-size: 14px; 
    background: white; 
}

.btn-primary { 
    background-color: #3182ce; 
    color: white; 
    border: none; 
    padding: 11px 20px; 
    border-radius: 6px; 
    cursor: pointer; 
    font-weight: bold; 
    transition: 0.2s; 
}
.btn-primary:hover:not(:disabled) { 
    background-color: #2b6cb0; 
}
.btn-primary:disabled { 
    background-color: #cbd5e0; 
    cursor: not-allowed; 
}

.alert-warning-box { 
    background-color: #fffaf0; 
    border-left: 4px solid #dd6b20; 
    color: #dd6b20; 
    padding: 12px; 
    border-radius: 4px; 
    margin-top: 15px; 
    font-size: 14px; 
}

.table-container { 
    background: white; 
    border-radius: 8px; 
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
    overflow: hidden; 
    border: 1px solid #e2e8f0; 
}
.table-title { 
    padding: 15px 20px; 
    border-bottom: 1px solid #edf2f7; 
    background: #fcfcfc; 
}
.table-title h3 { 
    margin: 0; 
    font-size: 16px; 
    color: #4a5568; 
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
    font-size: 14px; 
}
.productos-table td { 
    padding: 14px; 
    border-bottom: 1px solid #edf2f7; 
    font-size: 14px; 
}

.user-badge { 
    background: #e2e8f0; 
    padding: 2px 6px; 
    border-radius: 4px; 
    font-size: 12px; 
    font-weight: 600; 
}
.type-badge { 
    padding: 4px 8px; 
    border-radius: 4px; 
    font-size: 12px; 
    font-weight: bold; 
    color: white; }
.bg-entrada { 
    background-color: #48bb78; 
}
.bg-salida { 
    background-color: #f56565; 
}
.motivo-text { 
    color: #718096; 
    font-style: italic; 
}

</style>