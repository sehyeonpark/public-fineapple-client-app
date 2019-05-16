import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import config from "../config";
const Expo = require("expo");
import { Facebook } from "expo";
const axios = require("axios");
const IOS_CLIENT_KEY = config.IOS_CLIENT_KEY;

class LoginScreen extends Component {
  state = {
    image: {
      data: {
        url:
          "https://lh6.googleusercontent.com/-VN2J0VSlLL8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfEYa3tXM1RoFOWCyOPizSByMw5vA/mo/photo.jpg"
      }
    }
  };
  async GoogleSignIn() {
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: IOS_CLIENT_KEY,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        console.log(result.user);
        console.log(result.accessToken);
        let returnData = {
          user_id: result.user.id,
          provider: "google",
          access_token: result.accessToken
        };
        // return result.accessToken;
        axios.post("serverUrl", returnData).then(res => console.log(res));
      } else {
        return { canclled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  async FacebookSignIn() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "969319146756204",
      {
        permissions: ["public_profile"]
      }
    );
    if (type === "success") {
      console.log("!!!!!!!!!!!!!!!!");
      console.log(token);
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`
      );
      let user = await response.json();
      console.log(user);
      this.setState({
        image: user.picture
      });
      alert("Logged in! " + "Hi " + user.name);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login Screen!!!</Text>
        <Button
          title="Google Login"
          // onPress={() => this.props.navigation.navigate("Main")}
          onPress={this.GoogleSignIn.bind(this)}
          // onPress={() => console.log(Expo.Facebook)}
        />
        <Button
          title="Facebook Login"
          onPress={this.FacebookSignIn.bind(this)}
        />
        <Button
          title="로그인 하지 않고 둘러보기"
          onPress={() => this.props.navigation.navigate("Main")}
        />
        {/* <Image
          source={{ uri: this.state.image.data.url }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        /> */}
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
