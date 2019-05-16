import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>LoadingScreen Screen!!!</Text> */}
        <ActivityIndicator size="large" />
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

export default LoadingScreen;
