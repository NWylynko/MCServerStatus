import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {ListOfServers} from './App/ListOfServers';
import {AddServer} from './App/AddServer';

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('server_list');
        if (value !== null) {
          setData(JSON.parse(value));
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, []);

  async function AddServerCallback(host, port) {
    const newData = data.concat({host, port, id: data.length + 1});

    setData(newData);

    try {
      await AsyncStorage.setItem('server_list', JSON.stringify(newData));
    } catch (err) {
      console.warn(err);
    }
  }

  async function RemoveServerCallback(id) {
    const newData = await data.filter(item => {
      return item.id !== id;
    });

    try {
      await AsyncStorage.setItem('server_list', JSON.stringify(newData));
    } catch (err) {
      console.warn(err);
    }

    setData(newData);
  }

  return (
    <SafeAreaView style={styles.container}>
      {data.length ? (
        <ListOfServers servers={data} RemoveServer={RemoveServerCallback} />
      ) : (
        <Text style={styles.text}>
          Press the + to add a new Minecraft server
        </Text>
      )}
      <AddServer AddCallback={AddServerCallback} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginVertical: 50,
  },
});
