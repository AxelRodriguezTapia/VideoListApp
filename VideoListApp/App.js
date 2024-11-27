import { StatusBar } from "expo-status-bar";
import { View } from "react-native";


import loginScreen from "./components/Screens/loginScreen";
import favouriteScreen from "./components/Screens/favouritesScreen";
import listScreen from "./components/Screens/listScreen";
import newVideoScreen from "./components/Screens/newVideoScreen";
import userScreen from "./components/Screens/userScreen";


import { styles } from "./components/Styles.js";
import { useRef } from 'react';
import React from 'react';

// Importa las dependencias de navegación
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Define el stack de navegación
const Stack = createNativeStackNavigator();
function HomeScreen({ navigation }) {
  const imageRef = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// App principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="listScreen">
        <Stack.Screen name="newVideoScreen" component={newVideoScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="favouriteScreen" component={favouriteScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="listScreen" component={listScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="loginScreen" component={loginScreen} options = {{animation: 'none', headerShown: false}}/>
        <Stack.Screen name="userScreen" component={userScreen} options = {{animation: 'none', headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}