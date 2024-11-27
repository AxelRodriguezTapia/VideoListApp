import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { styles } from '../Styles';
import Button from '../Button';
//import { db } from '../firebaseConfig'; // Para obtener los datos de Firebase
//import { collection, getDocs } from 'firebase/firestore'; // Para obtener los posts desde Firestore

export default function loginScreen({ navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <View>
        <Button>
        <Button 
            theme="loginTheme" 
            label={loading ? "Entrando..." : "Login"} 
            onPress={handleSave} 
            disabled={loading} // Deshabilita el botón si 'loading' es true
        />
        </Button>
    </View>
  );
}
