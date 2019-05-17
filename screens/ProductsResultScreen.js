import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

class ProductsResultScreen extends Component {
  render() {
    const { params } = this.props.navigation.state;
    console.log(params);
    return (
      <View style={styles.container}>
        <Text>ProductsResult Screen!!!</Text>
        <Text>{params.country}</Text>
        <Text>{params.store}</Text>
        <Text>{params.category}</Text>
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

export default ProductsResultScreen;
