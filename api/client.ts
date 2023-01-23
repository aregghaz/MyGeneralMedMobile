import axios from 'axios';
const fakeUrl = 'http://1206501-cm15232.tw1.ru'
export const ClientApi = {
    getClientsData() {
        return axios.get(`${fakeUrl}/api/client-data-driver`).then(res => res.data)
    },
}