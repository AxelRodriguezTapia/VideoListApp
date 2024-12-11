import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { db, auth } from '../firebaseConfig';
import { doc, setDoc, updateDoc, arrayUnion, collection, getDocs, addDoc } from 'firebase/firestore'; // Para actualizar en Firestore
import { Picker } from '@react-native-picker/picker';  // Asegúrate de tener esta librería instalada
import { serverTimestamp } from 'firebase/firestore'; // Para usar timestamps del servidor

export default function NewVideoScreen({ navigation }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedList, setSelectedList] = useState(''); // Lista seleccionada
  const [newListName, setNewListName] = useState(''); // Nuevo nombre de lista
  const [userSaves, setuserSaves] = useState([]); // Listas del usuario
  const [loading, setLoading] = useState(false);

  // Obtener el usuario autenticado
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchuserSaves = async () => {
      try {
        if (currentUser) {
          const listsCollectionRef = collection(db, 'userSaves', currentUser.uid, 'lists');
          const listsSnapshot = await getDocs(listsCollectionRef);
          
          if (!listsSnapshot.empty) {
            const lists = listsSnapshot.docs.map(doc => doc.id); // Obtener el nombre de la lista (ID del documento)
            setuserSaves(lists); // Actualizar las listas disponibles para el usuario
          } else {
            setuserSaves([]); // Si no tiene listas, establecemos un array vacío
          }
        }
      } catch (error) {
        console.error('Error al obtener las listas: ', error);
        Alert.alert('Hubo un error al cargar las listas.');
      }
    };

    fetchuserSaves();
  }, [currentUser]);

  // Función para crear una nueva lista
  const handleCreateList = async () => {
    if (!newListName) {
      Alert.alert('Por favor ingresa un nombre para la lista.');
      return;
    }

    try {
      // Crear un nuevo documento en la colección de listas
      const listRef = doc(db, 'userSaves', currentUser.uid, 'lists', newListName);
      
      // Crear la lista en Firestore, inicialmente vacía
      await setDoc(listRef, { videos: [] });

      // Agregar la lista recién creada a las listas locales
      setuserSaves(prevLists => [...prevLists, newListName]);
      setSelectedList(newListName); // Establecer la lista recién creada como seleccionada
      setNewListName(''); // Limpiar el campo de nuevo nombre de lista

      Alert.alert('¡Lista creada correctamente!');
    } catch (error) {
      console.error('Error al crear la lista: ', error);
      Alert.alert('Hubo un error al crear la lista.');
    }
  };

  const handleSave = async () => {
    if (!url || !title || !description || !selectedList) {
      Alert.alert('Por favor complete todos los campos y seleccione una lista.');
      return;
    }

    setLoading(true);

    try {
      const video = { 
        url, 
        title, 
        description, 
        createdAt: new Date().toISOString(), // Timestamp local
      };

      // Referencia al documento de la lista seleccionada
      const listDocRef = doc(db, 'userSaves', currentUser.uid, 'lists', selectedList);

      // Añadir el video a la lista seleccionada
      await updateDoc(listDocRef, {
        videos: arrayUnion(video),  // Usamos arrayUnion para agregar el video sin duplicados
      });

      Alert.alert('¡Video guardado correctamente!');
      navigation.goBack(); // Volver a la pantalla anterior después de guardar el video
    } catch (error) {
      console.error('Error al guardar el video: ', error);
      Alert.alert('Hubo un error al guardar el video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>Guardar un Nuevo Video</Text>

      {/* Campos del formulario */}
      <Text>URL del video</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="URL del video"
        value={url}
        onChangeText={setUrl}
      />

      <Text>Título del video</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Título del video"
        value={title}
        onChangeText={setTitle}
      />

      <Text>Descripción del video</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />

      {/* Selector de lista con Picker */}
      <Text>Selecciona una lista</Text>
      {userSaves.length > 0 ? (
        <Picker
          selectedValue={selectedList}
          onValueChange={setSelectedList}
          style={{ height: 50, width: '100%' }}
        >
          {userSaves.map((list, index) => (
            <Picker.Item key={index} label={list} value={list} />
          ))}
        </Picker>
      ) : (
        <Text>No tienes listas creadas.</Text>
      )}

      {/* Opción para crear una nueva lista */}
      <Text>O crea una nueva lista</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Nombre de la nueva lista"
        value={newListName}
        onChangeText={setNewListName}
      />
      <Button title="Crear nueva lista" onPress={handleCreateList} />

      {/* Botón para guardar el video */}
      <Button
        title={loading ? "Guardando..." : "Guardar Video"}
        onPress={handleSave}
        disabled={loading}
      />
    </View>
  );
}
