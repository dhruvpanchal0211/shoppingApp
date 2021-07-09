import React, {PureComponent} from 'react';
import {Text, View, Image} from 'react-native';
import {styles} from './ProductDetailsScreenStyle';
import AppHeader from '../../Componant/AppHeader';
import Cards from '../../Componant/Card';

export default class ProductDetailsScreen extends PureComponent {
  render() {
    const {itemData} = this.props.route.params;
    return (
      <View style={styles.container}>
        <AppHeader title="ProductDetailsScreen" isBack isCart />
        <Cards>
          <Image
            source={{uri: itemData.item.imageURL}}
            style={{height: 50, width: 50}}
          />
          <Text>{itemData.item.id}</Text>
        </Cards>
      </View>
    );
  }
}
