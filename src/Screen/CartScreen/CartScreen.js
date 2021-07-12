import React, {PureComponent} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppHeader from '../../Componant/AppHeader';
import Cards from '../../Componant/Card';
import {Const, Images} from '../../Helper';
import {styles} from './CartScreenStyles';

class CartScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cartData: [],
    };
  }

  componentDidMount() {
    this.cartDataHandler();
  }

  cartDataHandler = () => {
    const {cart} = this.props;
    let cartdata = [];

    for (const key in this.props.cart.items) {
      console.log('hello', cart.items[key].sum);

      cartdata.push({
        prodId: key,
        prodTitle: cart.items[key].productTitle,
        quantity: cart.items[key].quantity,
        prodPrice: cart.items[key].productPrice,
        prodSum: cart.items[key].sum,
      });
    }
    this.setState({cartdata: cartdata});
  };

  renderItem = itemData => {
    const {removeFromCart} = this.props;
    console.log('itemData', itemData);
    return (
      <View>
        <Cards>
          <View style={styles.mainView}>
            <View style={styles.SubView}>
              <Text>Qty:</Text>
              <Text>{itemData.item.quantity}</Text>
            </View>
            <View style={styles.SubView}>
              <Text>Title:</Text>
              <Text numberOfLines={1}>{itemData.item.prodTitle}</Text>
            </View>
            <View style={styles.SubView}>
              <Text>Sum:</Text>
              <Text>{itemData.item.prodSum.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                removeFromCart.removeFromCart(itemData.item.prodId);
              }}>
              <Image source={Images.bin} style={styles.imageStyle} />
            </TouchableOpacity>
          </View>
        </Cards>
      </View>
    );
  };
  render() {
    const {cart} = this.props;
    console.log('cartItems:', this.state.cartdata);
    return (
      <View style={styles.f1}>
        <AppHeader title="Cart" isBack />
        <Cards style={{marginTop: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text>Totla Amount</Text>
              <Text>${cart.totleAmount.toFixed(2)} </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('OrderScreen');
              }}>
              <Image source={Images.add_cart} style={styles.imageStyle} />
            </TouchableOpacity>
          </View>
        </Cards>
        <FlatList
          data={this.state.cartdata}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem}
          contentContainerStyle={styles.pv20}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('cart Items: ', state.cart.totleAmount);
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: bindActionCreators(Const.cartAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
