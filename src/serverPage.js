import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

export default function ServerPage() {
  const route = useRoute();
  return (
    <SafeAreaView style={styles.container}>
      <Text>{JSON.stringify(route.params)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
