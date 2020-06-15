import React from 'react';
import {StoreProvider} from './store';
import MyStack from './navigator';

export default function App() {
  return (
    <StoreProvider>
      <MyStack />
    </StoreProvider>
  );
}
