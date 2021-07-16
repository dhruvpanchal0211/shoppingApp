import React, {PureComponent} from 'react';
import {Text, View, FlatList} from 'react-native';
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
  }

  renderItem = itemData => {
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

export default connect(mapStateToProps)(OrderScreen);
