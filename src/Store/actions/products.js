import {Alert} from 'react-native';
import Product from '../../Models/products';
import store from '../store';
export const DELETE_PTODUCT = 'DELETE_PTODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProduct = () => {
  return async dispatch => {
    try {
      const response = await fetch(
        'https://react-n-shopping-default-rtdb.firebaseio.com/products.json',
      );
      const resData = await response.json();
      const loadedData = [];

      for (const key in resData) {
        loadedData.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageURL,
            resData[key].description,
            resData[key].price,
          ),
        );
      }
      dispatch({type: SET_PRODUCT, products: [loadedData]});
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = productID => {
  return async dispatch => {
    const response = await fetch(
      `https://react-n-shopping-default-rtdb.firebaseio.com/products/${productID}.json`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({type: DELETE_PTODUCT, pid: productID});
  };
};

export const addProduct = (title, imageURL, price, description) => {
  return async dispatch => {
    // const authStore = store.getState();
    // console.log('authStore:', authStore);
    const responce = await fetch(
      'https://react-n-shopping-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imageURL,
          price,
          description,
        }),
      },
    );
    const resData = await responce.json();
    console.log('resData', resData);
    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageURL,
        price,
        description,
      },
    });
  };
};

export const updateProduct = (id, title, imageURL, description) => {
  return async (dispatch, getState) => {
    // console.log('getState:', store.getState());
    try {
      const response = await fetch(
        `https://react-n-shopping-default-rtdb.firebaseio.com/products/${id}.json?auth={'...}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            imageURL,
            description,
          }),
        },
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
    } catch (err) {
      console.log('errrrooo in catch', err);
      Alert.alert('Something went wrong!');
      return;
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        imageURL,
        description,
      },
    });
  };
};
