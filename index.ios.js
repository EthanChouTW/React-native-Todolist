/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';

import App from './app/components/App';
import {configureStore} from './app/store'
export default class todoListAuth extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <App></App>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('todoListAuth', () => todoListAuth);
