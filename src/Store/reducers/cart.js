import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
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
    case REMOVE_FROM_CART:
      const currentQty = state.items[action.pid].quantity;
      console.log('qty:', currentQty);
      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new cartItem(
          state.items[action.pid].quantity - 1,
          state.items[action.pid].productPrice,
          state.items[action.pid].productTitle,
          state.items[action.pid].sum - state.items[action.pid].productPrice,
        );
        updatedCartItems = {...state.items, [action.pid]: updatedCartItem};
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totleAmount: state.totleAmount - state.items[action.pid].productPrice,
      };
  }
  return state;
};