import ApiService from './api';

export const authService = {
    async login(credentials: any) {
        const response = await ApiService.post('/auth/login', credentials);
        return response.data;
    },
    async getMe() {
        const response = await ApiService.get('/auth/me');
        return response.data;
    }
}