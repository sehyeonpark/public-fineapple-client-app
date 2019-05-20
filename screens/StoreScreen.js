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
      `http://13.125.34.37:3001/stores/info?countryCode=${params.country.toLowerCase()}&storeCode=${
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
        <View style={styles.container}>
          <Text>{this.state.storeDetail.storeName}</Text>
          <Image
            source={{ uri: this.state.storeDetail.image_url }}
            style={styles.picture}
            resizeMode={"stretch"}
          />
          <View style={styles.storeInfo}>
            <View style={styles.test}>
              <Text>주소 :</Text>
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
                <Text>오시는 길과 지도></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.test2}>
              <Text>매장 운영 시간 :</Text>
              <Text>{this.state.storeDetail.storeHours.storeDays}</Text>
              <Text>{this.state.storeDetail.storeHours.storeTimings}</Text>
            </View>
          </View>
        </View>
      );
    } else if (this.state.isMapview) {
      return (
        <View style={styles.container}>
          <Text>{this.state.storeDetail.storeName}</Text>
          <View style={{ width: "95%", height: 300 }}>
            <MapView
              style={{ width: "100%", flex: 1 }}
              initialRegion={{
                latitude: this.state.storeDetail.storeLocation.storelatitude,
                longitude: this.state.storeDetail.storeLocation.storelongitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.001
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.storeDetail.storeLocation.storelatitude,
                  longitude: this.state.storeDetail.storeLocation.storelongitude
                }}
                title={this.state.storeDetail.storeName}
                description={this.state.storeDetail.contact}
              />
            </MapView>
          </View>
          <View style={styles.storeInfo}>
            <View style={styles.test}>
              <Text>주소 :</Text>
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
                <Text>매장 운영 시간 보기></Text>
              </TouchableOpacity>
            </View>
            <View style={styles.test2}>
              <Text>찾아오시는 길 :</Text>
              <Text>{this.state.storeDetail.way_to_come}</Text>
            </View>
          </View>
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
    backgroundColor: "#fff",
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
    backgroundColor: "#dee2e6",
    width: "95%",
    paddingTop: 20,
    paddingBottom: 20
  },
  test: {
    flex: 1,
    justifyContent: "flex-start",
    paddingLeft: 10
    // backgroundColor: "black"
  },
  test2: {
    flex: 1
  },
  button: {
    marginTop: 10
  }
});

export default StoreScreen;
