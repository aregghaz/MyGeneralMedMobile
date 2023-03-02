import {createStore, applyMiddleware, Action} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk, {ThunkAction} from 'redux-thunk'
import reducers, {ReducerType} from './reducers'


export type AppStateType = ReturnType<ReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// TODO: Save State after change Mode themes

export const loadState = (state: AppStateType) => {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e:any) {
        throw new Error(e)
    }
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => loadState(store.getState()))

export default store
