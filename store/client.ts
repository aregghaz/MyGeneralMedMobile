
const defaultDat ={
    id: 0,
    trip_id: 0,
    fullName: '',
    gender: "",
    pick_up_address: "",
    los: "",
    phone_number: "",
    date_of_service: "",
    appointment_time: "",
    pick_up: "",
    drop_down: "",
    request_type: 0,
    status: 0,
    origin: "",
    origin_id: "",
    origin_phone: "",
    origin_comment: '',
    destination: '',
    destination_id: '',
    destination_phone: '',
    destination_comment: '',
    height: 0,
    weight: 0,
    escortType: 0,
    type_of_trip: 0,
    miles: 0,
    member_uniqie_identifer: 0,
    birthday: 0,
    additionalNote: '',
    operator_note: ''
}

const initialstate = {
    clientById: typeof defaultDat
}
type Action = {
    type: string,
    payload?: any
}

const clientReducer = (state: any = initialstate, action: Action) => {

    switch (action.type) {
        case 'FETCHING_CLIENT_DATA':
            return {
                ...state,
                clientById: action.payload.clientById,
            }

        case 'RESET_HOME_PAGE_STATE':
            return {
                ...state,
                clientById:defaultDat,

            }
        default:
            return state
    }

}


export const clientAction = {
    fetching: (data: typeof initialstate) => ({type: 'FETCHING_CLIENT_DATA', payload: data} as const),
    resetState: () => ({type: 'RESET_HOME_PAGE_STATE'} as const)
}


export default clientReducer
