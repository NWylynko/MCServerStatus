import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Ping from './ping';

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
      <View style={styles.topbar}>
        <Text style={styles.title}>
          {host}
          {port === '25565' ? null : ':' + port}
        </Text>

        {status ? (
          status.online ? (
            <Text style={styles.online}>Online</Text>
          ) : (
            <Text style={styles.offline}>Offline</Text>
          )
        ) : null}

        {status ? (
          status.online ? (
            <Text style={styles.title}>
              {status.current_players}/{status.max_players}
            </Text>
          ) : null
        ) : null}

        {status ? (
          status.online ? (
            <Text style={styles.title}>{status.ping}ms</Text>
          ) : null
        ) : null}
      </View>
      <Text style={styles.motd}>{status ? status.motd : 'Loading...'}</Text>
      {/* <Text>{JSON.stringify(status)}</Text> */}
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
    margin: 15,
  },
  online: {
    color: 'green',
    margin: 5,
  },
  offline: {
    color: 'red',
    margin: 5,
  },
  topbar: {
    flexDirection: 'row',
  },
});
