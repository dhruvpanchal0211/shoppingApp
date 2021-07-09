import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import Router from './src/Router/Router';
import store from './src/Store/store';
import {Provider} from 'react-redux';

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
