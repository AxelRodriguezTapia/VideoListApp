import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Importa LinearGradient
import { auth } from '../firebaseConfig'; // Importa Firebase auth
import FSection from '../FSection';

export default function UserScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState(null);  // Para almacenar el correo electrónico del usuario
  const [loading, setLoading] = useState(true);  // Para manejar el estado de carga

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email || 'No disponible');  // Establecer el correo electrónico del usuario
    }
    setLoading(false);  // Terminar el estado de carga
  }, []);

  // Función para hacer logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      Alert.alert('Has cerrado sesión correctamente');
      navigation.navigate('loginScreen');  // Redirigir al listado de videos
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Hubo un error al cerrar sesión');
    });
  };

  const handlePress = (id) => {
    console.log("Han clicado al botón " + id);
    if (id === 1) {
      navigation.navigate("listScreen");
    } else if (id === 2) {
      navigation.navigate("favouriteScreen");
    } else if (id === 3) {
      navigation.navigate("userScreen");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Sección superior con gradiente */}
      <LinearGradient
        colors={['#3498db', '#2980b9', '#1abc9c']}  // Definimos el gradiente azul-verde
        style={styles.gradientBackground}
      >
        <View style={styles.headerContainer}>
          {/* Titulo */}
          <View>
            <Text style={styles.titleText}>VideoListApp</Text>
            <Text style={styles.subtitleText}>Bienvenido, {userEmail}</Text>
          </View>

          {/* Botón de Logout */}
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Lista (puedes agregar los componentes que desees aquí) */}
      <View style={{ flex: 7, width: '100%' }}></View>

      {/* Sección inferior */}
      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <FSection currentSection={3} onPress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Se asegura de que el título y el botón estén en los extremos
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
  },
  subtitleText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  logoutText: {
    fontSize: 18,
    color: '#e74c3c',  // Rojo para destacar el logout
    padding: 10,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#3498db',
  },
});
