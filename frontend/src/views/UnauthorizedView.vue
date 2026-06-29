<script setup>

</script>

<template>
    <div class="unauthorized-container">
        <div class="error-card">
            <div class="icon">🚫</div>
            <h2>Acceso Denegado</h2>
            <p>No tenés los permisos necesarios (rol de Administrador) para acceder</p>
            <router-link to="/" class="btn-back">Volver al Panel</router-link>
        </div>
    </div>
</template>

<style scoped>
.unauthorized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    font-family: sans-serif;
}

.error-card {
    text-align: center;
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0.0.0.0.1);
    max-width: 400px;
}

.icon {
    font-size: 50px;
    margin-bottom: 15px;
}

h2 {
    color: #e53e3e;
    margin-bottom: 10px;
}

p {
    color: #718096;
    margin-bottom: 25px;
    line-height: 1.5;
}

.btn-back {
    display: inline-block;
    background-color: #3182ce;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: bold;
}

.btn-back:hover {
    background-color: #2b6cb0;
}

</style>