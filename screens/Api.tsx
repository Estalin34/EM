import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Targeta from '../components/Targeta';

export default function Api() {
    const [data, setData] = useState<any[]>([]);
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      try {
        const resp = await fetch('https://jritsqmet.github.io/web-api/peliculas3.json');
        const json = await resp.json();
        setData(json.peliculas); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <View >
        <Text >Apis</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Targeta peliculas={item} />}
        />
      </View>
    );
  }

const styles = StyleSheet.create({})