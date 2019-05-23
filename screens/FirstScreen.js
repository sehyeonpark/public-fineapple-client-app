import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";
import Logo from "../image/Logo.png";
import { AsyncStorage } from "react-native";

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

  //todo: 자동 로그인을 하기 위한 로직이지만 아직은 서버와 통신하지 않는 형태
  //서버에서 자동 로그인 체크 로직이 만들어지면 리팩토링 필요
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
