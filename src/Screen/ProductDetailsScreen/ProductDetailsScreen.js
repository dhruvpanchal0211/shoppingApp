import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './ProductDetailsScreenStyle';
import AppHeader from '../../Componant/AppHeader'

export default class ProductDetailsScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <AppHeader title="ProductDetailsScreen" />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('OrderScreen');
          }}>
          <Text> OrderScreen </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
