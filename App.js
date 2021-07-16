import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import Router from './src/Router/Router';
import store from './src/Store/store';
import {Provider} from 'react-redux';
import {RootSiblingParent} from 'react-native-root-siblings';

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <RootSiblingParent>
          <Router />
        </RootSiblingParent>
      </Provider>
    );
  }
}
