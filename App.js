import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/Login";
import HeartedItems from "./src/HeartedItems";
import Main from "./src/Main";
import SearchResult from "./src/SearchResult";
import StoreInfo from "./src/StoreInfo";

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>React-Native!!!</Text>
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

export default App;
