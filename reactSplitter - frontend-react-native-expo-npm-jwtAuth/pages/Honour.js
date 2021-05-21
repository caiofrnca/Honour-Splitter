import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Button } from "react-native";

const Honour = ({ route, navigation }) => {
  // getting variables from the Login page through the navigation routes
  const username = route.params.paramKey;
  const password = route.params.paramKey2;
  const token = route.params.paramKey3;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Honour Splitter</Text>
        <Text style={styles.textStyle}>Welcome, {username}.</Text>
      </View>
      <View style={styles.container}>
        {/* passes the variables received from the login screen and sends via navigation to the Add Event screen. */}
        <Button
          title="Add Event"
          onPress={() =>
            navigation.navigate("AddEvent", {
              paramKey: username,
              paramKey2: password,
              paramKey3: token,
            })
          }
        />
        {/* takes to the List Summary screen */}
        <Button
          title="List Summary"
          onPress={() => navigation.navigate("ListSummary")}
        />
        {/* takes to the Close Event screen */}
        <Button
          title="Close Event"
          onPress={() => navigation.navigate("closeEvent")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Honour;

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
