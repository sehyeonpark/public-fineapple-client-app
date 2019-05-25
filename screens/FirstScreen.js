import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import Logo from "../image/Logo.png";
import { AsyncStorage } from "react-native";
const { height, width } = Dimensions.get("window");

class FirstScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //자동 로그인을 위한 로직이지만 서버 로직이 완성되면 리팩토링을 하여
  //서버와 통신하는 형태로 변경해야 함
  _retrieveData = async () => {
    try {
      const userDB = await AsyncStorage.getItem("userDB_id");
      const user = await AsyncStorage.getItem("userId");
      const provider = await AsyncStorage.getItem("provider");
      const token = await AsyncStorage.getItem("token");
      // console.log("width::::", width);
      // console.log("height::::", height);
      // console.log("비율::::", height);
      if (token !== null) {
        // We have data!!
        // console.log("token :::::::::::::", token);
        // console.log(user);
        // console.log("userDB ::::::::::::::::", userDB);
        this.setState({
          token: token,
          userId: user,
          userDB_id: userDB,
          provider: provider
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

  loginCheck = () => {
    this._retrieveData().then(() =>
      fetch(
        `https://ec2.fine-apple.me/users/check?provider=${this.state.provider}`,
        {
          method: "GET",
          headers: {
            "x-access-token": this.state.token
          }
        }
      )
        .then(data => data.json())
        .then(json => {
          console.log(json);
          this.setState({
            isLogged: json.isLogged
          });
        })
        .then(() => setTimeout(this.nextPage, 1000))
    );
  };

  nextPage = () => {
    if (this.state.isLogged) {
      this.props.navigation.navigate("Home");
    } else {
      this.props.navigation.navigate("Login");
    }
  };

  componentDidMount() {
    this.loginCheck();
    // setTimeout(this.nextPage, 2000);
  }

  render() {
    if (this.state.hasOwnProperty("token")) {
      return (
        <View style={styles.container}>
          {/* <Image source={Logo} style={styles.logo} resizeMode={"stretch"} /> */}
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

          <ActivityIndicator size="large" />
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
