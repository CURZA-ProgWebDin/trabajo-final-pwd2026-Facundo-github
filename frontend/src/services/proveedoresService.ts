
import ApiService from "./api";


export interface Proveedor {
    id?: number;
    nombre: string;
    contacto: string;
    localidad: string;
}

export const proveedoresService = {
    getAll() {
        return ApiService.get('/proveedores');
    },

    create(proveedor: Proveedor) {
        return ApiService.post('/proveedores', proveedor);
    },
    update(id:number, proveedor: Proveedor) {
        return ApiService.put(`/proveedores/${id}`, proveedor);
    },
    delete(id: number) {
        return ApiService.delete(`/proveedores/${id}`);
    }
};