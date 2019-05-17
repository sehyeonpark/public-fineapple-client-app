import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AsyncStorage } from "react-native";

class HeartedItemsScreen extends Component {
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("key", "test");
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("key");
      if (value !== null) {
        // We have data!!
        console.log("!!!!!!!!!!!!!!");
        console.log(value);
      } else {
        console.log("@@@@@@@@@@@@@@@@@");
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>HeartedItems Screen!!!</Text>
        <Button
          hasTVPreferredFocus={true}
          title="스토리지 확인"
          onPress={this._retrieveData.bind(this)}
        />
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

export default HeartedItemsScreen;
