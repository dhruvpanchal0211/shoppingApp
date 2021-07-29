import PRODUCTS from '../../data/dummy-data';
import Products from '../../Models/products';
import {
  ADD_PRODUCT,
  DELETE_PTODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT,
  ADD_FCM,
} from '../actions/products';

const initialState = {
  availableProducts: [],
  userProducts: [],
  fcmTokens: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        availableProducts: action.products,
        userProducts: action.user,
      };
    case ADD_PRODUCT:
      const newProduct = new Products(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageURL,
        action.productData.description,
        action.productData.price,
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid,
      );
      let ownerId;
      let price;
      for (const key in state.userProducts) {
        if (state.userProducts[key].id === action.pid) {
          ownerId = state.userProducts[key].ownerID;
          price = state.userProducts[key].price;
        }
      }
      const updatedProduct = new Products(
        action.pid,
        ownerId,
        action.productData.title,
        action.productData.imageURL,
        action.productData.description,
        price,
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
    case ADD_FCM:
      return {
        ...state,
        fcmTokens: action.fcmToken,
      };
  }

  return state;
};
