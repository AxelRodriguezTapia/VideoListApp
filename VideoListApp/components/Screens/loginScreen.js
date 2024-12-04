import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { styles } from '../Styles';
import { auth } from '../firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function loginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Por favor, ingresa un correo y una contraseña");
      return;
    }
    
    setLoading(true);
    setErrorMsg(null);

    try {
      // Intentamos iniciar sesión con email y contraseña
      await signInWithEmailAndPassword(auth, email, password);
      // Si el login es exitoso, navegamos a la siguiente pantalla
      navigation.navigate('listScreen'); // Reemplaza 'HomeScreen' con el nombre de tu pantalla principal
    } catch (error) {
      // Si ocurre un error, mostramos un mensaje
      setErrorMsg("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Mostrar error si existe */}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Entrando..." : "Iniciar sesión"}
        onPress={handleLogin}
        disabled={loading}
      />
      
      <Text 
        style={styles.registerLink} 
        onPress={() => navigation.navigate('registerScreen')} // Navegar a la pantalla de registro
      >
        ¿No tienes cuenta? Regístrate aquí.
      </Text>
    </View>
  );
}
