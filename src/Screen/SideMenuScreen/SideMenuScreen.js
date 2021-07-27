import React, {PureComponent} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Images, Storage} from '../../Helper';
import LoginScreen from '../LoginScreen/LoginScreen';
import {styles} from './SideMenuScreenStyles';

export default class SideMenuScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ProductOverViewScreen');
          }}>
          <View style={styles.rowView}>
            <Image source={Images.overview} style={styles.imgView} />
            <Text style={styles.text}>Product OverView</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.hrLine} />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('OrderScreen');
          }}>
          <View style={styles.rowView}>
            <Image source={Images.add_cart} style={styles.imgView} />
            <Text style={styles.text}>Order Details</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.hrLine} />
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('UserProductScreen');
          }}>
          <View style={styles.rowView}>
            <Image source={Images.user} style={styles.imgView} />
            <Text style={styles.text}>User Product</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.hrLine} />
        <View style={styles.logout}>
          <View style={styles.hrLine} />
          <View style={styles.logout}>
            <TouchableOpacity
              onPress={() => {
                Storage.logout();
                this.props.navigation.navigate('LoginScreen');
              }}>
              <View style={styles.rowView}>
                <Image source={Images.logout} style={styles.imgView} />
                <Text style={styles.text}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
