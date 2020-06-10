import React, {useState} from 'react';
import {FlatList, StyleSheet, Button, View, Text} from 'react-native';

import Server from './ListOfServers/server';
import Color from '../colors';

export function ListOfServers({servers, RemoveServer}) {
  const [refresh, setRefresh] = useState(false);

  const [showOptions, setShowOptions] = useState();

  function deleteServer() {
    RemoveServer(showOptions);
    setShowOptions();
  }

  function cancel() {
    setShowOptions();
  }

  return (
    <>
      <FlatList
        data={servers}
        ListEmptyComponent={() => (
          <Text style={styles.text}>
            Press the + to add a new Minecraft server
          </Text>
        )}
        onRefresh={() => {
          setRefresh(true);
          setTimeout(() => {
            setRefresh(false);
          }, 100);
        }}
        refreshing={refresh}
        renderItem={({item}) => (
          <Server
            host={item.host}
            port={item.port}
            refresh={refresh}
            setShowOptions={setShowOptions}
            id={item.id}
          />
        )}
        keyExtractor={(item, i) => 'pp_' + item.id + i}
      />
      {showOptions ? (
        <View style={styles.options}>
          <Text style={styles.title}>
            {
              servers.filter(item => {
                return item.id === showOptions;
              })[0].host
            }
          </Text>
          <Button style={styles.button} title="Delete" onPress={deleteServer} />
          <Button style={styles.button} title="Cancel" onPress={cancel} />
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  options: {
    position: 'absolute',
    top: 150,
    // bottom: 150,
    left: 50,
    right: 50,
    padding: 25,
    backgroundColor: Color.blue,
    borderRadius: 5,
  },
  button: {
    margin: 15,
    padding: 15,
  },
  title: {
    marginVertical: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginVertical: 50,
  },
});
