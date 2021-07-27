import {LOGIN, SIGNUP} from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  console.log('auth state:', state);
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};
