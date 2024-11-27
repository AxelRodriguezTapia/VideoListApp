import React, { useEffect, useState } from 'react';
import { View, Text, Alert,ScrollView } from 'react-native';
import { styles } from '../Styles';
import FSection from '../FSection';
import VideoCard from '../CartaDeVideo.js';
//import { db } from '../firebaseConfig'; // Para obtener los datos de Firebase
//import { collection, getDocs } from 'firebase/firestore'; // Para obtener los posts desde Firestore

export default function listScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const handlePress = (id) => {
    console.log("Han clicat al botó " + id);
    if (id == 1){
      navigation.navigate("newVideoScreen");
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
        <Text>ListScreen</Text>
      </View>

      {/* Lista */}
      <View style={{ flex: 7, width: '100%' }}>
      <ScrollView>
        <VideoCard
          videoUrl="https://www.youtube.com/watch?v=XGxIE1hr0w4"
          title="Video de Ejemplo 1"
          description="Este es un video de ejemplo."
        />
        <VideoCard
          videoUrl="https://www.youtube.com/watch?v=9bZkp7q19f0"
          title="Video de Ejemplo 2"
          description="Otro video de ejemplo."
        />
        <VideoCard
            videoUrl="https://www.instagram.com/p/XXXXXXXX/"
            title="Video de Instagram"
            description="Mira este increíble video."
        />
      </ScrollView>
      </View>

      {/* Sección inferior */}
      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <FSection currentSection={1} onPress={handlePress} />
      </View>
    </View>
  );
}
