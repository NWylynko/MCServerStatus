import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StoreContext from './store';
import Main from './screens/main';
import ServerPage from './screens/server';

const Stack = createStackNavigator();

export default function MyStack() {
  const {serverData} = useContext(StoreContext);
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
