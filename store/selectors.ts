import {AppStateType} from './store'

export const getClientData = (state:AppStateType)=>({
    clientById:state.clientReducer.clientById,
})





