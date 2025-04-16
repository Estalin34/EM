import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function Pantalla1Screen({ navigation }: any) {
  const [email, setemail] = useState("");
  const [contrasenia, setcontrasenia] = useState("");

  
  function login() {
    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Correo inválido", "Por favor ingresa un correo electrónico válido.");
      return;
    }
  
    // Validación de la contraseña
    if (contrasenia.length < 6) {
      Alert.alert("Contraseña inválida", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }
  
    // Si pasa las validaciones, intenta iniciar sesión
    signInWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Drawer');
      })
      .catch((error) => {
        Alert.alert("Error", "Correo o contraseña inválidos.");
        console.error(error);
      });
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={(texto) => setemail(texto)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={(texto) => setcontrasenia(texto)}
        value={contrasenia}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 35,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 14,
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#CCC',
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
