/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Image, StyleSheet, Dimensions, ScrollView} from 'react-native';
import StoreContext from '../../store';
import Text from '../../components/Text';

import {LineChart} from 'react-native-chart-kit';

export function Details({details, id}) {
  const {pingData, playerData} = useContext(StoreContext);
  return (
    <ScrollView style={styles.container}>
      {details.icon && (
        <View style={styles.imageContainer}>
          <Image source={{uri: details.icon}} style={styles.image} />
        </View>
      )}
      <Text style={{alignSelf: 'center', padding: 5, margin: 5}}>
        {details.motd.replace(/§[0-9a-z]/gi, '')}
      </Text>
      <Text style={{marginLeft: 15}}>Players</Text>
      <Chart data={playerData[id]} />
      <Text style={{marginLeft: 15}}>Ping</Text>
      <Chart data={pingData[id]} suffix="ms" />
    </ScrollView>
  );
}

function Chart({data, suffix = ''}) {
  const {color} = useContext(StoreContext);
  return (
    <LineChart
      data={{
        datasets: [
          {
            data,
          },
        ],
      }}
      withInnerLines={false}
      width={Dimensions.get('window').width} // from react-native
      height={220}
      yAxisSuffix={suffix}
      chartConfig={{
        backgroundGradientFrom: color.background,
        backgroundGradientTo: color.background,
        decimalPlaces: 0,
        color: () => color[1],
        labelColor: () => color.text,
        propsForDots: {
          r: '0',
        },
      }}
      bezier
      style={{
        margin: 8,
        borderRadius: 0,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'flex-start',
    // flexDirection: 'column',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    borderRadius: 2,
    height: 64,
    width: 64,
    margin: 15,
    alignSelf: 'center',
  },
});
