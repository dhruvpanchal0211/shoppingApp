import {Alert} from 'react-native';
import {Utility} from '../../Helper';

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
    try {
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
          return;
        }

        if (resData.error.message === 'INVALID_PASSWORD') {
          Utility.showToast('INVALID_PASSWORD');
          return new Error('INVALID_PASSWORD');
        }

        if (resData.error.message === 'USER_DISABLED') {
          Utility.showToast('USER_DISABLED');
          return new Error('USER_DISABLED');
        }
      }
      if (response.status === 200) {
        dispatch({
          type: LOGIN,
          token: resData.idToken,
          userId: resData.localId,
        });
      }
    } catch (err) {
      Alert.alert(err);
    }
  };
};
