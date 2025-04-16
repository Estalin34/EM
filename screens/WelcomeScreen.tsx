import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenidos</Text>
      <Text style={styles.subtitle}>¡Gracias por usar nuestra app!</Text>

      <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
  buttonPrimary: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
