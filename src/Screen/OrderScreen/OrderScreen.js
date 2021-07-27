import React, {PureComponent} from 'react';
import {Text, View, FlatList} from 'react-native';
import {styles} from './OrderScreenStyle';
import AppHeader from '../../Componant/AppHeader';
import {connect} from 'react-redux';
import Cards from '../../Componant/Card';
import {bindActionCreators} from 'redux';
import {Const} from '../../Helper';

class OrderScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderData: [],
    };
  }

  componentDidMount() {
    const {fetchOrder} = this.props;
    console.log('fetch', fetchOrder);
    fetchOrder.fetchOrders();
    this.orderDataHandler();
  }

  renderItem = itemData => {
    console.log('order ItemData:', itemData.item.date);
    return (
      <Cards style={styles.cardView}>
        <Text numberOfLines={1}>Date: {itemData.item.date.toString()}</Text>
        <Text>Totle Amount: {itemData.item.totlaAmount}</Text>
      </Cards>
    );
  };

  orderDataHandler = () => {
    const {order} = this.props;
    let orderdata = [];

    for (const key in this.props.order.orders) {
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
  return {
    order: state.orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrder: bindActionCreators(Const.ordersAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
