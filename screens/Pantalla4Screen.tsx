import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/Config';
import { onValue, ref, remove } from 'firebase/database';

interface PeliculaData {
  id: string;
  pelicula: string;
  lanzamiento: number;
  genero: string;
  image:string;
}

export default function Pantalla4Screen({ navigation }: any) {
  const [uid, setuid] = useState("");
  const [datos, setdatos] = useState<PeliculaData[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuid(user.uid);
      } else {
        console.log("No hay usuario logueado");
      }
    });
  }, []);

  useEffect(() => {
    if (uid) {
      leer();
    }
  }, [uid]);
  
  function leer() {
    const peliculasRef = ref(db, `usuarios/${uid}/peliculas`);
    onValue(peliculasRef, (snapshot) => {
      const data = snapshot.val();
      let peliculas: PeliculaData[] = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          peliculas.push({
            id: key,
            pelicula: data[key].pelicula,
            lanzamiento: data[key].lanzamiento,
            genero: data[key].genero,
            image:data[key].image,
          });
        });
      }
      setdatos(peliculas);
    });
  }

  function eliminar(id: string) {
    remove(ref(db, `usuarios/${uid}/peliculas/${id}`))
      .then(() => {
        Alert.alert("Éxito", "La película ha sido eliminada correctamente.");
      })
      .catch((error) => {
        console.error("Error al eliminar:", error);
      });
  }

  function editar(item: PeliculaData) {
    navigation.navigate("EditarPelicula", {
      id: item.id,
      pelicula: item.pelicula,
      lanzamiento: item.lanzamiento,
      genero: item.genero,
      image:item.image
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎬 Lista de Películas</Text>
      {datos.length > 0 ? (
        datos.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.label}>🎞️ Título:</Text>
            <Text style={styles.value}>{item.pelicula}</Text>

            <Text style={styles.label}>📅 Lanzamiento:</Text>
            <Text style={styles.value}>{item.lanzamiento}</Text>

            <Text style={styles.label}>🎭 Género:</Text>
            <Text style={styles.value}>{item.genero}</Text>

            <Text style={styles.label}>🖼 Imagen:</Text>
            {item.image ? (
            <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <Text style={styles.value}>No hay imagen</Text>
              )}


            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => eliminar(item.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => editar(item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.loadingText}>Cargando...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#FF5252',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFA000',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loadingText: {
    textAlign: 'center',
    color: '#777',
    fontStyle: 'italic',
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  
});
