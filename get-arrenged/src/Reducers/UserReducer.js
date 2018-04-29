import {GET_USER} from '../userLobby/UserActions';

export default function(state ={ loading : true }, action){
    switch (action.type){
        case GET_USER:
            return {...state, user: action.payload };
        default:
            return state;
    }
}