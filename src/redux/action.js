import * as actionTypes from "./actionTypes";

export function gir(user) {
    return {
        type : actionTypes.SET_USER , 
        payload : user ,
    }
}
