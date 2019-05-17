import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AsyncStorage } from "react-native";

class UserSignUpScreen extends Component {
  _storeData = async token => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  };
  render() {
    const { params } = this.props.navigation.state;
    // console.log(params);
    return (
      <View style={styles.container}>
        <Text>등록된 회원이 아닙니다.</Text>
        <Text>회원가입 하시겠습니까?</Text>
        <View style={styles.rowView}>
          <Button
            title="Yes"
            onPress={() => {
              fetch("http://13.125.34.37:3001/users/signup", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(params.userData)
              })
                .then(this._storeData(params.token))
                .then(this.props.navigation.navigate("Home"));
            }}
          />
          <Button
            title="No"
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>
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
  rowView: {
    flexDirection: "row"
  }
});

export default UserSignUpScreen;
