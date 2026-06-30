import ApiService from './api';

export interface Categoria {
    id?: number;
    nombre: string;
    descripcion: string;
}

export const categoriasService = {
    getAll() {
        return ApiService.get('/categorias');
    },
    create(categoria: Categoria) {
        return ApiService.post('/categorias', categoria);
    },
    update(id: number, categoria: Categoria) {
        return ApiService.put(`/categorias/${id}`, categoria);
    },
    delete(id: number) {
        return ApiService.delete(`/categorias/${id}`);
    }

};