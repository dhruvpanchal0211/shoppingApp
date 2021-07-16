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
import {styles} from './SignupScreenStyles';

class SignupScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  onPressSignup = () => {
    const {email, password} = this.state;
    const {auth} = this.props;
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
      Utility.showToast('PLease Enter Min 6 Digit Password');
      return;
    }
    auth.signup(email, password);
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
                placeholder="Enter Your UserName"
                autoFocus
                placeholderTextColor="#333"
                onChangeText={username => {
                  this.setState({username});
                }}
              />
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
                onChangeText={password => {
                  this.setState({password});
                }}
                secureTextEntry
              />
              <View style={styles.buttonView}>
                <View style={styles.signup}>
                  <TouchableOpacity
                    onPress={() => {
                      this.onPressSignup();
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
  console.log(Const.authAction);
  return {
    auth: bindActionCreators(Const.authAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(SignupScreen);
