import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Navigation } from "react-native-navigation";
import { createStackNavigator, createAppContainer } from "react-navigation";
// import { createSwitchNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import ProductsResultScreen from "./screens/ProductsResultScreen";

export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
      // <AppNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const RootStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Main: {
    screen: MainScreen
  },
  Products: {
    screen: ProductsResultScreen
  }
});

const AppStackNavigator = createAppContainer(RootStack);

// const AppSwitchNavigator = createSwitchNavigator({
//   LoadingScreen: LoadingScreen,
//   LoginScreen: LoginScreen,
//   DashboardScreen: DashboardScreen
// });

// const AppNavigator = createAppContainer(AppSwitchNavigator);
