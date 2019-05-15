import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class HeartedItems extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>HeartedItems Page</Text>
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

export default HeartedItems;
