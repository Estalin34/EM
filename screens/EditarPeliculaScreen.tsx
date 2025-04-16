import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { auth, db } from '../config/Config';
import { ref, update } from 'firebase/database';

export default function EditarPeliculaScreen({ route, navigation }: any) {
  const { id, pelicula, lanzamiento, genero } = route.params;

  const [nuevoTitulo, setNuevoTitulo] = useState(pelicula);
  const [nuevoLanzamiento, setNuevoLanzamiento] = useState(lanzamiento.toString());
  const [nuevoGenero, setNuevoGenero] = useState(genero);
  const [nuevoImage, setnuevoImage] = useState('');

  const handleGuardar = () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return Alert.alert("Error", "Usuario no autenticado");

    const refPeli = ref(db, `usuarios/${uid}/peliculas/${id}`);
    update(refPeli, {
      pelicula: nuevoTitulo,
      lanzamiento: parseInt(nuevoLanzamiento),
      genero: nuevoGenero,
      image:nuevoImage
    })
      .then(() => {
        Alert.alert("✅ Actualizado", "Película actualizada correctamente");
        navigation.goBack('Detalle Productor');
      })
      .catch((error) => {
        console.error("Error al actualizar:", error);
        Alert.alert("Error", "Hubo un problema al actualizar.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✏️ Editar Película</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        value={nuevoTitulo}
        onChangeText={setNuevoTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Lanzamiento"
        keyboardType="numeric"
        value={nuevoLanzamiento}
        onChangeText={setNuevoLanzamiento}
      />

      <TextInput
        style={styles.input}
        placeholder="Género"
        value={nuevoGenero}
        onChangeText={setNuevoGenero}
      />
      <TextInput
        style={styles.input}
        placeholder="Imagen"
        value={nuevoImage}
        onChangeText={setnuevoImage}
      />

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#CCC',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
