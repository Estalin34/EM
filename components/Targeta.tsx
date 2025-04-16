import { Alert, TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import React from 'react';

export default function Targeta(props:any){
    function detalles(titulo: string, anio: number, descripcion: string) {
        Alert.alert(titulo, "Año: " + anio + "\nDescripción: " + descripcion);
      }
    
      return (
        <TouchableOpacity
          onPress={() => detalles(
            props.peliculas.titulo,
            props.peliculas.anio, 
            props.peliculas.descripcion
          )}
        >
          <View>
            <Image 
              source={{ uri: props.peliculas.imagen }}
              style={styles.image}/>
            <Text>{props.peliculas.titulo}</Text>
            <Text >{props.peliculas.lanzamiento}</Text>
            <Text >{props.peliculas.descripcion}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    const styles = StyleSheet.create({
        image: {
            width: 140, 
            height: 140,
            borderRadius: 15, 
            marginBottom: 10, 
            resizeMode: 'cover', 
            alignSelf: 'center', 
            justifyContent: 'center', 
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333', 
            textAlign: 'center'
          },

    });