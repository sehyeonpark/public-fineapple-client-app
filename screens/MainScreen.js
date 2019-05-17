import React, { Component } from "react";
import { Text, View, StyleSheet, Picker, Button } from "react-native";
import category from "../data/category";
const categoryList = category.categoryList;

class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      country: "KR",
      store: "R692",
      mainCategory: "mac",
      subCategory: "macbook",
      storeList: [],
      mainCategoryList: [],
      subCategoryList: []
    };
  }
  findStoreList() {
    fetch("http://13.125.34.37:3001/stores/list")
      .then(res => res.json())
      .then(json => {
        console.log("fetch!!!!!!!!!!!!!!!!!");
        this.setState({
          storeList: json
        });
      });
  }

  categoryListInit() {
    let mainList = [];
    let subList = [];
    for (let key in categoryList) {
      mainList.push(key);
      subList.push(categoryList[key]);
    }
    this.setState({
      mainCategoryList: mainList,
      subCategoryList: subList
    });
  }

  componentDidMount() {
    this.findStoreList();
    this.categoryListInit();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>국가를 선택해주세요</Text>
        <Picker
          style={styles.twoPickers}
          itemStyle={styles.twoPickerItems}
          selectedValue={this.state.country}
          onValueChange={itemValue => this.setState({ country: itemValue })}
        >
          <Picker.Item label="대한민국" value="KR" />
          <Picker.Item label="일본" value="JP" />
          <Picker.Item label="홍콩" value="HK" />
        </Picker>
        <Text style={styles.title}>스토어를 선택해주세요</Text>
        <Picker
          style={styles.twoPickers}
          itemStyle={styles.twoPickerItems}
          selectedValue={this.state.store}
          onValueChange={itemValue => this.setState({ store: itemValue })}
        >
          {this.state.storeList.map(store => {
            let arr = [];
            if (store.country_code === this.state.country) {
              arr.push(
                <Picker.Item
                  label={store.store_name}
                  value={store.store_code}
                  key={store.id}
                />
              );
            }
            return arr;
          })}
        </Picker>
        <Text style={styles.title}>제품 대분류</Text>
        <Picker
          style={styles.twoPickers}
          itemStyle={styles.twoPickerItems}
          selectedValue={this.state.mainCategory}
          onValueChange={itemValue =>
            this.setState({ mainCategory: itemValue })
          }
        >
          {this.state.mainCategoryList.map(item => (
            <Picker.Item label={item} value={item.toLowerCase()} key={item} />
          ))}
        </Picker>
        <Text style={styles.title}>제품 소분류</Text>
        <Picker
          style={styles.twoPickers}
          itemStyle={styles.twoPickerItems}
          selectedValue={this.state.subCategory}
          onValueChange={itemValue => this.setState({ subCategory: itemValue })}
        >
          {this.state.subCategoryList.map(item => {
            let arr = [];
            for (let key in item) {
              if (item[key].includes(this.state.mainCategory)) {
                arr.push(
                  <Picker.Item label={key} value={item[key]} key={item[key]} />
                );
              }
            }
            return arr;
          })}
        </Picker>
        <Button
          hasTVPreferredFocus={true}
          title="검색하기"
          onPress={() => this.props.navigation.navigate("Products")}
          // onPress={() => {
          //   // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!");
          //   // console.log(this.state.country);
          //   // console.log(this.state.store);
          //   // console.log(this.state.subCategory);
          // }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: 20,
    marginBottom: 10
  },
  twoPickers: {
    width: "80%",
    height: 88,
    backgroundColor: "white",
    borderColor: "#dee2e6",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 7
  },
  twoPickerItems: {
    height: 88,
    color: "#495057"
  }
});

export default MainScreen;
