import PRODUCTS from '../../data/dummy-data';
import Products from '../../Models/products';
import {
  ADD_PRODUCT,
  DELETE_PTODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
} from '../actions/products';
import store from '../store';

// const authState = store.getState();
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerID === 'u1'),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      // console.log('authhhh store:', authState.auth);
      return {
        availableProducts: action.products,
        userProducts: action.products,
      };
    case ADD_PRODUCT:
      const newProduct = new Products(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageURL,
        action.productData.description,
        action.productData.price,
      );
      console.log('newProduct', newProduct);
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct], // state.availableProducts.concat(newProduct)
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid,
      );
      console.log('productIndex', action.pid);
      const updatedProduct = new Products(
        action.pid,
        // state.userProducts[productIndex].ownerID,
        action.productData.title,
        action.productData.imageURL,
        action.productData.description,
        state.userProducts[productIndex].price,
      );
      const updatedUserProduct = [...state.userProducts];
      updatedUserProduct[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid,
      );
      const updatedAvilableProduct = [...state.availableProducts];
      updatedAvilableProduct[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvilableProduct,
        userProducts: updatedUserProduct,
      };
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
