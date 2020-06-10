/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

import Ping from './server/ping';

export default function Server({id, host, port, refresh, setShowOptions}) {
  const [status, setStatus] = useState();

  useEffect(() => {
    if (refresh) {
      setStatus();
      Ping(host, parseInt(port, 10))
        .then(setStatus)
        .catch(setStatus);
    }
  }, [host, port, refresh]);

  useEffect(() => {
    if (!status) {
      setStatus();
      Ping(host, parseInt(port, 10))
        .then(setStatus)
        .catch(setStatus);
    }
  }, [host, port, status]);

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: randomPascalColor()}]}
      onLongPress={() => setShowOptions(id)}>
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
            <Text style={styles.offline}>Offline</Text>
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

function randomPascalColor() {
  let min = 220;
  let max = 250;
  return `rgb(${random(min, max)}, ${random(min, max)}, ${random(min, max)})`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
