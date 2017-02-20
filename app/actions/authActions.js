import axios from 'axios';
import Keychain from 'react-native-keychain';

import {SIGNIN_URL, SIGNUP_URL} from '../api';

import {addAlert} from './alertActions';

exports.loginUser = (email, password) => {
    return function(dispatch) {
        return axios.post(SIGNIN_URL, {email, password}).then((response) => {
            var {user_id, token } = response.data;
            dispatch(addAlert(token));
            dispatch(authUser(user_id));
            Keychain
                .setGenericPassword(user_id, token)
                .then(function() {
                console.log('Credentials saved successfully!');
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
            dispatch(addAlert(token));
            dispatch(authUser(user_id));
            Keychain
                .setGenericPassword(user_id, token)
                .then(function() {
                console.log('Credentials saved successfully!');
            }).catch((error) => {
            dispatch(addAlert('ssssss'));
        });
        }).catch((error) => {
            dispatch(addAlert('eee'));
        })
    }
}


authUser = (user_id) => {
    return {type: 'AUTH_USER', user_id}
}

exports.unAuthUser = {
    type: 'UNAUTH_USER'
}