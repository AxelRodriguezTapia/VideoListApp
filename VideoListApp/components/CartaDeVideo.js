import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome'; // Para los íconos de corazón

// Componente VideoCard para mostrar el video
export default function VideoCard({ videoUrl, title, description, onToggleFavorite, isFavorite }) {
  const isYouTubeLong = videoUrl.includes('youtube.com/watch'); // URL larga de YouTube
  const isYouTubeShort = videoUrl.includes('youtu.be/'); // URL corta de YouTube
  const isInstagram = videoUrl.includes('instagram.com/p');
  const isTiktok = videoUrl.includes('tiktok.com/');

  // Extraer videoId para URL larga de YouTube
  const videoIdLong = isYouTubeLong ? videoUrl.split('v=')[1] : null;

  // Extraer videoId para URL corta de YouTube
  const videoIdShort = isYouTubeShort ? videoUrl.split('/').pop().split('?')[0] : null;

  const instagramUrl = isInstagram ? videoUrl : null;

  // Generar URL de incrustación para TikTok
  const tiktokEmbedUrl = isTiktok
    ? `https://www.tiktok.com/embed/${videoUrl.split('/video/')[1]}`
    : null;

  return (
    <View style={{ margin: 10, position: 'relative' }}>
      {/* Botón de favorito en la esquina superior derecha */}
      <TouchableOpacity
        onPress={onToggleFavorite}
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 10,
        }}
      >
        <Icon
          name={isFavorite ? 'heart' : 'heart-o'}
          size={30}
          color={isFavorite ? 'red' : 'gray'}
        />
      </TouchableOpacity>

      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
      <Text>{description}</Text>

      {/* Reproducir video de YouTube (largo o corto) */}
      {isYouTubeLong || isYouTubeShort ? (
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${videoIdLong || videoIdShort}` }}
          style={{ height: 200, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}  // Permitir pantalla completa en videos de YouTube
        />
      ) : isInstagram ? (
        <WebView
          source={{ uri: instagramUrl }}
          style={{ height: 580, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}  // Permitir pantalla completa en Instagram
        />
      ) : isTiktok ? (
        <WebView
          source={{ uri: tiktokEmbedUrl }}
          style={{ height: 580, marginTop: 10 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}  // Permitir pantalla completa en TikTok
        />
      ) : (
        <Text>El enlace no es compatible.</Text>
      )}
    </View>
  );
}
