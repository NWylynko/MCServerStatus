import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import App from './App';
import ServerPage from './serverPage';

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="List"
          component={App}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Server"
          component={ServerPage}
          options={({route}) => ({
            title: route.params.host,
            headerTintColor: route.params.online ? 'green' : 'red',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
