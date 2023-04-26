export interface IClient {
    trip_id: number,
    fullName: string,
    gender: string,
    pick_up: string,
    drop_down: string,
    address: string,
    los: string,
    date_of_service: string,
    request_type: number,
    status: number,
    miles: number,
    member_uniqie_identifer: number,
    birthday: number
    weight: number,
    height: number,
    id:number

}

export const IClientData = {
    id: 0,
    trip_id: 0,
    fullName: '',
    gender: "",
    address: [],
    date_of_service: "",
    pick_up: "",
    drop_down: "",
    appointment_time: "",
    request_type: 0,
    status: 0,
    height: 0,
    weight: 0,
    type_of_trip: 0,
    miles: 0,
    member_uniqie_identifer: 0,
    birthday: 0,
    additionalNote: '', stops: 0


}