import React, {PureComponent} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Images} from '../Helper';

export default class AppHeader extends PureComponent {
  backView = () => {
    return <Image source={Images.back} style={styles.image} />;
  };
  cartView = () => {
    return <Image source={Images.cart} style={styles.image} />;
  };
  menuView = () => {
    return <Image source={Images.menu} style={styles.image} />;
  }
  render() {
    const {title, isBack, isCart, isMenu} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.subView}>
          {isBack && this.backView()}
          {isMenu && this.menuView()}
          <Text style={styles.title}> {title} </Text>
          {isCart && this.cartView()}
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
