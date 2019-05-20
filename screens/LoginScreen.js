import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import config from "../config";
const Expo = require("expo");
import { Facebook } from "expo";
const GOOGLE_CLIENT_KEY = config.GOOGLE_CLIENT_KEY;
const FACEBOOK_CLIENT_KEY = config.FACEBOOK_CLIENT_KEY;

import { AsyncStorage } from "react-native";

class LoginScreen extends Component {
  _storeData = async (token, image, name, userId, userDB_id) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("image", image);
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("userDB_id", userDB_id);
      await AsyncStorage.setItem("userId", userId);
      let isSave = await AsyncStorage.getItem("userId");
      if (isSave) return true;
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };

  async GoogleSignIn() {
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: GOOGLE_CLIENT_KEY,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        console.log("!!!!!!!!!!!!!!!!!!!", result.user);
        // console.log(result.accessToken);
        let returnData = {
          user_id: result.user.id,
          provider: "google"
          // access_token: result.accessToken
        };
        fetch("http://13.125.34.37:3001/users/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(returnData)
        })
          .then(result => result.json())
          .then(json => {
            if (json.isMember) {
              console.log(json);
              console.log("login!!!!!!!!!!!");
              // console.log(result.user.photoUrl);
              this._storeData(
                result.accessToken,
                result.user.photoUrl,
                result.user.name,
                result.user.id,
                json.userDB_id.toString()
              ).then(save => {
                if (save) {
                  this.props.navigation.navigate("Home", {
                    userData: returnData,
                    token: result.accessToken
                  });
                }
              });
            } else {
              // console.log("%%%%%%%%%%%%%%%%%", result.user);
              // this.props.navigation.navigate("Signup", {
              //   userData: returnData,
              //   token: result.accessToken,
              //   image: result.user.photoUrl,
              //   name: result.user.name,
              //   userId: result.user.id
              // });
              Alert.alert(
                "회원가입",
                "등록된 회원이 아닙니다. 구글 아이다로 회원가입 하시겠습니까?",
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      fetch("http://13.125.34.37:3001/users/signup", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(returnData)
                      })
                        .then(result => result.json())
                        .then(json => {
                          console.log(json);
                          if (json.isDone) {
                            alert("회원가입이 완료되었습니다!");
                          } else {
                            alert("회원가입이 실패하였습니다!");
                          }
                        });
                    }
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel"),
                    style: "cancel"
                  }
                ]
              );
            }
          });
      } else {
        return { canclled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  async FacebookSignIn() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FACEBOOK_CLIENT_KEY,
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
      let returnData = {
        user_id: user.id,
        provider: "facebook"
      };
      let userImage = user.picture.data.url;
      let userName = user.name;
      let userId = user.id;
      console.log(user);
      // alert("Logged in! " + "Hi " + user.name);
      fetch("http://13.125.34.37:3001/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(returnData)
      })
        .then(result => result.json())
        .then(json => {
          console.log(json);
          if (json.isMember) {
            console.log("login!!!!!!!!!!!");
            console.log(token);
            console.log(json);
            console.log(userId);
            this._storeData(
              token,
              userImage,
              userName,
              userId,
              json.userDB_id.toString()
            ).then(save => {
              if (save) {
                this.props.navigation.navigate("Home", {
                  userData: returnData,
                  token: token
                });
              }
            });
          } else {
            // console.log("###################", json);
            // this.props.navigation.navigate("Signup", {
            //   userData: returnData,
            //   token: token,
            //   image: userImage,
            //   name: userName,
            //   userId: userId
            // });
            Alert.alert(
              "회원가입",
              "등록된 회원이 아닙니다. 페이스북 아이다로 회원가입 하시겠습니까?",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    fetch("http://13.125.34.37:3001/users/signup", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(returnData)
                    })
                      .then(result => result.json())
                      .then(json => {
                        console.log(json);
                        if (json.isDone) {
                          alert("회원가입이 완료되었습니다!");
                        } else {
                          alert("회원가입이 실패하였습니다!");
                        }
                      });
                  }
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel"),
                  style: "cancel"
                }
              ]
            );
          }
        });
    }
  }

  componentDidMount() {
    AsyncStorage.clear();
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
          onPress={() => {
            this.props.navigation.navigate("Home");
            this._storeData("", "", "", "0");
          }}
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
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LoginScreen;
