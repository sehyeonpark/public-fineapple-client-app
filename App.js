import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { Navigation } from "react-native-navigation";
// import {
//   createStackNavigator,
//   createAppContainer,
//   createBottomTabNavigator
// } from "react-navigation";

// import LoginScreen from "./screens/LoginScreen";
// import MainScreen from "./screens/MainScreen";
// import ProductsResultScreen from "./screens/ProductsResultScreen";
// import HeartedItemsScreen from "./screens/HeartedItemsScreen";
// import UserScreen from "./screens/UserScreen";

import Navigator from "./navigation/Navigation";

export default class App extends React.Component {
  render() {
    return <Navigator />;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// const RootStack = createStackNavigator({
//   Login: {
//     screen: LoginScreen
//   },
//   Main: {
//     screen: MainScreen
//   },
//   Products: {
//     screen: ProductsResultScreen
//   }
// });

// const TabNavigator = createBottomTabNavigator({
//   Home: {
//     screen: RootStack
//   },
//   User: {
//     screen: UserScreen
//   }
// });

// const AppStackNavigator = createAppContainer(TabNavigator);
