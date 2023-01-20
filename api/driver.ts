import axios from 'axios';

export const DriverApi = {
    getClientsData() {
        return axios.get('/api/client-data-driver').then(res => res.data)
    },
}