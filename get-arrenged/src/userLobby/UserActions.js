import {auth} from '../Firebase';

export const GET_USER = 'get_user';
export function getUser() {
    return dispatch => {
      auth.onAuthStateChanged(user => {
        dispatch({
          type: GET_USER,
          payload: user
        });
      });
    };
  }

export function login(email, password){
    return dispatch =>auth.signInWithEmailAndPassword(email,password).then((user)=>console.log(user));
}