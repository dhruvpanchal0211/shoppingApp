import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {PureComponent} from 'react';
import {
  CartScreen,
  EditProductScreen,
  OrderScreen,
  ProductDetailsScreen,
  ProductOverViewScreen,
  UserProductScreen,
  SideMenuScreen,
  SignupScreen,
  LoginScreen,
} from '../Screen';
import {Screen, Storage} from '../Helper';
import store from '../Store/store';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default class Router extends PureComponent {
  renderAuthStack = () => {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={Screen.LoginScreen} component={LoginScreen} />
        <Stack.Screen name={Screen.SignupScreen} component={SignupScreen} />
      </Stack.Navigator>
    );
  };
  renderDrawer = () => {
    const {isLogin} = this.props;
    if (isLogin) {
      console.log('isLogin', isLogin);
    }
    return (
      <Drawer.Navigator drawerContent={props => <SideMenuScreen {...props} />}>
        <Drawer.Screen
          name={Screen.ProductOverViewScreen}
          component={ProductOverViewScreen}
        />
        <Drawer.Screen name={Screen.OrderScreen} component={OrderScreen} />
        <Drawer.Screen
          name={Screen.UserProductScreen}
          component={UserProductScreen}
        />
      </Drawer.Navigator>
    );
  };

  render() {
    const {isLogin} = this.props;
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode="none"
          initialRouteName={
            isLogin ? Screen.ProductOverViewScreen : Screen.authStack
          }>
          <Stack.Screen
            name={Screen.authStack}
            component={this.renderAuthStack}
          />
          <Stack.Screen
            name={Screen.SideScreen}
            component={this.renderDrawer}
          />

          <Stack.Screen
            name={Screen.ProductOverViewScreen}
            component={ProductOverViewScreen}
          />
          <Stack.Screen
            name={Screen.ProductDetailsScreen}
            component={ProductDetailsScreen}
          />
          <Stack.Screen name={Screen.CartScreen} component={CartScreen} />
          <Stack.Screen
            name={Screen.UserProductScreen}
            component={UserProductScreen}
          />
          <Stack.Screen
            name={Screen.EditProductScreen}
            component={EditProductScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
