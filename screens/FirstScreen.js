import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import Logo from "../image/Logo.png";

class FirstScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={Logo} style={styles.logo} resizeMode={"stretch"} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate("Login");
          }}
        >
          <Text>Click Me!!!</Text>
        </TouchableOpacity>
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
  logo: {
    width: "50%",
    height: 250,
    marginBottom: 20
  },
  button: {
    height: 40,
    width: "60%",
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
});

export default FirstScreen;
