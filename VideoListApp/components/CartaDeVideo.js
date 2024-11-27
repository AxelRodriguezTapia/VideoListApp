import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

// Componente VideoCard para mostrar el video
export default function VideoCard({ videoUrl, title, description }) {
  // Función para verificar si la URL es de YouTube
  const isYouTube = videoUrl.includes('youtube.com/watch');
  const isInstagram = videoUrl.includes('instagram.com/p');
  const isTiktok = videoUrl.includes('tiktok.com/');

  // Extraemos el ID del video de YouTube
  const videoId = isYouTube ? videoUrl.split('v=')[1] : null;
  // URL de Instagram, ya está lista para ser usada
  const instagramUrl = isInstagram ? videoUrl : null;

  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <Text>{description}</Text>

      {/* Renderiza contenido basado en la plataforma del video */}
      {isYouTube ? (
        // Si es un video de YouTube
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          style={{ height: 200, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      ) : isInstagram ? (
        // Si es un video de Instagram
        <WebView
          source={{ uri: instagramUrl }}
          style={{ height: 580, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      ) : (
        <Text>El enlace no es compatible.</Text>
      )}
    </View>
  );
}
