import {messaging} from '@react-native-firebase/messaging';
import {Alert} from 'react-native';
import Product from '../../Models/products';
import store from '../store';
export const DELETE_PTODUCT = 'DELETE_PTODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';
export const ADD_FCM = 'ADD_FCM';

export const fetchProduct = () => {
  return async (dispatch, getState) => {
    console.log('lkjhg', global.userData);
<<<<<<< HEAD
    const ownerId = global.userData.userId;
=======
    const ownerId = getState().auth.userId;
>>>>>>> main
    console.log('fetch_auth:', ownerId);
    try {
      const response = await fetch(
        'https://react-n-shopping-default-rtdb.firebaseio.com/products.json',
      );
      const resData = await response.json();
      const loadedData = [];
      const userData = [];

      for (const key in resData) {
        loadedData.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageURL,
            resData[key].description,
            resData[key].price,
          ),
        );
        if (resData[key].ownerId === ownerId) {
          console.log('hello from if');
          userData.push(
            new Product(
              key,
              resData[key].ownerId,
              resData[key].title,
              resData[key].imageURL,
              resData[key].description,
              resData[key].price,
            ),
          );
        }
      }
      dispatch({type: SET_PRODUCT, products: loadedData, user: userData});
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
<<<<<<< HEAD
    let fcmToken = global.fcmToken;
    console.log('fcm:', fcmToken);
    const authStore = store.getState();
    console.log('authStore:', authStore.auth.userId);
    const ownerId = global.userData.userId;
=======
    const authStore = store.getState();
    console.log('authStore:', authStore.auth.userId);
    const ownerId = authStore.auth.userId;
>>>>>>> main
    const responce = await fetch(
      'https://react-n-shopping-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          ownerId,
          title,
          imageURL,
          price,
          description,
        }),
      },
    );
    const resData = await responce.json();
    console.log('resData', resData);
    await sendNoti(title);
    dispatch({
      type: ADD_PRODUCT,
      productData: {
        id: resData.name,
        ownerId,
        title,
        imageURL,
        price,
        description,
      },
    });
  };
};

export const updateProduct = (id, title, imageURL, description) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `https://react-n-shopping-default-rtdb.firebaseio.com/products/${id}.json`,
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

export const addFcm = fcmToken => {
  return async dispatch => {
    const responce = await fetch(
      'https://react-n-shopping-default-rtdb.firebaseio.com/fcm.json',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          fcmToken,
        }),
      },
    );
    const resData = await responce.json();
    console.log('fcmData', resData);
    dispatch({
      type: ADD_FCM,
      fcmToken: {
        fcmToken,
      },
    });
  };
};

// export const fetchFcm = title => {
//   return async (dispatch, getState) => {
//     try {
//       const fcmresponse = await fetch(
//         'https://react-n-shopping-default-rtdb.firebaseio.com/fcm.json',
//       );
//       const resData = await fcmresponse.json();
//       const fcmT = [];

//       for (const key in resData) {
//         fcmT.push(resData[key].fcmToken);
//       }

//       await sendNoti(fcmT, title);
//     } catch (err) {
//       throw err;
//     }
//   };
// };

export const sendNoti = async title => {
  const fcmresponse = await fetch(
    'https://react-n-shopping-default-rtdb.firebaseio.com/fcm.json',
  );
  const fcmData = await fcmresponse.json();
  const fcmT = [];

  for (const key in fcmData) {
    fcmT.push(fcmData[key].fcmToken);
  }
  let fcmToken = fcmT;
  console.log('fcmTokennnnnnn', fcmToken);

  // const fcm =
  //   'eKgMcJuWTzKkgOC7HMW65z:APA91bGhE_3zu9hASQwTw0jCPNwvAftiNhguBy-uf8W8tvcxaY594PeV5oFyl0lO4VNb2-UQk7T-aViOdjCSW7NbQhyX35S5ZOgkN1QwvELGo2SB83QY_dECoK4dmPTBxzFQPruGshsq';
  // 'fm1NLaltTx2l-t4lL3DjAv:APA91bHMyiq1YJSvi_IQ_HLIoEhpBf4QNbblh7Qu3hTTVlbM1RlyPGv7PTCSpbpc43xGchxnVCaPv6k0rJ3ZMRQ5UYUntbB4cupoOD5RcP4EHCx2QFc0PGfNf036EJJEyPi-vh--IsE_';
  // 'dxeAm-neTSm1lpJdaRSdrV:APA91bHONYKJbEwHm1DzAHYmfywqnfD5yEfyX7VmfrHvRBWI-CS8gkNuoAdqg1YXkPdQ9r8-Pk2YKGaqx-KU4cZl-kOZD4UrbwAWTrAo8lg66NDCrXnY7PSY5EkBZAaXT-o6MpaheNrN';
  // 'fSFInzNfREmYisChvJqrTF:APA91bGsHe04cwkQzjFbcfESteLkXvj66ocH-Tid74VUMqsOzrer_Rfexe7ciGmPk4OCAG1aWtkFrgeR-LG57Yj84fg-Z9PQXjptRjwlUoH5wzXYxQD9DhTWxODjVcAvCQR4GxO-wvIQ';
  const serverKey =
    'AAAA0PNMRC4:APA91bEysuPcAlU2pVNkfj-mIDMGxiKSf8O1KgMKXQ-X4uN8fnQDHDTHEjALRfX4wW6D_sP4ZGm3tLZ494AXAAga6-rab-tmWFs1tOQ6KyYn_VK9wrzr5vebxGdh1x-ayz4GbBy9Qts-';
  console.log('hello from notificationm');
  const responce = await fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'key=' + serverKey,
    },
    body: JSON.stringify({
      registration_ids: fcmToken,
      notification: {
        title: 'New Product Added:' + title,
        body: 'From Shopp App',
        mutable_contant: true,
      },
    }),
  });
  const resData = await responce.json();
  console.log('resData from noti', resData);
};
