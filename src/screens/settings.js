import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Switch, View} from 'react-native';
import StoreContext from '../store';
import Text from '../components/Text';

export default function Server() {
  const {lightMode, setLightMode} = useContext(StoreContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.horizontal}>
        <Text style={styles.text}>
          toggle to {lightMode ? 'dark' : 'light'} mode
        </Text>
        <Switch
          onValueChange={() => setLightMode(state => !state)}
          value={!lightMode}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    // justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 24,
  },
});
