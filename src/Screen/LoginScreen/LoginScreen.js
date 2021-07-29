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

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
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
<<<<<<< HEAD
        await this.getToken();
        await this.props.navigation.navigate(Screen.SideScreen);
        this.setState({email: '', password: ''});
=======
        await this.props.navigation.navigate('ProductOverViewScreen');
>>>>>>> main
      })
      .catch(error => {
        Utility.showToast(error);
      });
  };
  render() {
    const {email, password} = this.state;
    return (
      <View style={styles.mainView}>
        <ImageBackground source={Images.background} style={styles.backGround}>
          <View style={styles.mainView1}>
            <Cards style={styles.cardView}>
              <TextInput
                style={styles.input}
                value={email}
                placeholder="Enter Your Email-Address"
                placeholderTextColor="#333"
                onChangeText={email => {
                  this.setState({email});
                }}
              />
              <TextInput
                style={styles.input}
                value={password}
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
                      this.props.navigation.navigate(Screen.authStack);
                    }}>
                    <Text style={styles.text}> Signup </Text>
                  </TouchableOpacity>
                </View>
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
