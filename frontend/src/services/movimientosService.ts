
import ApiService  from "./api";

export interface Movimiento {
    id?: number;
    producto_id: number;
    tipo: 'entrada' | 'salida';
    cantidad: number;
    motivo: string;
    usuario?: string;
    fecha?: string;
}

export const movimientosService = {
    getAll() {
        return ApiService.get('/movimientos')
    },
    create(movimiento: Movimiento) {
        return ApiService.post('/movimientos', movimiento);
    }
};