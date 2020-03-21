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
      style={styles.container}
      onLongPress={() => setShowOptions(id)}>
      <View style={[styles.horizontal, {width: '100%'}]}>
        <Text style={styles.title}>
          {host}
          {port === '25565' ? null : ':' + port}
        </Text>

        {status ? (
          status.online ? (
            <View style={styles.info}>
              <Text style={styles.online}>Online</Text>
              <Text style={styles.title}>{status.version}</Text>
              <Text style={styles.title}>{status.ping}ms</Text>
              <Text style={[styles.title, {}]}>
                {status.current_players}/{status.max_players}
              </Text>
            </View>
          ) : (
            <Text style={styles.offline}>Offline</Text>
          )
        ) : null}
      </View>
      <View style={[styles.horizontal, styles.motd]}>
        <View style={{width: 50, height: 50}}>
          {status ? (
            status.icon ? (
              <Image
                source={{uri: status.icon}}
                style={{flex: 1, borderRadius: 2}}
              />
            ) : null
          ) : null}
        </View>

        <Text style={styles.motd}>{status ? status.motd : 'Loading...'}</Text>
      </View>
      <Text>
        Players:{' '}
        {status
          ? status.players
            ? status.players.map(item => (
                <Text key={item.id}>{item.name}, </Text>
              ))
            : null
          : null}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
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
