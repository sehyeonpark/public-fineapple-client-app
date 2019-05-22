import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from "react-native";
import { AsyncStorage } from "react-native";

class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isLogin: false,
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
        this.setState({
          isLogin: false
        });
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
          {/* <Button
            title="찜 목록"
            onPress={() => this.props.navigation.navigate("HeartedItems")}
          />
          <Button
            title="로그아웃"
            onPress={() => {
              AsyncStorage.clear();
              alert("로그아웃 되었습니다. 다시 로그인 해주세요!");
              this.props.navigation.navigate("Login");
            }}
          /> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("HeartedItems")}
          >
            <Text style={styles.buttonText}>찜 목록</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert("로그아웃", "로그아웃 하시겠습니까?", [
                {
                  text: "Yes",
                  onPress: () => {
                    AsyncStorage.clear()
                      .then(() =>
                        alert("로그아웃 되었습니다. 다시 로그인 해주세요.")
                      )
                      .then(() => this.props.navigation.navigate("Login"));
                  }
                },
                {
                  text: "Cancel",
                  style: "cancel"
                }
              ]);
            }}
          >
            <Text style={styles.buttonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.isLogin === false) {
      return (
        <View style={styles.container}>
          {/* <Text>로그인 해주세요</Text>
          <Button
            title="로그인"
            onPress={() => this.props.navigation.navigate("Login")}
          /> */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Alert.alert("로그인", "로그인 하시겠습니까?", [
                {
                  text: "Yes",
                  onPress: () => {
                    this.props.navigation.navigate("Login");
                  }
                },
                {
                  text: "Cancel",
                  style: "cancel"
                }
              ]);
            }}
          >
            <Text style={styles.buttonText}>로그인</Text>
          </TouchableOpacity>
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30
  },
  button: {
    borderWidth: 1.25,
    borderRadius: 25,
    borderColor: "#495057",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    height: 50,
    marginTop: 20
  },
  buttonText: {
    fontSize: 14.5,
    fontWeight: "bold",
    color: "#495057"
  }
});

export default UserScreen;
