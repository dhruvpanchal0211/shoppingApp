import {combineReducers, createStore, applyMiddleware} from 'redux';
import products from './reducers/products';
import cart from './reducers/cart';
import orders from './reducers/orders';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

const AppReducers = combineReducers({
  products: products,
  cart: cart,
  orders: orders,
});

const rootReducer = (state, action) => {
  return AppReducers(state, action);
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));

export default store;
