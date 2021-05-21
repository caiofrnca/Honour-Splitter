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

const Login = ({ route, navigation }) => {
  // useState variables to get the input through TextInput and send it to the API
  const [userName, setUserName] = useState("");
  const [passWord, setPassword] = useState("");
  const [toKen, setToken] = useState([]);

  //useEffect state to trigger the action to navigate passing parameters receveived as soon as the token variable changes.
  useEffect(() => {
    if (toKen == "") {
      // console.log("test: "+toKen)
    } else {
      navigation.navigate("HonourPage", {
        paramKey: userName,
        paramKey2: passWord,
        paramKey3: toKen,
      });
    }
  }, [toKen]);

  // declaration of variables to use in axio communication with server
  var axios = require("axios");
  var config = {
    method: "get",
    url:
      // "http://192.168.0.234:8080/login?username=" +
      "http://localhost:8080/login?username=" +
      userName +
      "&password=" +
      passWord,
  };

  // function that executes the axes GET REQUEST and sets the variable token with the API response, automatically triggering the useEffect that sends the information to the next screen.
  const sendGetRequest = async () => {
    try {
      const resp = await axios(config);
      //sets token
      setToken(resp.data);
      //stringify for string conversion in the server response
      await JSON.stringify(AsyncStorage.setItem("@storage_Key", toKen));
      await JSON.stringify(
        AsyncStorage.setItem(JSON.stringify("@storage_Key", toKen))
      );
    } catch (error) {
      //handling errors with the server message.
      console.log(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Honour Splitter</Text>
        <Text style={styles.textStyle}>
          Please insert your username and password
        </Text>
        {/* The state of username is seted through useState when text is entered*/}
        <TextInput
          value={userName}
          onChangeText={(username) => setUserName(username)}
          placeholder={"Username"}
          style={styles.inputStyle}
        />
        {/* The state of password is seted through useState when text is entered*/}
        <TextInput
          value={passWord}
          onChangeText={(password) => setPassword(password)}
          placeholder={"Password"}
          style={styles.inputStyle}
        />
        {/* On click of the button the function sendGetRequest is called*/}
        <Button title="Login" onPress={() => sendGetRequest()} />
      </View>
    </SafeAreaView>
  );
};

export default Login;

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
