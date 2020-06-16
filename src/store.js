import React, {useState, createContext, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {StatusBar} from 'react-native';

const StoreContext = createContext(null);
export default StoreContext;

export const StoreProvider = ({children}) => {
  const [serverData, setServerData] = useState({});
  const [pingData, setPingData] = useState({});
  const [playerData, setPlayerData] = useState({});
  const [accent0, setAccent0] = useState('#fedc45'); // yellow
  const [accent1, setAccent1] = useState('#add8e6'); // blue
  const [background, setBackground] = useState('#2C2D33'); // white
  const [text, setText] = useState('#F6F4F4'); // black
  const [lightMode, setLightMode] = useState(true);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const value = await AsyncStorage.getItem('theme');
        if (value !== null) {
          setLightMode(JSON.parse(value));
        }
      } catch (e) {
        console.error(e);
      }
    };
    getTheme();
  }, []);

  useEffect(() => {
    setBackground(lightMode ? '#F6F4F4' : '#2C2D33');
    setText(lightMode ? '#0A0903' : '#F6F4F4');
    StatusBar.setBarStyle(lightMode ? 'dark-content' : 'light-content');
    AsyncStorage.setItem('theme', JSON.stringify(lightMode));
  }, [lightMode]);

  const store = {
    serverData,
    setServerData,
    pingData,
    setPingData,
    playerData,
    setPlayerData,
    color: {0: accent0, 1: accent1, background, text},
    setColor: {0: setAccent0, 1: setAccent1, setBackground, setText},
    rerender,
    setRerender,
    lightMode,
    setLightMode,
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
