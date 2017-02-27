import update from 'react-addons-update';
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import authReducer from './authReducer';
import alertReducer from './alertReducer';
import todosReducer from './todosReducer';

var defaultState = {};

module.exports = combineReducers({
    form: formReducer,
    auth: authReducer,
    alerts: alertReducer,
    todos: todosReducer
});

