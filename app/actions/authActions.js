import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {SIGNIN_URL, SIGNUP_URL} from '../api';

import {addAlert} from './alertActions';

exports.loginUser = (email, password) => {
    return function(dispatch) {
        return axios.post(SIGNIN_URL, {email, password}).then((response) => {
            var {user_id, token } = response.data;
            
            Keychain
                .setGenericPassword(user_id, token)
                .then(function() {
                // dispatch(addAlert(token));
                dispatch(authUser(user_id));
                console.log('Credentials saved successfully!', token);
            }).catch((error) => {
            dispatch(addAlert('sssssseeeessss'));
        });          
        }).catch((error) => {
            dispatch(addAlert('eee'));
        });
    }
}

exports.signupUser = (email, password) => {
    return function(dispatch) {
        return axios.post(SIGNUP_URL, {email, password}).then((response) => {
            var {user_id, token } = response.data;
            console.log(user_id);
            console.log(token);
            console.log(Keychain);
            Keychain
                .setGenericPassword(user_id, token)
                .then(function() {
                dispatch(addAlert(token));
                dispatch(authUser(user_id));
                console.log('Credentials saved successfully!', token);
            }).catch((error) => {
            dispatch(addAlert('fail', error));
        });
        }).catch((error) => {
            dispatch(addAlert('fail no', error));
            console.log('failed' , error);
        })
    }
}


authUser = (user_id) => {
    return {type: 'AUTH_USER', user_id}
}

exports.unAuthUser = {
    type: 'UNAUTH_USER'
}