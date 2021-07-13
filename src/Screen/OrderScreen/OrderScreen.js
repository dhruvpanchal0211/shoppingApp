import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './OrderScreenStyle';
import AppHeader from '../../Componant/AppHeader';
import {connect} from 'react-redux';
import Cards from '../../Componant/Card';

class OrderScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
    };
  }

  componentDidMount() {
    this.orderDataHandler();
    console.log('order state:', this.state.orderData);
  }

  renderItem = itemData => {
    console.log('order ItemData: ', itemData.item.items.items);
    return (
      <Cards style={styles.cardView}>
        <Text>Totle Amount: {itemData.item.totlaAmount}</Text>
      </Cards>
    );
  };

  orderDataHandler = () => {
    const {order} = this.props;
    let orderdata = [];

    for (const key in this.props.order.orders) {
      console.log('hello order', order.orders);

      orderdata.push({
        id: order.orders[key].id,
        item: order.orders[key].items,
        date: order.orders[key].date,
        amount: order.orders[key].totlaAmount,
      });
    }
    this.setState({orderData: orderdata});
  };
  render() {
    const {order} = this.props;
    console.log('orders', order.orders);
    return (
      <View style={styles.container}>
        <AppHeader title="OrderScreen" isMenu {...this.props} />
        <FlatList
          data={order.orders}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log('orders Items: ', state.orders);
  return {
    order: state.orders,
  };
};

export default connect(mapStateToProps)(OrderScreen);
