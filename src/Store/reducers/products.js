import PRODUCTS from '../../data/dummy-data';
import {DELETE_PTODUCT} from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerID === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PTODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid,
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid,
        ),
      };
  }
  return state;
};
