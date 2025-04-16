import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function Pantalla2Screen({ navigation }: any) {
  const [email, setemail] = useState("");
  const [contrasenia, setcontrasenia] = useState("");
  const [nombre, setnombre] = useState("");
  const [apellido, setapellido] = useState("");

  function register() {
    // Validar campos vacíos
    if (!nombre || !apellido || !email || !contrasenia) {
      return Alert.alert("Campos requeridos", "Por favor completa todos los campos.");
    }
  
    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Alert.alert("Correo inválido", "Ingresa un correo electrónico válido.");
    }
  
    // Validar longitud de contraseña
    if (contrasenia.length < 6) {
      return Alert.alert("Contraseña inválida", "La contraseña debe tener al menos 6 caracteres.");
    }
  
    // Crear usuario si pasa todas las validaciones
    createUserWithEmailAndPassword(auth, email, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.navigate('Welcome');
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        onChangeText={setnombre}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        onChangeText={setapellido}
        value={apellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setemail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={setcontrasenia}
        value={contrasenia}
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Registrarse</Text>
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
