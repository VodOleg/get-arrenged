import * as firebase from 'firebase';
import {DB_CONFIG} from './Config/config';

firebase.initializeApp(DB_CONFIG);

export const database = firebase.database();
export const auth = firebase.auth();