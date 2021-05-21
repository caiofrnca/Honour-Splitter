import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

const ListSummary = ({ route, navigation }) => {

  const [triplabel, setTriplabel] = useState([]);

  //useEffect state to trigger the action (call another function) as soon as the triplabel variable changes.
  useEffect(() => {
    
      console.log("teste effect dentro do ListSummary: ")

  },[triplabel]);

  // declaration of variables to use in axio communication with server
  var axios = require("axios");
  var config = {
    method: "get",
    url:
      // "http://192.168.0.234:8080/login?username=" +
      "http://localhost:8080/"+triplabel,
  };


 // send GET REQUEST to the server and receive the trip label record specifies as a response.
  const sendGetRequest = async () => {
    try {
      const resp = await axios(config);
      setTriplabel(resp.data);
      await JSON.stringify(AsyncStorage.setTriplabel("@storage_Key", triplabel));
      await JSON.stringify(AsyncStorage.setTriplabel(JSON.stringify("@storage_Key", triplabel)));
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Honour Splitter</Text>
        <Text style={styles.textStyle}>
          Please insert the trip label to list all expenses:
        </Text>
        {/* The state of username is seted through useState when text is entered*/}
        <TextInput
          value={triplabel}
          onChangeText={(tripLabel) => setTriplabel(tripLabel)}
          placeholder={"Username"}
          style={styles.inputStyle}
        />
        {/* calls the function sendGetRequest when pressed.*/}
        <Button
          title="Search"
          onPress={() => sendGetRequest()}
        />

      </View>

    </SafeAreaView>
  );
};

export default ListSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
  inputStyle: {
    width: "80%",
    height: 44,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#DBDBD6",
  },
});
