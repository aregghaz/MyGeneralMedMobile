export interface IClient {
    id: string;
    name: string;
    surname: string;
    appointment_time: string;
    origin_name: string;
    destination_name: string;
    destination_street: string;
    destination_suite: string;
    destination_postal: string;
    destination_city: string;
    origin_street: string;
    origin_suite: string;
    origin_postal: string;
    origin_city: string;
    pick_up: string;
    trip_id: string;
    origin_comment: string;
    destination_comment: string;
    member_uniqie_identifer: string
    los: string;
    height: string;
    weight: string;
    gender: {
        label:string
    }
    request_type: {
        label:string
    };

}