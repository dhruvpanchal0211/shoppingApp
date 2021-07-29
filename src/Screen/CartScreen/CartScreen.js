import React, {PureComponent} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
      amount: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cart !== this.props.cart) {
      this.cartDataHandler();
    }
  }
  componentDidMount() {
    this.cartDataHandler();
  }

  cartDataHandler = () => {
    const {cart} = this.props;
    let cartdata = [];

    console.log('hello from cart');
    for (const key in this.props.cart.items) {
      console.log('cart.items[key].sum', cart.items[key].sum);
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
              <Text>{itemData.item.prodSum}</Text>
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
  gotoOrders = () => {
    const {addOrders, cart} = this.props;
    if (this.state.amount === 0) {
      Alert.alert('Please Add Some Item To Cart');
      return;
    }
    addOrders.addOrder(cart, this.state.amount);
    this.props.navigation.navigate('OrderScreen');
  };
  render() {
    const {cart} = this.props;
    this.setState({amount: cart.totleAmount});
    return (
      <View style={styles.f1}>
        <AppHeader title="Cart" isBack {...this.props} />
        <Cards style={styles.m20}>
          <View style={styles.view}>
            <View>
              <Text>Totla Amount</Text>
              <Text>${cart.totleAmount} </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.gotoOrders();
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
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: bindActionCreators(Const.cartAction, dispatch),
    addOrders: bindActionCreators(Const.ordersAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
