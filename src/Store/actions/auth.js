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
    const resData = await response.json();
    if (!response.ok) {
      console.log('Login resData:', resData.error.message);
      console.log(response);

      if (resData.error.message === 'EMAIL_NOT_FOUND') {
        Utility.showToast('EMAIL_NOT_FOUND');
        throw new Error('EMAIL_NOT_FOUND');
      }

      if (resData.error.message === 'INVALID_PASSWORD') {
        Utility.showToast('INVALID_PASSWORD');
        throw new Error('INVALID_PASSWORD');
      }

      if (resData.error.message === 'USER_DISABLED') {
        Utility.showToast('USER_DISABLED');
        throw new Error('USER_DISABLED');
      }
    }

    dispatch({type: SIGNUP, token: resData.idToken, userId: resData.localId});
  };
};
