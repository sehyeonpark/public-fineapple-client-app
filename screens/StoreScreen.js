import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { MapView } from "expo";

class StoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeDetail: {},
      isMapview: false
    };
  }

  findStoreDetail = () => {
    const { params } = this.props.navigation.state;
    // console.log(params);
    console.log("Fetch!!!!!!");
    fetch(
      `https://ec2.fine-apple.me/stores/info?countryCode=${params.country.toLowerCase()}&storeCode=${
        params.store
      }`
    )
      .then(result => result.json())
      .then(json =>
        this.setState({
          storeDetail: json
        })
      )
      .then(() => console.log(this.state));
  };

  componentDidMount() {
    this.findStoreDetail();
  }

  render() {
    if (
      this.state.storeDetail.hasOwnProperty("storeName") &&
      !this.state.isMapview
    ) {
      return (
        <ScrollView style={{ marginTop: 50 }}>
          <View style={styles.container}>
            <Text style={styles.storeName}>
              {this.state.storeDetail.storeName}
            </Text>
            <Image
              source={{ uri: this.state.storeDetail.image_url }}
              style={styles.picture}
              resizeMode={"stretch"}
            />
            <View style={styles.storeInfo}>
              <View style={styles.infoText1}>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  주소 :
                </Text>
                <Text>{this.state.storeDetail.address.address2}</Text>
                <Text>{this.state.storeDetail.address.address3}</Text>
                <Text>{this.state.storeDetail.contact}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.setState({
                      isMapview: true
                    })
                  }
                >
                  <Text style={{ fontWeight: "bold", color: "#228be6" }}>
                    오시는 길과 지도>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoText2}>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  매장 운영 시간 :
                </Text>
                <Text>{this.state.storeDetail.storeHours.storeDays}</Text>
                <Text>{this.state.storeDetail.storeHours.storeTimings}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      );
    } else if (this.state.isMapview) {
      return (
        <ScrollView style={{ marginTop: 50 }}>
          <View style={styles.container}>
            <Text style={styles.storeName}>
              {this.state.storeDetail.storeName}
            </Text>
            <View style={{ width: "95%", height: 300 }}>
              <MapView
                style={{ width: "100%", flex: 1 }}
                initialRegion={{
                  latitude: this.state.storeDetail.storeLocation.storelatitude,
                  longitude: this.state.storeDetail.storeLocation
                    .storelongitude,
                  latitudeDelta: 0.001,
                  longitudeDelta: 0.0005
                }}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.storeDetail.storeLocation
                      .storelatitude,
                    longitude: this.state.storeDetail.storeLocation
                      .storelongitude
                  }}
                  title={this.state.storeDetail.storeName}
                  description={this.state.storeDetail.contact}
                />
              </MapView>
            </View>
            <View style={styles.storeInfo}>
              <View style={styles.infoText1}>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  주소 :
                </Text>
                <Text>{this.state.storeDetail.address.address2}</Text>
                <Text>{this.state.storeDetail.address.address3}</Text>
                <Text>{this.state.storeDetail.contact}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    this.setState({
                      isMapview: false
                    })
                  }
                >
                  <Text style={{ fontWeight: "bold", color: "#228be6" }}>
                    매장 운영 시간 보기>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.infoText2}>
                <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                  찾아오시는 길 :
                </Text>
                <Text>{this.state.storeDetail.way_to_come}</Text>
              </View>
            </View>
          </View>
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
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  picture: {
    width: "95%",
    height: 300
    // marginBottom: 20
  },
  storeInfo: {
    flexDirection: "row",
    backgroundColor: "#f1f3f5",
    width: "95%",
    paddingTop: 20,
    paddingBottom: 20
  },
  infoText1: {
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 10
    // backgroundColor: "black"
  },
  infoText2: {
    flex: 1,
    paddingRight: 10
  },
  button: {
    marginTop: 10
  },
  storeName: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 20
  }
});

export default StoreScreen;
