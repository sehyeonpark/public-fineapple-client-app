import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { AsyncStorage } from "react-native";

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      imageUrl: "",
      userName: ""
    };
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const image = await AsyncStorage.getItem("image");
      const name = await AsyncStorage.getItem("name");
      // console.log(image);
      // console.log(name);
      if (value !== null) {
        // We have data!!
        console.log("!!!!!!!!!!!!!!");
        console.log(value);
        this.setState({
          isLogin: true,
          imageUrl: image,
          userName: name
        });
      } else {
        console.log("@@@@@@@@@@@@@@@@@");
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  componentDidMount() {
    this._retrieveData();
  }
  render() {
    console.log(this.state.isLogin);
    if (this.state.isLogin) {
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.state.imageUrl }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 20
            }}
          />
          <Text style={styles.name}>{this.state.userName}</Text>
          <Button
            title="찜 목록"
            onPress={() => this.props.navigation.navigate("HeartedItems")}
          />
          <Button
            title="로그아웃"
            onPress={() => {
              AsyncStorage.removeItem("token");
              AsyncStorage.removeItem("image");
              AsyncStorage.removeItem("name");
              this.props.navigation.navigate("Login");
            }}
          />
          {/* <Button
            title="스토리지 확인"
            onPress={this._retrieveData.bind(this)}
          /> */}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>로그인 해주세요</Text>
          <Button
            title="로그인"
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20
  }
});

export default UserScreen;
