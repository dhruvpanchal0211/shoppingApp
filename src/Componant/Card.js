import React, {PureComponent} from 'react';
import {View, StyleSheet} from 'react-native';

export default class Card extends PureComponent {
  render() {
    return (
      <View style={{...styles.MainContainer, ...this.props.style}}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    shadowColor: '#333333',
    shadowOpacity: 0.26,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 8,
    borderWidth: 0,
    padding: 20,
    borderRadius: 20,
  },
});
