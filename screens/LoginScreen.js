import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class LoginScreen extends Component {
  //   static navigationOptions = {
  //     header: null
  //   };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login Screen!!!</Text>
        <Button
          title="Main"
          onPress={() => this.props.navigation.navigate("Main")}
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

export default LoginScreen;
