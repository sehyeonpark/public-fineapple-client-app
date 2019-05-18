import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity
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
      isLogin: false
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        // We have data!!
        this.setState({
          isLogin: true
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
    const { params } = this.props.navigation.state;
    fetch(
      `http://13.125.34.37:3001/products/list?countryCode=${
        params.country
      }&storeCode=${params.store}&category=${params.category}&userId=${
        params.userId
      }`
    )
      .then(result => result.json())
      .then(json =>
        this.setState({
          products: json
        })
      )
      .then(() => console.log(this.state.products));
  };

  componentDidMount() {
    this.findProducts();
    this._retrieveData();
  }

  render() {
    // const { params } = this.props.navigation.state;
    // console.log(params);
    // const isLogin = this._retrieveData();
    if (this.state.products.hasOwnProperty("productlist")) {
      return (
        <ScrollView>
          {this.state.products.productlist.map(item => {
            const { params } = this.props.navigation.state;
            let userHeartedItem = {
              userID: params.userId,
              productID: item.productID,
              storeID: params.store
            };
            return (
              <View key={item.productID} style={styles.container}>
                <View style={styles.icon}>
                  <Ionicons
                    // style={styles.icon}
                    name={"ios-heart"}
                    size={32}
                    color={
                      this.state["color" + item.productID] === undefined
                        ? this.state.color
                        : this.state.secondColor
                    }
                    onPress={() => {
                      this.state.isLogin === true
                        ? this.state["color" + item.productID] === undefined
                          ? fetch("http://13.125.34.37:3001/heartedItems/add", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify(userHeartedItem)
                            })
                              .then(
                                this.setState({
                                  ["color" + item.productID]: "check"
                                })
                              )
                              .then(alert("찜목록이 저장되었습니다!"))
                          : this.setState({
                              ["color" + item.productID]: undefined
                            }) //여기 수정해야된다!!!!!!!!!!!!!!!!!!!!!!
                        : //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                          //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                          alert("로그인 해주세요!!!!!");
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
                  onPress={() => this.props.navigation.navigate("Store")}
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

export default ProductsResultScreen;
