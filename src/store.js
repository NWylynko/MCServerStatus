import React, {useState, createContext} from 'react';

const StoreContext = createContext(null);
export default StoreContext;

export const StoreProvider = ({children}) => {
  const [serverData, setServerData] = useState({});
  const [pingData, setPingData] = useState({});
  const [accent0, setAccent0] = useState('#fedc45'); // yellow
  const [accent1, setAccent1] = useState('lightblue'); // blue
  const [background, setBackground] = useState('#fff'); // blue

  console.log(serverData);

  const store = {
    serverData,
    setServerData,
    pingData,
    setPingData,
    color: {0: accent0, 1: accent1, background},
    setColor: {0: setAccent0, 1: setAccent1, setBackground},
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
