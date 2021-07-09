import {combineReducers, createStore} from 'redux';
import products from './reducers/products';
import cart from './reducers/cart';

const AppReducers = combineReducers({products: products, cart: cart});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const store = createStore(rootReducer);

export default store;
