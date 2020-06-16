import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StoreContext from './store';

import Main from './screens/main';
import ServerPage from './screens/server';
import Settings from './screens/settings';

const Stack = createStackNavigator();

export default function MyStack() {
  const {serverData, color} = useContext(StoreContext);
  const MyTheme = {
    dark: color.lightMode,
    colors: {
      primary: color.text,
      background: color.background,
      card: color.background,
      text: color.text,
      border: color.background,
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Server"
          component={ServerPage}
          options={({route}) => ({
            title: `${route.params.host}${
              route.params.port !== '25565' ? ':' + route.params.port : ''
            }`,
            headerTintColor: serverData[route.params.id].online
              ? 'green'
              : 'red',
          })}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
