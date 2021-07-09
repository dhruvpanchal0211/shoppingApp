import React, {PureComponent} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {styles} from './ProductOverViewScreenStyle';
import AppHeader from '../../Componant/AppHeader';
import {connect} from 'react-redux';
import Card from '../../Componant/Card';
import * as cartAction from '../../Store/actions/cart';
import {bindActionCreators} from 'redux';

class ProductOverViewScreen extends PureComponent {
  renderItem = itemData => {
    const {AddToCart} = this.props;
    return (
      <ScrollView>
        <View>
          <Card style={styles.cardView}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('ProductDetailsScreen', {
                  itemData,
                });
              }}>
              <Image
                source={{uri: itemData.item.imageURL}}
                style={styles.image}
              />
              <Text style={styles.text}>{itemData.item.title}</Text>
              <Text style={styles.text}>{itemData.item.price}</Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  onPress={() => {
                    AddToCart;
                  }}>
                  <View style={styles.cartButton}>
                    <Text>Add To Cart</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    );
  };
  render() {
    const {products} = this.props;
    return (
      <View style={styles.container}>
        <AppHeader title="ProductOverViewScreen" isMenu isCart />
        <FlatList
          data={products}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
          contentContainerStyle={{paddingVertical: 20}}
        />
        {/* <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ProductDetailsScreen');
          }}>
          <Text> ProductDetailsScreen </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('store data:', state.products.availableProducts);
  return {
    products: state.products.availableProducts,
  };
};

const mapDispatchToProps = dispatch => {
  console.log('hello', cartAction.addToCart());
  return {
    AddToCart: bindActionCreators(cartAction.addToCart(), dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductOverViewScreen);
