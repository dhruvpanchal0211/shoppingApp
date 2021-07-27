import {Alert} from 'react-native';
import {Storage, Utility} from '../../Helper';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1qPJg7vxvW_Sb2NrqSrNixrM0WxujcNs',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Somthing went wrong!!!');
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId});
  };
};

export const login = (email, password) => {
  return async dispatch => {
    return new Promise(async (resolve, reject) => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1qPJg7vxvW_Sb2NrqSrNixrM0WxujcNs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        },
      );
      console.log(response);
      const resData = await response.json();
      if (!response.ok) {
        console.log('Login resData:', resData.error.message);

        if (resData.error.message === 'EMAIL_NOT_FOUND') {
          Alert.alert('EMAIL_NOT_FOUND');
          Utility.showToast('EMAIL_NOT_FOUND');
          reject('EMAIL_NOT_FOUND');
        }

        if (resData.error.message === 'INVALID_PASSWORD') {
          Utility.showToast('INVALID_PASSWORD');
          reject('INVALID_PASSWORD');
        }

        if (resData.error.message === 'USER_DISABLED') {
          Utility.showToast('USER_DISABLED');
          reject('USER_DISABLED');
        }
        return;
      }
      if (response.status === 200) {
        const userData = {
          token: resData.idToken,
          userId: resData.localId,
        };
        resolve();
        dispatch({
          type: LOGIN,
          token: resData.idToken,
          userId: resData.localId,
        });
        Storage.setUserData(userData);
      }
    });
  };
};
