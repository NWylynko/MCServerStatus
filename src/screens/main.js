import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {ListOfServers} from './main/ListOfServers';
import {AddServer} from './main/AddServer';

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
    const newData = data.filter(item => {
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
      <ListOfServers servers={data} RemoveServer={RemoveServerCallback} />
      <AddServer AddCallback={AddServerCallback} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
