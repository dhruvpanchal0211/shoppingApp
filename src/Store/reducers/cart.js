import {ADD_TO_CART} from '../actions/cart';
import cartItem from '../../Models/cartItems';

const initialState = {
  items: {},
  totleAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let newOrUpdatedItem;

      if (state.items[addedProduct.id]) {
        newOrUpdatedItem = new cartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice,
        );
      } else {
        newOrUpdatedItem = new cartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: {...state.items, [addedProduct.id]: newOrUpdatedItem},
        totleAmount: state.totleAmount + prodPrice,
      };
    }
  }
  console.log('state items', state.items);
  return state;
};
