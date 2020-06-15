/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useCallback, useContext, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ping from './server/ping';
import StoreContext from '../../../store';

export default function Server({id, host, port, refresh, setShowOptions}) {
  const {serverData, setServerData, color, setPingData} = useContext(
    StoreContext,
  );
  const navigation = useNavigation();
  const [pinging, setPinging] = useState(true);
  const [softPinging, setSoftPinging] = useState(false); // to force a rerender after a silent ping

  useEffect(() => {
    if (refresh) {
      // the parent list can call a refresh of all items
      setPinging(true);
      _ping();
    }
  }, [refresh, _ping, setStatus]);

  useEffect(() => {
    _ping(); // ping when screen is first shown
    setPingData(state => {
      state[id] = [];
      return state;
    });
  }, [_ping, id, setPingData]);

  useEffect(() => {
    let autoPing = setInterval(() => {
      setSoftPinging(true);
      _ping();
    }, 60000);
    return () => {
      clearTimeout(autoPing);
    };
  }, [_ping]);

  const pressed = () => {
    if (!serverData[id]?.online) {
      setPinging(true);
      _ping();
    } else {
      navigation.navigate('Server', {id, host, port});
    }
  };

  const _ping = useCallback(async () => {
    try {
      const data = await Ping(host, parseInt(port, 10));
      setStatus(data);
      setPinging(false);
      setSoftPinging(false);
    } catch (data) {
      setStatus(data);
      setSoftPinging(false);
      setPinging(false);
    }
  }, [host, port, setStatus]);

  const setStatus = useCallback(
    (data = {}) => {
      setServerData(state => {
        state[id] = data;
        return state;
      });
    },
    [setServerData, id],
  );

  return (
    <TouchableOpacity
      style={[styles.container, {borderColor: color[1]}]}
      onLongPress={() => setShowOptions(id)}
      onPress={pressed}>
      <View style={[styles.horizontal, {width: '100%'}]}>
        <Text style={styles.title}>
          {host}
          {port !== '25565' && ':' + port}
          {softPinging && ''}
          {pinging && ' Pinging...'}
        </Text>

        {!pinging &&
          serverData[id] &&
          (serverData[id].online ? (
            <View style={styles.info}>
              <Text style={styles.online}>Online</Text>
              <Text style={styles.title}>
                {serverData[id].version.replace(/§[0-9a-z]/gi, '')}
              </Text>
              <Text style={styles.title}>{serverData[id].ping}ms</Text>
              <Text style={[styles.title, {}]}>
                {serverData[id].current_players}/{serverData[id].max_players}
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.offline}>Offline</Text>
              <Text>press to re-ping ↺</Text>
            </>
          ))}
      </View>
      {!pinging &&
        serverData[id] &&
        (serverData[id].online && (
          <>
            <View style={[styles.horizontal, styles.motd]}>
              <View style={{width: 50, height: 50}}>
                {serverData[id].icon && (
                  <Image
                    source={{uri: serverData[id].icon}}
                    style={{flex: 1, borderRadius: 2}}
                  />
                )}
              </View>

              {serverData[id].motd && <Motd motd={serverData[id].motd} />}
            </View>
            {serverData[id].players && (
              <Players players={serverData[id].players} />
            )}
          </>
        ))}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,
  },
  title: {
    margin: 5,
  },
  motd: {
    margin: 10,
  },
  online: {
    color: 'green',
    margin: 5,
  },
  offline: {
    color: 'red',
    margin: 5,
  },
  horizontal: {
    flexDirection: 'row',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function Motd({motd}) {
  return <Text style={styles.motd}>{motd.replace(/§[0-9a-z]/gi, '')}</Text>;
}

function Players({players}) {
  return (
    <Text>
      Players:{' '}
      {players.map(item => (
        <Text key={item.id}>{item.name.replace(/§[0-9a-z]/gi, '')}, </Text>
      ))}
    </Text>
  );
}
