import React, {PureComponent} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Cards from '../../Componant/Card';
import {Const, Images, Screen, Utility} from '../../Helper';
import {styles} from './LoginScreenStyle';
import messaging from '@react-native-firebase/messaging';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk-next';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      userInfo: {},
    };
  }

  logoutWithFacebook = () => {
    LoginManager.logOut();
    this.setState({userInfo: {}});
  };

  getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          this.setState({userInfo: user});
          console.log('result:', user);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  loginWithFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      login => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const accessToken = data.accessToken.toString();
            this.getInfoFromToken(accessToken);
          });
        }
      },
      error => {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  async getToken() {
    const {fcm} = this.props;
    console.log('ffccmm:', fcm);
    console.log('get token called');
    let fcmToken;
    console.log('get fcmToken Called', fcmToken);
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('check fcm token', fcmToken);
        global.fcmToken = fcmToken;
        fcm.addFcm(fcmToken);
      }
    }
  }
  onPressLogin = async () => {
    const {auth} = this.props;
    console.log('loginauth:', auth);
    const {email, password} = this.state;
    console.log('email:', email, 'password:', password.length);
    if (!email.trim()) {
      Utility.showToast('Enter Email');
      return;
    }
    if (!password.trim()) {
      Utility.showToast('Enter Password');
      return;
    }
    if (password.length < 6) {
      Utility.showToast('Please Enter Min 6 Digit Password');
      return;
    }

    auth
      .login(email, password)
      .then(async resolve => {
        await this.getToken();
        await this.props.navigation.navigate(Screen.SideScreen);
        this.setState({email: '', password: ''});
      })
      .catch(error => {
        Utility.showToast(error);
      });
  };
  googleLogin = async () => {
    GoogleSignin.configure({
      webClientId:
        '897435059246-apcn2mdc1e7jl8igkvcpm3khce7k76e6.apps.googleusercontent.com',
      offlineAccess: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      console.log('hello play');
      try {
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo);
      } catch (error) {
        console.log('iferror', error);
      }
      // console.log('hello play');
      // await this.props.navigation.navigate(Screen.SideScreen);
      // this.setState({userInfo});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error.code);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error.code);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error.code);
        // play services not available or outdated
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };
  render() {
    const isLogin = this.state.userInfo.name;
    console.log('islogin:', isLogin);
    const buttonText = isLogin ? 'Logout With Facebook' : 'Login From Facebook';
    const onPressButton = isLogin
      ? this.logoutWithFacebook
      : this.loginWithFacebook;
    return (
      <View style={styles.mainView}>
        <ImageBackground source={Images.background} style={styles.backGround}>
          <View style={styles.mainView1}>
            <Cards style={styles.cardView}>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Email-Address"
                placeholderTextColor="#333"
                onChangeText={email => {
                  this.setState({email});
                }}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Your Password"
                placeholderTextColor="#333"
                secureTextEntry
                onChangeText={password => {
                  this.setState({password});
                }}
              />
              <View style={styles.buttonView}>
                <View style={styles.login}>
                  <TouchableOpacity
                    onPress={() => {
                      this.onPressLogin();
                    }}>
                    <Text style={styles.text}> Login </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.signup}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('SignupScreen');
                    }}>
                    <Text style={styles.text}> Signup </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.google}>
                <TouchableOpacity
                  onPress={() => {
                    this.googleLogin();
                  }}>
                  <Text style={styles.text}> Google Login </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.fb}>
                <TouchableOpacity
                  onPress={() => {
                    onPressButton();
                  }}>
                  <Text style={styles.text}> {buttonText} </Text>
                </TouchableOpacity>
              </View>
            </Cards>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: bindActionCreators(Const.authAction, dispatch),
    fcm: bindActionCreators(Const.productAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
