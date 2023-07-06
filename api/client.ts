import axios from 'axios';
import {fakeUrl} from "./fakeUrl";
// ///const fakeUrl = 'http://1206501-cm15232.tw1.ru'
// const fakeUrl = 'http://127.0.0.1:8000'

export const ClientApi = {
    getClientsData(query:any) {
        return axios.post(`${fakeUrl}/api/clients-data-driver`, query).then(res => res.data)
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
    getDriverData() {
        return axios.get(`${fakeUrl}/api/get-driver-data`).then(res => res.data)
    },
}