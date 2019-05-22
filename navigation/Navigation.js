import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";
import ProductsResultScreen from "../screens/ProductsResultScreen";
import HeartedItemsScreen from "../screens/HeartedItemsScreen";
import UserScreen from "../screens/UserScreen";
import UserSignUpScreen from "../screens/UserSignUpScreen";
import StoreScreen from "../screens/StoreScreen";
import FirstScreen from "../screens/FirstScreen";

const RootStack = createStackNavigator({
  //   Login: {
  //     screen: LoginScreen
  //   },
  Main: {
    screen: MainScreen
  },
  Products: {
    screen: ProductsResultScreen
  },
  Store: {
    screen: StoreScreen
  }
});

const UserStack = createStackNavigator({
  User: {
    screen: UserScreen
  },
  HeartedItems: {
    screen: HeartedItemsScreen
  },
  Store: {
    screen: StoreScreen
  }
});

// const TabNavigator = createBottomTabNavigator({
//   Home: {
//     screen: RootStack
//   },
//   User: {
//     screen: UserStack
//   }
// });
const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: RootStack },
    User: { screen: UserStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === "Home") {
          return <Ionicons name={"ios-home"} size={30} color={tintColor} />;
        } else if (routeName === "User") {
          iconName = "ios-contact";
          return <Ionicons name={"ios-contact"} size={30} color={tintColor} />;
        }
      }
    }),
    tabBarOptions: {
      activeTintColor: "#339af0",
      inactiveTintColor: "gray"
    }
  }
);
const RootSwitch = createSwitchNavigator({
  First: {
    screen: FirstScreen
  },
  Login: {
    screen: LoginScreen
  },
  Signup: {
    screen: UserSignUpScreen
  },
  Home: {
    screen: TabNavigator
  }
});

export default createAppContainer(RootSwitch);
