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
import { AsyncStorage } from "react-native";

class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _retrieveData = async () => {
    try {
      const userDB = await AsyncStorage.getItem("userDB_id");
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("userId");
      if (token !== null) {
        // We have data!!
        console.log("token :::::::::::::", token);
        console.log(user);
        console.log("userDB ::::::::::::::::", userDB);
        this.setState({
          token: token,
          userId: user,
          userDB_id: userDB
        });
      } else {
        this.setState({
          token: undefined
        });
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  nextPage = () => {
    if (this.state.token !== undefined) {
      this.props.navigation.navigate("Home");
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  componentDidMount() {
    this._retrieveData();
    setTimeout(this.nextPage, 2000);
  }

  render() {
    if (this.state.hasOwnProperty("token")) {
      return (
        <View style={styles.container}>
          <Image source={Logo} style={styles.logo} resizeMode={"stretch"} />
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (this.state.token !== undefined) {
                this.props.navigation.navigate("Home");
              } else {
                this.props.navigation.navigate("Login");
              }
            }}
          >
            <Text>Click Me!!!</Text>
          </TouchableOpacity> */}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f3f5",
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
