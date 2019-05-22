import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

class HeartedItemsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      color: "#dee2e6",
      secondColor: "#f78fb3",
      userId: 0,
      userDB_id: 0
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("userId");
      const userDB = await AsyncStorage.getItem("userDB_id");
      if (value !== null) {
        // We have data!!
        this.setState({
          userId: value,
          userDB_id: userDB
        });
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };

  findProducts = () => {
    this._retrieveData().then(() => {
      console.log(this.state);
      fetch(
        `http://13.125.34.37:3001/heartedItems/list?userID=${
          this.state.userDB_id
        }`
      )
        .then(result => result.json())
        .then(json => {
          console.log(json);
          this.setState({
            products: json
          });
        });
      // .then(() => console.log(this.state.products));
    });
  };

  componentDidMount() {
    // await this._retrieveData();
    this.findProducts();
  }

  render() {
    if (
      this.state.products.hasOwnProperty("heartedItems") &&
      this.state.products.heartedItems.length !== 0
    ) {
      return (
        <ScrollView>
          {this.state.products.heartedItems.map(item => {
            return (
              <View key={item.productID} style={styles.container}>
                <View style={styles.icon}>
                  <Ionicons
                    // style={styles.icon}
                    name={"ios-heart"}
                    size={32}
                    color={this.state.secondColor}
                    onPress={() => {
                      Alert.alert(
                        "찜 목록 제거",
                        "찜 목록에서 제거하시겠습니까?",
                        [
                          {
                            text: "Yes",
                            onPress: () => {
                              // console.log(
                              //   this.state.userDB_id,
                              //   item.productID,
                              //   item.storeID
                              // );
                              let deleteBody = {
                                userID: Number(this.state.userDB_id),
                                productID: item.productID,
                                storeID: item.storeID
                              };
                              fetch(
                                "http://13.125.34.37:3001/heartedItems/delete",
                                {
                                  method: "DELETE",
                                  headers: {
                                    "Content-Type": "application/json"
                                  },
                                  body: JSON.stringify(deleteBody)
                                }
                              )
                                .then(result => result.json())
                                .then(json => {
                                  if (json.isDone) {
                                    this.findProducts();
                                    alert("찜 목록에서 제거되었습니다.");
                                  } else {
                                    alert("실패!!!");
                                  }
                                });
                            }
                          },
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancle"),
                            style: "cancel"
                          }
                        ],
                        { cancelable: false }
                      );
                    }}
                  />
                </View>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.picture}
                  resizeMode={"stretch"}
                />
                <Text style={styles.text}>{item.modelName}</Text>
                {item.isPickupAvailable ? (
                  <View style={styles.pickupTrue}>
                    <Text style={styles.pickupText}>픽업가능</Text>
                  </View>
                ) : (
                  <View style={styles.pickupFalse}>
                    <Text style={styles.pickupText}>픽업불가능</Text>
                  </View>
                )}
                <Text style={styles.text}>{item.storeName}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    // console.log("0000000000000000000", params);
                    this.props.navigation.navigate("Store", {
                      country: item.countryCode,
                      store: item.storeCode
                    });
                  }}
                >
                  <Text style={styles.pickupText}> 매장 정보 보기 </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      );
    } else if (
      this.state.products.hasOwnProperty("heartedItems") &&
      this.state.products.heartedItems.length === 0
    ) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>찜 목록이 없습니다</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    borderColor: "#dee2e6",
    borderWidth: 2,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20
    // justifyContent: "center"
  },
  picture: {
    width: 200,
    height: 200,
    // marginTop: 10,
    marginBottom: 20
    // alignItems: "center"
    // backgroundColor: "black"
  },
  text: {
    marginBottom: 13,
    fontSize: 18
  },
  pickupTrue: {
    alignItems: "center",
    justifyContent: "center",
    width: 115,
    height: 35,
    backgroundColor: "#74b816",
    marginBottom: 7,
    borderRadius: 20
  },
  pickupFalse: {
    alignItems: "center",
    justifyContent: "center",
    width: 115,
    height: 35,
    backgroundColor: "#ff6b6b",
    marginBottom: 7,
    borderRadius: 20
  },
  pickupText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white"
  },
  button: {
    // marginBottom: 20,
    // paddingTop: 20,
    marginTop: 10,
    backgroundColor: "#b2bec3",
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "center"
    // borderRadius: 20
  },
  icon: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "flex-end",
    paddingLeft: "75%"
  }
});

export default HeartedItemsScreen;
