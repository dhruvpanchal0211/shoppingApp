import Product from '../../Models/products';
export const DELETE_PTODUCT = 'DELETE_PTODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProduct = () => {
  return async dispatch => {
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
  };
};

export const deleteProduct = productID => {
  return {type: DELETE_PTODUCT, pid: productID};
};

export const addProduct = (title, imageURL, price, description) => {
  return async dispatch => {
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
    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        // ownerId: 'u1',
        title,
        imageURL,
        price,
        description,
      },
    });
  };
};

export const updateProduct = (id, title, imageURL, description) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {
      title,
      imageURL,
      description,
    },
  };
};
