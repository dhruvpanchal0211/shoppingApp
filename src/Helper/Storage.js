import AsyncStorage from '@react-native-community/async-storage';

const setUserData = async userData => {
  try {
    global.isLogin = false;
    global.userData = userData;
    await AsyncStorage.setItem('@userData', JSON.stringify(userData));
  } catch (e) {
    global.isLogin = false;
    global.userData = null;
    console.log(e);
  }
};

const getUserData = async () => {
  try {
    global.isLogin = false;
    global.userData = null;
    const value = await AsyncStorage.getItem('@userData');
    if (value !== null) {
      global.isLogin = true;
      global.userData = JSON.parse(value);
      console.log(global.userData);
    }
  } catch (e) {
    global.isLogin = false;
    global.userData = null;
    console.log(e);
  }
};

const logout = () => {
  try {
    global.isLogin = true;
    global.userData = null;
    AsyncStorage.removeItem('@userData');
  } catch (e) {
    global.isLogin = false;
    global.userData = null;
    console.log(e);
  }
};

const Storage = {
  setUserData,
  getUserData,
  logout,
};

export default Storage;
