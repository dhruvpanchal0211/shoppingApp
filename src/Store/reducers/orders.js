import order from '../../Models/order';
import {ADD_ORDER, SET_ORDERS} from '../actions/orders';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders,
      };
    case ADD_ORDER:
      const newOrder = new order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date(),
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
