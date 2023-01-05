import {UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    let stateAll=state.map(el=>el)

    switch (action.type) {
        case 'sort': { // by name
            if(action.payload==='up')
            state=stateAll.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            else
                state=stateAll.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1);
            return state // need to fix
        }
        case 'check': {
            state=stateAll.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
            state=state.filter(p=>p.age>18)
            return state // need to fix
        }
        default:
            return state
    }
}
