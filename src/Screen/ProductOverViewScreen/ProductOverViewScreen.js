import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './ProductOverViewScreenStyle';
import AppHeader from '../../Componant/AppHeader';

export default class ProductOverViewScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <AppHeader title="ProductOverViewScreen" />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ProductDetailsScreen');
          }}>
          <Text> ProductDetailsScreen </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
