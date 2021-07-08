import React, {PureComponent} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class AppHeader extends PureComponent {
  render() {
    const {title} = this.props;
    return (
      <View style={styles.container}>
        <Text> left </Text>
        <Text> {title} </Text>
        <Text> right </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
