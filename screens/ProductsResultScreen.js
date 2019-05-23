import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";

class ProductsResultScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      color: "#dee2e6",
      secondColor: "#f78fb3",
      isLogin: false,
      userDB_id: 0
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const userDB = await AsyncStorage.getItem("userDB_id");
      if (value !== null) {
        // We have data!!
        this.setState({
          isLogin: true,
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

  //서버 API에서 요청하는 body 형식이 조금 꼬여있어서 params와 state를 섞어서 fetch 보낸다
  //리팩토링 필요
  findProducts = () => {
    const { params } = this.props.navigation.state;
    console.log("params :::::::::::::", params);
    // console.log("state :::::::::", this.state.userDB_id);
    fetch(
      `http://13.125.34.37:3001/products/list?countryCode=${
        params.country
      }&storeCode=${params.store}&category=${params.category}&userID=${Number(
        params.userDB_id
      )}`
    )
      .then(result => result.json())
      .then(json => {
        // console.log(json);
        this.setState({
          products: json
        });
      })
      .then(() => console.log(this.state.products));
  };

  async componentDidMount() {
    await this._retrieveData();
    await this.findProducts();
  }

  render() {
    // const { params } = this.props.navigation.state;
    // console.log(params);
    // const isLogin = this._retrieveData();
    if (this.state.products.hasOwnProperty("productlist")) {
      if (this.state.products.productlist.length !== 0) {
        return (
          <ScrollView>
            {this.state.products.productlist.map(item => {
              const { params } = this.props.navigation.state;
              // console.log("params ::::::::::::", params);
              // 이 부분은 여러군데에서 값을 참조하는 구조이다.
              // 서버에서 요청하는 API 문서가 너무 꼬여있는 형태라 어쩔 수 없이 이런 참조방식이 되었다
              let userHeartedItem = {
                userID: Number(this.state.userDB_id),
                productID: Number(item.productID),
                storeID: Number(params.storeID)
              };
              return (
                <View key={item.productID} style={styles.container}>
                  <View style={styles.icon}>
                    <Ionicons
                      // style={styles.icon}
                      name={"ios-heart"}
                      size={32}
                      color={
                        this.state.isLogin && item.isHearted
                          ? this.state.secondColor
                          : this.state.color
                      }
                      onPress={() => {
                        this.state.isLogin === true
                          ? !item.isHearted
                            ? Alert.alert(
                                "찜 목록 추가",
                                "찜 목록에 추가하시겠습니까?",
                                [
                                  {
                                    text: "Yes",
                                    onPress: () =>
                                      fetch(
                                        "http://13.125.34.37:3001/heartedItems/add",
                                        {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json"
                                          },
                                          body: JSON.stringify(userHeartedItem)
                                        }
                                      )
                                        .then(result => result.json())
                                        .then(json => {
                                          console.log(json);
                                          if (json.isDone) {
                                            this.findProducts();
                                            alert("찜 목록이 저장되었습니다!");
                                          }
                                        })
                                  },
                                  {
                                    text: "Cancel",
                                    style: "cancel"
                                  }
                                ]
                              )
                            : Alert.alert(
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
                                      // let deleteBody = {
                                      //   userID: Number(this.state.userDB_id),
                                      //   productID: item.productID,
                                      //   storeID: item.storeID
                                      // };
                                      fetch(
                                        "http://13.125.34.37:3001/heartedItems/delete",
                                        {
                                          method: "DELETE",
                                          headers: {
                                            "Content-Type": "application/json"
                                          },
                                          body: JSON.stringify(userHeartedItem)
                                        }
                                      )
                                        .then(result => result.json())
                                        .then(json => {
                                          if (json.isDone) {
                                            this.findProducts();
                                            alert(
                                              "찜 목록에서 제거되었습니다."
                                            );
                                          } else {
                                            alert("실패!!");
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
                              )
                          : Alert.alert(
                              "찜 목록 추가",
                              "로그인이 필요한 서비스입니다. 로그인 하시겠습니까?",
                              [
                                {
                                  text: "Yes",
                                  onPress: () =>
                                    this.props.navigation.navigate("Login")
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
                        country: params.country,
                        store: params.store
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
      } else {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>리스트가 없습니다</Text>
          </View>
        );
      }
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
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10
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

export default ProductsResultScreen;
