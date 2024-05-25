import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLanding from './src/screens/AppLanding/AppLanding';
import MovieDetails from './src/screens/MovieDetails/MovieDetails';



const Stack = createNativeStackNavigator();


export default class extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="app"
            component={AppLanding}
            options={{ headerShown: false }}

          />
          <Stack.Screen name="movie-details" component={MovieDetails} />
        </Stack.Navigator>
      </NavigationContainer>
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
