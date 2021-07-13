import order from '../../Models/order';
import {ADD_ORDER} from '../actions/orders';

const initialState = {
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date(),
      );
      console.log('order redux state: ', state);
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
  }

  return state;
};
