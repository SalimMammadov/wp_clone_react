import * as actionTypes from '../actionTypes'

export default function reducer (state=null,action) {

    switch (action.type) {
        case actionTypes.SET_USER:
            console.log(action)
             return {
                 ...state,
                 user : action.payload
             }
        default:
            return state;
    }
    
}
