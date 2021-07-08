import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './OrderScreenStyle';
import AppHeader from '../../Componant/AppHeader'


export default class OrderScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <AppHeader title="OrderScreen" />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('CartScreen');
          }}>
          <Text>CartScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
