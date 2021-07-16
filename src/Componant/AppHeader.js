import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Images} from '../Helper';

export default class AppHeader extends PureComponent {
  backView = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.pop();
        }}>
        <Image source={Images.back} style={styles.image} />
      </TouchableOpacity>
    );
  };
  cartView = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.push('CartScreen');
        }}>
        <Image source={Images.cart} style={styles.image} />
      </TouchableOpacity>
    );
  };
  menuView = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.openDrawer();
        }}>
        <Image source={Images.menu} style={styles.image} />
      </TouchableOpacity>
    );
  };
  addView = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('EditProductScreen', {
            productID: 'productID',
          });
        }}>
        <Image source={Images.edit} style={styles.image} />
      </TouchableOpacity>
    );
  };

  render() {
    const {title, isBack, isCart, isMenu, isADD} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.subView}>
          {isBack && this.backView()}
          {isMenu && this.menuView()}
          <Text style={styles.title}>{title}</Text>
          {isCart ? this.cartView() : <View style={styles.image} />}
          {isADD && this.addView()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'gray',
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  subView: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    tintColor: 'white',
    height: 30,
    width: 30,
  },
});
