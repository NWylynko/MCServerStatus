/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import CircleButton from '../../components/CircleButton';
import StoreContext from '../../store';

export function AddServer({AddCallback}) {
  const [show, setShow] = useState(false);

  const [host, setHost] = useState('');
  const [port, setPort] = useState('25565');

  const {color} = useContext(StoreContext);

  function submit() {
    if (host) {
      AddCallback(host, port);
      setHost('');
      setPort('25565');
      setShow(false);
    }
  }

  function cancel() {
    setHost('');
    setPort('25565');
    setShow(false);
  }

  return (
    <>
      <CircleButton
        onPress={() => setShow(true)}
        style={{bottom: 50, right: 25}}>
        +
      </CircleButton>
      {show ? (
        <View style={[styles.container, {backgroundColor: color[1]}]}>
          <Text style={styles.title}>Add New Server</Text>
          <Text>IP</Text>
          <TextInput
            autoFocus
            autoCapitalize={'none'}
            autoCorrect={false}
            autoCompleteType={'off'}
            style={styles.input}
            placeholder="IP"
            onChangeText={text => setHost(text)}
            value={host}
          />
          <Text>Port</Text>
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            autoCompleteType={'off'}
            placeholder="Port"
            onChangeText={text => setPort(text)}
            value={port}
          />
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Button onPress={cancel} title="Cancel" />
            <Button onPress={submit} title="Add" disabled={!host} />
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    paddingHorizontal: 20,
    // paddingVertical: 10,
    paddingBottom: 10,
    paddingTop: 5,
    borderRadius: 100,
  },
  plus: {
    fontSize: 40,
  },
  container: {
    position: 'absolute',
    top: 150,
    // bottom: 150,
    left: 50,
    right: 50,
    padding: 25,
    borderRadius: 5,
  },
  input: {
    padding: 5,
    margin: 5,
    borderWidth: 1,
  },
  title: {
    marginVertical: 5,
    fontSize: 20,
    textAlign: 'center',
  },
});
