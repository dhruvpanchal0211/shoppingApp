import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import {Screen} from '../Helper';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name={Screen.SideScreen}
            component={this.renderDrawer}
          />
          <Stack.Screen
            name={Screen.authStack}
            component={this.renderAuthStack}
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
