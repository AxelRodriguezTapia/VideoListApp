import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { styles } from '../Styles';
import FSection from '../FSection';
//import { db } from '../firebaseConfig'; // Para obtener los datos de Firebase
//import { collection, getDocs } from 'firebase/firestore'; // Para obtener los posts desde Firestore

export default function newVideoScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);


  return (
    <View style={{ flex: 1 }}>
      {/* Sección superior */}
      <View style={{ flex: 1 }}>
        <Text>VideoListApp</Text>
      </View>

      {/* Lista */}
      <View style={{ flex: 7, width: '100%' }}>
      </View>

      {/* Sección inferior */}
      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <FSection currentSection={1} onPress={() => navigation.navigate("NewMarker")} />
      </View>
    </View>
  );
}
