import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView
} from "react-native";

class StoreScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>StoreScreen Screen!!!</Text>
        {/* <ActivityIndicator size="large" /> */}
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

export default StoreScreen;
