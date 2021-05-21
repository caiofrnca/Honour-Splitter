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

const AddEvent = ({ route, navigation }) => {
  // getting variables from the Honour page through the navigation routes
  const username = route.params.paramKey;
  const password = route.params.paramKey2;
  const token = route.params.paramKey3;

  // useState variables to get the input through TextInput and send it to the API
  const [tripId, setTripId] = useState(null);
  const [expense, setExpense] = useState(null);
  const [description, setDescription] = useState(null);

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
    // specifications required in the header of the server side.
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
      navigation.navigate("HonourPage", {
        paramKey: username,
        paramKey2: password,
        paramKey3: token,
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Honour Splitter</Text>
        <Text style={styles.textStyle}> {username}, please insert:</Text>
      </View>
      <View style={styles.container}>
        {/* set the input entered by the client into the variable using useState */}
        <TextInput
          style={{
            height: 40,
            borderColor: "black",
            borderWidth: 1,
          }}
          placeholder="Enter trip label"
          onChangeText={setTripId}
        />
        {/* set the input entered by the client into the variable using useState */}
        <TextInput
          style={{
            height: 40,
            borderColor: "black",
            borderWidth: 1,
          }}
          placeholder="Enter your expense"
          onChangeText={setExpense}
        />
        {/* set the input entered by the client into the variable using useState */}
        <TextInput
          style={{
            height: 40,
            borderColor: "black",
            borderWidth: 1,
          }}
          placeholder="Description"
          onChangeText={setDescription}
        />
        <Button title="Add Event" onPress={() => AddEventCall()} />
      </View>
    </SafeAreaView>
  );
};

export default AddEvent;

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
