import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AsyncStorage } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class HeartedItemsScreen extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   color: "green"
    // };
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
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
        <Button title="스토리지 확인" onPress={this._retrieveData.bind(this)} />
        <View style={styles.test}>
          <Ionicons
            name={"md-heart-empty"}
            size={32}
            color={this.state.color}
            onPress={() =>
              this.state.color === "green"
                ? this.setState({
                    color: "red"
                  })
                : this.setState({
                    color: "green"
                  })
            }
          />
        </View>
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
  },
  test: {
    width: "10%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "black"
  }
});

export default HeartedItemsScreen;
