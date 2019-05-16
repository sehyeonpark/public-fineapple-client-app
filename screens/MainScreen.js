import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import HeartedItemsScreen from "./HeartedItemsScreen";

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Main Screen!!!</Text>
        <DrawerNavigator />
      </View>
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

const HeaderNavigator = createDrawerNavigator(
  {
    HeartedItems: HeartedItemsScreen
  },
  { drawerType: "back", drawerPosition: "left", drawerWidth: 200 }
);

const DrawerNavigator = createAppContainer(HeaderNavigator);

export default MainScreen;
