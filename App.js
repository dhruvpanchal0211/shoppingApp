/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {Text, View, Image} from 'react-native';
import Router from './src/Router/Router';
import store from './src/Store/store';
import {Provider} from 'react-redux';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Images, Storage} from './src/Helper';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    await Storage.getUserData();
    setTimeout(async () => {
      await this.setState({loading: false});
    }, 1000);
  }
  render() {
    const {loading} = this.state;
    return (
      <View style={{flex: 1}}>
        {!loading ? (
          <Provider store={store}>
            <RootSiblingParent>
              <Router isLogin={global.isLogin} />
            </RootSiblingParent>
          </Provider>
        ) : (
          <View>
            <Image source={Images.menu} />
          </View>
        )}
      </View>
    );
  }
}
