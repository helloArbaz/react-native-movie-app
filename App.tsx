import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLanding from './src/screens/AppLanding/AppLanding';
import MovieDetails from './src/screens/MovieDetails/MovieDetails';
import { Provider } from 'react-redux';




const Stack = createNativeStackNavigator();
import store from "./src/store"


export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="app"
              component={AppLanding}
              options={
                {
                  headerBackButtonMenuEnabled: false,
                  headerShown: false,
                  headerTitle: "",
                }
              }

            />
            <Stack.Screen name="movie-details" 
            component={MovieDetails}
              options={{
                headerBackButtonMenuEnabled: false,
                headerTitle: "",
                headerShown: false,
                headerStyle: {
                  backgroundColor: "black",
                }
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
