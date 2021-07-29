import Order from '../../Models/order';
import store from '../store';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
  return async dispatch => {
    const authStore = store.getState();
    const ownerId = global.userData.userId;
    try {
      const response = await fetch(
        `https://react-n-shopping-default-rtdb.firebaseio.com/orders/${ownerId}.json`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      console.log('order action', resData);
      const loadedOrders = [];

      for (const key in resData) {
        console.log('order action key', resData[key].totalAmount);
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date),
          ),
        );
      }
      dispatch({type: SET_ORDERS, orders: loadedOrders});
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async dispatch => {
    const authStore = store.getState();
    const ownerId = global.userData.userId;
    console.log('add owner', ownerId);
    const date = new Date();
    const response = await fetch(
      `https://react-n-shopping-default-rtdb.firebaseio.com/orders/${global.userData.userId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
