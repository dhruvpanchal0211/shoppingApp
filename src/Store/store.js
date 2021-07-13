import {combineReducers, createStore} from 'redux';
import products from './reducers/products';
import cart from './reducers/cart';
import orders from './reducers/orders';

const AppReducers = combineReducers({
  products: products,
  cart: cart,
  orders: orders,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const store = createStore(rootReducer);

export default store;
