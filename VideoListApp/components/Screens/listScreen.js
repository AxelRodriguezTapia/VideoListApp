import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from '../Styles';
import FSection from '../FSection'; // Mantengo el footer tal como solicitaste
import VideoCard from '../CartaDeVideo.js';
import { db, auth } from '../firebaseConfig'; // Acceder a Firebase
import { doc, getDoc, getDocs, collection, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; // Importar arrayRemove para eliminar elementos de un arreglo
import { Picker } from '@react-native-picker/picker'; // Asegúrate de tener esta librería instalada
import { LinearGradient } from 'expo-linear-gradient'; // Importa LinearGradient

export default function ListScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [userVideos, setUserVideos] = useState([]);  // Inicializamos como un array vacío
  const [userLists, setUserLists] = useState([]);    // Inicializamos como un array vacío
  const [selectedList, setSelectedList] = useState('');
  const [favoriteVideos, setFavoriteVideos] = useState([]); // Estado para los videos favoritos
  
  // Obtener el usuario autenticado
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          // Obtener las listas del usuario
          const listsCollectionRef = collection(db, 'userSaves', currentUser.uid, 'lists'); // Ruta correcta
          const listsSnapshot = await getDocs(listsCollectionRef);

          if (!listsSnapshot.empty) {
            const lists = listsSnapshot.docs.map(doc => doc.id); // Obtén los nombres de las listas
            setUserLists(lists);  // Establecer las listas del usuario
          } else {
            setUserLists([]);  // Si no hay listas, establecer un array vacío
          }

          // Obtener los videos guardados por el usuario
          const userDocRef = doc(db, 'userSaves', currentUser.uid);  // Referencia al documento del usuario
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserVideos(userDocSnap.data().videos || []);  // Asegúrate de que sea un array
            setFavoriteVideos(userDocSnap.data().favorites || []); // Cargar los favoritos si existen
          } else {
            setUserVideos([]);  // Si no hay videos guardados, establecer un array vacío
            setFavoriteVideos([]); // Si no hay favoritos, establecer un array vacío
          }

        } catch (error) {
          console.error('Error al obtener los datos:', error);
          setErrorMsg('Hubo un error al cargar los videos y listas.');
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  // Cuando seleccionas una lista, obtener los videos asociados a esa lista
  useEffect(() => {
    const fetchVideosFromList = async () => {
      if (selectedList) {
        try {
          const listDocRef = doc(db, 'userSaves', currentUser.uid, 'lists', selectedList);
          const listDocSnap = await getDoc(listDocRef);

          if (listDocSnap.exists()) {
            const videos = listDocSnap.data().videos || [];
            setUserVideos(videos);
          } else {
            setUserVideos([]);
          }
        } catch (error) {
          console.error('Error al obtener los videos de la lista:', error);
          setErrorMsg('Hubo un error al cargar los videos de la lista.');
        }
      }
    };

    fetchVideosFromList();
  }, [selectedList, currentUser]);

  // Función para agregar/quitar video a favoritos
  const toggleFavorite = async (video) => {
    const userDocRef = doc(db, 'userSaves', currentUser.uid);
    const isFavorite = favoriteVideos.some(fav => fav.url === video.url); // Verificar si el video ya es favorito

    try {
      if (isFavorite) {
        // Si el video ya es favorito, lo eliminamos
        await setDoc(userDocRef, {
          favorites: arrayRemove(video) // Usamos arrayRemove para eliminar el video del arreglo
        }, { merge: true });
        
        // Actualizar el estado local, eliminando el video de favoritos
        setFavoriteVideos(prevState => prevState.filter(fav => fav.url !== video.url));
      } else {
        // Si el video no es favorito, lo agregamos
        await setDoc(userDocRef, {
          favorites: arrayUnion(video) // Usamos arrayUnion para agregar el video al arreglo
        }, { merge: true });
        
        // Actualizar el estado local, agregando el video a favoritos
        setFavoriteVideos(prevState => [...prevState, video]);
      }
    } catch (error) {
      console.error('Error al marcar video como favorito:', error);
      setErrorMsg('Hubo un error al guardar el video como favorito.');
    }
  };

  const handlePress = (id) => {
    console.log("Han clicado al botón " + id);
    if (id == 1) {
      navigation.navigate("newVideoScreen");
    } else if (id == 2) {
      navigation.navigate("favouriteScreen");
    } else if (id == 3) {
      navigation.navigate("userScreen");
    }
  };

  const handleListChange = (value) => {
    setSelectedList(value);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Sección del título con gradiente */}
      <LinearGradient
        colors={['#ff0000', '#B60000', '#640000']}
        style={{ padding: 20, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: '#2c3e50' }}
      >
        <Text style={{
          fontSize: 28,              // Aumentamos el tamaño del texto
          fontWeight: 'bold',        // Hacemos el texto en negrita
          color: '#fff',             // Cambiamos el color a blanco
          textAlign: 'center',
          paddingBottom: 10,
          marginTop: 30,
        }}>
          VideoListApp
        </Text>
        <Text style={{
          fontSize: 20,              // Tamaño más grande para mejor legibilidad
          color: '#fff',             // Mantener el color blanco
          textAlign: 'center',
        }}>
          Lista de Videos
        </Text>
      </LinearGradient>

      {/* Selector de lista */}
      <View style={{ padding: 10 }}>
        <Text style={{ marginBottom: 10 }}>Selecciona una lista para ver los videos:</Text>
        {userLists.length > 0 ? (
          <Picker
            selectedValue={selectedList}
            onValueChange={handleListChange}
            style={{ height: 50, width: '100%' }}
          >
            {userLists.map((list, index) => (
              <Picker.Item key={index} label={list} value={list} />
            ))}
          </Picker>
        ) : (
          <Text>No tienes listas creadas.</Text>
        )}
      </View>

      {/* Lista de videos */}
      <View style={{ flex: 7, width: '100%' }}>
        <ScrollView>
          {userVideos.length > 0 ? (
            userVideos.map((video, index) => (
              <VideoCard
                key={index}
                videoUrl={video.url}
                title={video.title}
                description={video.description}
                onToggleFavorite={() => toggleFavorite(video)}  // Usamos esta función de toggle para los favoritos
                isFavorite={favoriteVideos.some(fav => fav.url === video.url)}  // Comprobamos si el video está en favoritos
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No tienes videos guardados en esta lista.</Text>
          )}
        </ScrollView>
      </View>

      {/* Sección inferior (Footer) */}
      <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', padding: 0 }}>
        <FSection currentSection={1} onPress={handlePress} />
      </View>
    </View>
  );
}
