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
import {Const, Images, Utility} from '../../Helper';
import {styles} from './LoginScreenStyle';

class LoginScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  onPressLogin = () => {
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
    auth.login(email, password);
    this.props.navigation.navigate('ProductOverViewScreen');
  };
  render() {
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
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
