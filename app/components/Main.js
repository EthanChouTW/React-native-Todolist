import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, NavigatorIOS} from 'react-native';

import {unAuthUser} from '../actions';

// onLogout: function(){
//         this.props.dispatch(unAuthUser)
//     },
//     <TouchableOpacity onPress={this.onLogout}>
//                     <Text>
//                         Logout
//                     </Text>
//                 </TouchableOpacity>

import TodoList from './TodoList';

var Main = React.createClass({
    render() {
        return (
            <NavigatorIOS 
                initialRoute={{
                    component: TodoList,
                    title: 'Todo List',
                    navigationBarHidden: true
                }}
                style={{flex: 1}}>
            
            </NavigatorIOS>
        )
    }
});
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF'
//     }
// });
module.exports = Main;