import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import config from "../config";
const Expo = require("expo");
import { Facebook } from "expo";
const GOOGLE_IOS_CLIENT_KEY = config.GOOGLE_IOS_CLIENT_KEY;
const GOOGLE_ANDROID_CLIENT_KEY = config.GOOGLE_ANDROID_CLIENT_KEY;
const FACEBOOK_CLIENT_KEY = config.FACEBOOK_CLIENT_KEY;
import GoogleLoginButton from "../image/GoogleLoginButton.png";
import FacebookLoginButton from "../image/FacebookLoginButton.png";

import { AsyncStorage } from "react-native";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  //이부분 반드시 리팩토링 필요
  _storeData = async (token, image, name, userId, provider, userDB_id) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("image", image);
      await AsyncStorage.setItem("name", name);
      await AsyncStorage.setItem("userDB_id", userDB_id);
      await AsyncStorage.setItem("provider", provider);
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
        iosClientId: GOOGLE_IOS_CLIENT_KEY,
        androidClientId: GOOGLE_ANDROID_CLIENT_KEY,
        androidStandaloneAppClientId: GOOGLE_ANDROID_CLIENT_KEY,
        iosStandaloneAppClientId: GOOGLE_IOS_CLIENT_KEY,
        scopes: ["profile", "email"]
      });
      if (result.type === "success") {
        console.log("!!!!!!!!!!!!!!!!!!!", result.user);
        // console.log(result.accessToken);
        let returnData = {
          user_id: result.user.id,
          provider: "google",
          email: result.user.email
          // access_token: result.accessToken
        };
        fetch("https://ec2.fine-apple.me/users/auth", {
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
              // console.log(result.user.photoUrl);
              this._storeData(
                json.token,
                result.user.photoUrl,
                result.user.name,
                result.user.id,
                "google",
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
                "등록된 회원이 아닙니다. 구글 아이디로 회원가입 하시겠습니까?",
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      fetch("https://ec2.fine-apple.me/users/signup", {
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
        permissions: ["public_profile", "email"]
      }
    );
    if (type === "success") {
      console.log("!!!!!!!!!!!!!!!!");
      console.log(token);
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,email,name,picture.type(large)`
      );
      let user = await response.json();
      let returnData = {
        user_id: user.id,
        provider: "facebook",
        email: user.email
      };
      let userImage = user.picture.data.url;
      let userName = user.name;
      let userId = user.id;
      console.log("이거 보여야돼!!!!!!!!!", user);
      // alert("Logged in! " + "Hi " + user.name);
      fetch("https://ec2.fine-apple.me/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(returnData)
      })
        .then(result =>
          // console.log("!!!!!!!!!!!!!!!!!!!", result);
          result.json()
        )
        .then(json => {
          console.log(json);
          if (json.isMember) {
            console.log("login!!!!!!!!!!!");
            // console.log(token);
            // console.log(json);
            // console.log(userId);
            this._storeData(
              json.token,
              userImage,
              userName,
              userId,
              "facebook",
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
              "등록된 회원이 아닙니다. 페이스북 아이디로 회원가입 하시겠습니까?",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    fetch("https://ec2.fine-apple.me/users/signup", {
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

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       isLoading: true
  //     });
  //   }, 1000);
  // }

  render() {
    // if (this.state.isLoading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.googleLoginButton}
          onPress={this.GoogleSignIn.bind(this)}
        >
          <Image
            style={styles.buttonImage}
            source={GoogleLoginButton}
            resizeMode="stretch"
          />
          <Text
            style={styles.loginText}
            // allowFontScaling
            // maxFontSizeMultiplier={1}
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            Google 아이디로 로그인
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.facebookLoginButton}
          onPress={this.FacebookSignIn.bind(this)}
        >
          <Image
            style={styles.buttonImage}
            source={FacebookLoginButton}
            resizeMode="stretch"
          />
          <Text
            style={styles.loginText}
            allowFontScaling
            // maxFontSizeMultiplier={0}
            // adjustsFontSizeToFit
            // numberOfLines={1}
          >
            Facebook 아이디로 로그인
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.notLoginButton}
          onPress={() => {
            this.props.navigation.navigate("Home");
            this._storeData("", "", "", "0", "", "0");
          }}
        >
          <Text style={styles.notLoginText}>로그인 하지 않고 둘러보기</Text>
        </TouchableOpacity>
      </View>
    );
    // } else {
    //   return (
    //     <View style={styles.container}>
    //       <ActivityIndicator size="large" />
    //     </View>
    //   );
    // }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f1f3f5",
    alignItems: "center",
    justifyContent: "center"
  },
  googleLoginButton: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 70,
    backgroundColor: "#C92A29"
  },
  facebookLoginButton: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 70,
    backgroundColor: "#1871C2"
  },
  notLoginButton: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginBottom: 20,
    width: "80%",
    height: 70,
    backgroundColor: "#34495edd"
  },

  loginText: {
    // fontSize: 20.5,
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    // backgroundColor: "black",
    flex: 1,
    paddingRight: 10
  },
  notLoginText: {
    // fontSize: 20.5,
    fontSize: 17,
    fontWeight: "bold",
    color: "white"
    // backgroundColor: "black",
    // flex: 1,
    // paddingRight: 10
  },
  buttonImage: {
    marginLeft: 20,
    marginRight: 20,
    width: 35,
    height: 35
  }
  // buttonImage: {
  //   marginLeft: 20,
  //   marginRight: 20,
  //   width: "10%",
  //   height: "50%"
  // }
});

export default LoginScreen;
