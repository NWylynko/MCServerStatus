/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

export function Details({details}) {
  return (
    <View style={styles.container}>
      {details.icon && (
        <View style={styles.imageContainer}>
          <Image source={{uri: details.icon}} style={styles.image} />
        </View>
      )}
      <Text style={{alignSelf: 'center', padding: 5, margin: 5}}>
        {details.motd.replace(/§[0-9a-z]/gi, '')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    borderRadius: 2,
    height: 128,
    width: 128,
    margin: 15,
    alignSelf: 'center',
  },
});
