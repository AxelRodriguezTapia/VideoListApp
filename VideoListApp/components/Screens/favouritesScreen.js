import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { styles } from '../Styles';
import FSection from '../FSection';
//import { db } from '../firebaseConfig'; // Para obtener los datos de Firebase
//import { collection, getDocs } from 'firebase/firestore'; // Para obtener los posts desde Firestore

export default function favouriteScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const handlePress = (id) => {
    console.log("Han clicat al botó " + id);
    if (id == 1){
      navigation.navigate("listScreen");
    }else if (id == 2){
      navigation.navigate("favouriteScreen");
    }else if (id == 3){
      navigation.navigate("userScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sección superior */}
      <View style={{ flex: 1 }}>
        <Text>VideoListApp</Text>
        <Text>FavouriteScreen</Text>
      </View>

      {/* Lista */}
      <View style={{ flex: 7, width: '100%' }}>
      </View>

      {/* Sección inferior */}
      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <FSection currentSection={2} onPress={handlePress} />
      </View>
    </View>
  );
}
