import axios from 'axios';
const fakeUrl = 'http://127.0.0.1:8000'
export const ClientApi = {
    getClientsData() {
        return axios.get(`${fakeUrl}/api/client-data-driver`).then(res => res.data)
    },
}