import axios from 'axios';
const fakeUrl = 'http://1206501-cm15232.tw1.ru'
export const ClientApi = {
    getClientsData() {
        return axios.get(`${fakeUrl}/api/clients-data-driver`).then(res => res.data)
    },
    getClientData(id:number) {
        return axios.get(`${fakeUrl}/api/client-data-driver/${id}`).then(res => res.data)
    },
    getClientRoute(id:number) {
        return axios.get(`${fakeUrl}/api/client-route-driver/${id}`).then(res => res.data)
    },
    startTrip(id:number) {
        return axios.get(`${fakeUrl}/api/start-trip/${id}`).then(res => res.data)
    },
    doneTrip(id:number) {
        return axios.get(`${fakeUrl}/api/done-trip/${id}`).then(res => res.data)
    },
}