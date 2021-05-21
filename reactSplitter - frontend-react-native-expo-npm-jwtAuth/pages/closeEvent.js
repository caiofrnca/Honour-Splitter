import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

const closeEvent = ({ route, navigation }) => {
 
  const username = route.params.paramKey;
  const [tripId, setTripId] = useState(null);


  // declaration of variables to use in axio communication with server
  var axios = require("axios");
  var config = {
    method: "POST",
    // url: "http://192.168.0.234:8080/" + username + "/" + tripId + "/expense",
    url: "http://localhost:8080/" + username + "/" + tripId + "/expense",
    data: {
      pId: username,
      amount: expense,
      description: description,
    },
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  };

  // function that executes the axios parameters and sends the response to the other page via navigation
  function AddEventCall() {
    try {
      axios(config);
      alert("Event add with sucess");
      navigation.navigate('HonourPage', { paramKey: username, paramKey2: password, paramKey3: token, })
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Honour Splitter</Text>
        <Text style={styles.textStyle}>
          Please insert the trip label to close:
        </Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderColor: "black",
            borderWidth: 1,
          }}
          placeholder="Enter trip label"
          onChangeText={setTripId}
        />
        <Button title="Close Trip" onPress={() => closeEventCall()} />
      </View>
      {/* <Button title="Logout" onPress={() => remove()} /> */}
      <Text style={{ textAlign: "center", color: "grey" }}>
        .:: PERSISTENT ::.
      </Text>
    </SafeAreaView>
  );
};

export default closeEvent;

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
});
