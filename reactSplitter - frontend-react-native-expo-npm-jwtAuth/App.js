import "react-native-gesture-handler";
import React from "react";
//Navigation imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//"pages/files" to import into navigation
import LoginPage from "./pages/Login";
import HonourPage from "./pages/Honour";
import AddEvent from "./pages/AddEvent";
import closeEvent from "./pages/closeEvent";
import ListSummary from "./pages/ListSummary";

//initialization of the stack navigator, which contains the "map" of the pages.
const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        {/* initialization of the page in the stack navigator */}
        <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
            name="closeEvent"
            component={closeEvent}
            options={{
              title: "Close Event", //Header Title
              headerStyle: {
                backgroundColor: "#f4511e", //Header color
              },
              headerTintColor: "#fff", //Header text color
              headerTitleStyle: {
                fontWeight: "bold", //Header text style
              },
            }}
          />
          {/* initialization of the page in the stack navigator */}
        <Stack.Screen
            name="ListSummary"
            component={ListSummary}
            options={{
              title: "List Summary", //Header Title
              headerStyle: {
                backgroundColor: "#f4511e", //Header color
              },
              headerTintColor: "#fff", //Header text color
              headerTitleStyle: {
                fontWeight: "bold", //Header text style
              },
            }}
          />
          {/* initialization of the page in the stack navigator */}
          <Stack.Screen
            name="AddEvent"
            component={AddEvent}
            options={{
              title: "AddEvent", //Header Title
              headerStyle: {
                backgroundColor: "#f4511e", //Header color
              },
              headerTintColor: "#fff", //Header text color
              headerTitleStyle: {
                fontWeight: "bold", //Header text style
              },
            }}
          />
          {/* initialization of the page in the stack navigator */}
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{
              title: "Login Page", //Header Title
              headerStyle: {
                backgroundColor: "#f4511e", //Header color
              },
              headerTintColor: "#fff", // Header text color
              headerTitleStyle: {
                fontWeight: "bold", // Header text style
              },
            }}
          />
          {/* initialization of the page in the stack navigator */}
          <Stack.Screen
            name="HonourPage"
            component={HonourPage}
            options={{
              title: "Honour Page", // Header Title
              headerStyle: {
                backgroundColor: "#f4511e", // Header color
              },
              headerTintColor: "#fff", // Header text color
              headerTitleStyle: {
                fontWeight: "bold", // Header text style
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
