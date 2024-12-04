import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { styles } from '../Styles';
import { auth } from '../firebaseConfig'; // Asegúrate de importar la configuración de Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Función para manejar el registro
  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMsg("Por favor, ingresa todos los campos");
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // Intentamos crear un nuevo usuario con correo y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      // Si el registro es exitoso, navegamos a la pantalla de login
      Alert.alert('¡Éxito!', 'Cuenta creada con éxito.', [
        { text: 'OK', onPress: () => navigation.navigate('loginScreen') }
      ]);
    } catch (error) {
      // Si ocurre un error, mostramos un mensaje
      setErrorMsg("Error al crear la cuenta. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Creando cuenta..." : "Registrarse"}
        onPress={handleRegister}
        disabled={loading}
      />
      
      <Text 
        style={styles.registerLink} 
        onPress={() => navigation.navigate('loginScreen')} // Navegar a la pantalla de login
      >
        ¿Ya tienes cuenta? Inicia sesión aquí.
      </Text>
    </View>
  );
}
