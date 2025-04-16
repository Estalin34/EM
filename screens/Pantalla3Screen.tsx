import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { ref, set } from 'firebase/database';

export default function Pantalla3Screen({ navigation }: any) {
const [id, setid] = useState("");
const [pelicula, setpelicula] = useState("");
const [lanzamiento, setlanzamiento] = useState(0);
const [genero, setgenero] = useState("");
const [image, setimage] = useState("");

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setid(uid);
    }
  });
}, []);

function handleScoreChange(text: string) {
  const parsedScore = parseInt(text, 10);
  if (!isNaN(parsedScore) && parsedScore >= 0 && parsedScore <= 999999) {
    setlanzamiento(parsedScore);
  }
}

function guardar() {
  if (pelicula && lanzamiento && genero) {
    set(ref(db, 'usuarios/' + id + '/peliculas/' + Date.now()), {
      pelicula: pelicula,
      lanzamiento: lanzamiento,
      genero: genero,
      image:image
    })
      .then(() => {
        Alert.alert("Éxito", "Los datos se han guardado correctamente.", [
          { text: "OK", onPress: () => clearFields() },
        ]);
      })
      .catch((error) => {
        Alert.alert("Error", "Hubo un problema al guardar los datos.");
        console.error('Error al guardar:', error);
      });
  } else {
    Alert.alert("Advertencia", "Por favor, complete todos los campos.");
  }
}

function clearFields() {
  setpelicula("");
  setlanzamiento(0);
  setgenero("");
}

return (
  <View style={styles.container}>
    <Text style={styles.title}>🎬 Guardar Película</Text>

    <TextInput
      style={styles.input}
      placeholder="Nombre de la película"
      onChangeText={(texto) => setpelicula(texto)}
      value={pelicula}
    />

    <TextInput
      style={styles.input}
      placeholder="Año de lanzamiento"
      onChangeText={(texto) => handleScoreChange(texto)}
      value={lanzamiento.toString()}
      keyboardType="numeric"
    />

    <TextInput
      style={styles.input}
      placeholder="Género"
      onChangeText={(texto) => setgenero(texto)}
      value={genero}
    />
   
    <TextInput
      style={styles.input}
      placeholder="URL de la imagen"
      onChangeText={(texto) => setimage(texto)}
      value={image}
      
          />
          
          

    <TouchableOpacity style={styles.button} onPress={guardar}>
      <Text style={styles.buttonText}>Guardar</Text>
    </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  padding: 20,
  flex: 1,
  backgroundColor: '#F5F5F5',
  justifyContent: 'center',
},
title: {
  fontSize: 24,
  marginBottom: 30,
  textAlign: 'center',
  fontWeight: 'bold',
  color: '#333',
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
  backgroundColor: '#4CAF50',
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
