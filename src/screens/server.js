import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Details} from './server/Details';
import StoreContext from '../store';

const Tab = createMaterialTopTabNavigator();

export default function Server() {
  const route = useRoute();
  const {serverData, color} = useContext(StoreContext);

  const {online, current_players, max_players, ping} = serverData[
    route.params.id
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.horizontal}>
        <Text>{online ? 'Online' : 'Offline'}</Text>
        <Text>
          {current_players}/{max_players} players
        </Text>
        <Text>{ping}ms</Text>
      </View>
      <Tab.Navigator
        tabBarOptions={{indicatorStyle: {backgroundColor: color[1]}}}>
        <Tab.Screen name="Details">
          {() => <Details details={serverData[route.params.id]} />}
        </Tab.Screen>
        <Tab.Screen name="rcon" component={Rcon} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

function Rcon() {
  return <Text>wee wee</Text>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
