import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

// Componente VideoCard para mostrar el video
export default function VideoCard({ videoUrl, title, description }) {
  const isYouTube = videoUrl.includes('youtube.com/watch');
  const isInstagram = videoUrl.includes('instagram.com/p');
  const isTiktok = videoUrl.includes('tiktok.com/');

  const videoId = isYouTube ? videoUrl.split('v=')[1] : null;
  const instagramUrl = isInstagram ? videoUrl : null;

  // Generar URL de incrustación para TikTok
  const tiktokEmbedUrl = isTiktok
    ? `https://www.tiktok.com/embed/${videoUrl.split('/video/')[1]}`
    : null;

  return (
    <View style={{ margin: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <Text>{description}</Text>

      {isYouTube ? (
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          style={{ height: 200, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      ) : isInstagram ? (
        <WebView
          source={{ uri: instagramUrl }}
          style={{ height: 580, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      ) : isTiktok ? (
        <WebView
          source={{ uri: tiktokEmbedUrl }}
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
