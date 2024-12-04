import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { styles } from '../Styles';
import FSection from '../FSection';
import VideoCard from '../CartaDeVideo.js';

export default function listScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);

  const handlePress = (id) => {
    console.log("Han clicat al botó " + id);
    if (id == 1) {
      navigation.navigate("newVideoScreen");
    } else if (id == 2) {
      navigation.navigate("favouriteScreen");
    } else if (id == 3) {
      navigation.navigate("userScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sección superior */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' }}>
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#2c3e50',
          textAlign: 'center',
          padding: 10,
        }}>
          VideoListApp
        </Text>
        <Text style={{
          fontSize: 18,
          fontWeight: '400',
          color: '#7f8c8d',
          textAlign: 'center',
        }}>
          ListScreen
        </Text>
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
            videoUrl="https://www.instagram.com/p/C0mukzYoDQk/?igsh=MTcxYmdremJkZ2Fobg=="
            title="Video de Instagram"
            description="Mira este increíble video."
          />
          <VideoCard
            videoUrl="https://www.tiktok.com/@/video/7436754091868556599?_r=1&_t=8rvfbZFGFjk"
            title="Video de TikTok"
            description="¡Disfruta este video de TikTok!"
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
