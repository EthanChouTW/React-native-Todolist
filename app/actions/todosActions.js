import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {TODOS_URL, TODO_URL} from '../api';
import {addAlert} from './alertActions';

exports.createTodo = (text) => {
    return function(dispatch) {
        return Keychain.getGenericPassword().then((credentials) => {
            var {username, password} = credentials;
            console.log(username,password, "\n", text);

            return axios.post(TODOS_URL(username), {text:text}, {
                headers: {authorization: password }
                
            }).then((response) => {
                console.log("success");
                dispatch(addTodo(response.data.todo));   
            }).catch((err) => {
                console.log("failllllll");
                dispatch(addAlert("couldn't create todo", err));
            })
        })
    }
}

exports.deleteTodo = (todo_id) => {
    return function(dispatch) {
        return Keychain.getGenericPassword().then((credentials) => {
            var {username, password} = credentials;
            console.log(username,password, "\n", todo_id);

            return axios.delete(TODO_URL(username, todo_id), {
                headers: {authorization: password }
                
            }).then((response) => {
                console.log("success", response);
                dispatch(removeTodo(todo_id)) 
            }).catch((err) => {
                console.log("failllllll");
                dispatch(addAlert("couldn't delete todo", err));
            })
        })
    }
}

exports.getTodos = function(dispatch) {
        return Keychain.getGenericPassword().then((credentials) => {
            var {username, password} = credentials;

            return axios.get(TODOS_URL(username), {
                headers: {authorization: password }
                
            }).then((response) => {
                console.log("success", response.data.todos);
                dispatch(setTodo(response.data.todos));   
            }).catch((err) => {
                console.log("failllllll", err);
                dispatch(addAlert("couldn't get todos", err));
            })
        }) 
}

var addTodo = (newTodo) => {
    return {
        type: 'ADD_TODO',
        newTodo
    }
}

var setTodo = (todos) => {
    return {
        type: 'SET_TODOS',
        todos
    }
}

var removeTodo = (todo_id) => {
    return {
        type: 'REMOVE_TODO',
        todo_id
    }
}