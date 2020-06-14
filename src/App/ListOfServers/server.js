/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import Ping from './server/ping';
import Colors from '../../colors';

export default function Server({id, host, port, refresh, setShowOptions}) {
  const [status, setStatus] = useState();

  useEffect(() => {
    if (refresh) {
      _ping();
    }
  }, [refresh, _ping]);

  useEffect(() => {
    if (!status) {
      _ping();
    }
  }, [status, _ping]);

  const pressed = () => {
    if (!status?.online) {
      _ping();
    }
  };

  const _ping = useCallback(() => {
    setStatus();
    Ping(host, parseInt(port, 10))
      .then(setStatus)
      .catch(setStatus);
  }, [host, port]);

  return (
    <TouchableOpacity
      style={styles.container}
      onLongPress={() => setShowOptions(id)}
      onPress={pressed}>
      <View style={[styles.horizontal, {width: '100%'}]}>
        <Text style={styles.title}>
          {host}
          {port !== '25565' && ':' + port}
          {!status && ' Pinging...'}
        </Text>

        {status &&
          (status.online ? (
            <View style={styles.info}>
              <Text style={styles.online}>Online</Text>
              <Text style={styles.title}>
                {status.version.replace(/§[0-9a-z]/gi, '')}
              </Text>
              <Text style={styles.title}>{status.ping}ms</Text>
              <Text style={[styles.title, {}]}>
                {status.current_players}/{status.max_players}
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.offline}>Offline</Text>
              <Text>press to re-ping ↺</Text>
            </>
          ))}
      </View>
      {status &&
        (status.online && (
          <>
            <View style={[styles.horizontal, styles.motd]}>
              <View style={{width: 50, height: 50}}>
                {status.icon && (
                  <Image
                    source={{uri: status.icon}}
                    style={{flex: 1, borderRadius: 2}}
                  />
                )}
              </View>

              {status.motd && <Motd motd={status.motd} />}
            </View>
            {status.players && <Players players={status.players} />}
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
    borderColor: Colors.blue,
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
