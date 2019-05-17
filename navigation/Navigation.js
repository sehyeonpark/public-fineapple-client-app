import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import MainScreen from "../screens/MainScreen";
import ProductsResultScreen from "../screens/ProductsResultScreen";
import HeartedItemsScreen from "../screens/HeartedItemsScreen";
import UserScreen from "../screens/UserScreen";
import UserSignUpScreen from "../screens/UserSignUpScreen";

const RootStack = createStackNavigator({
  //   Login: {
  //     screen: LoginScreen
  //   },
  Main: {
    screen: MainScreen
  },
  Products: {
    screen: ProductsResultScreen
  }
});

const UserStack = createStackNavigator({
  User: {
    screen: UserScreen
  },
  HeartedItems: {
    screen: HeartedItemsScreen
  }
});

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: RootStack
  },
  User: {
    screen: UserStack
  }
});
const RootSwitch = createSwitchNavigator({
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
