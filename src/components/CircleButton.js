import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Text from './Text';
import StoreContext from '../store';

export default function({onPress, children, style}) {
  const {color} = useContext(StoreContext);
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color[0]}, style]}
      onPress={onPress}>
      {typeof children === 'string' ? (
        <Text style={[styles.plus, {color: color.background}]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 5,
    borderRadius: 100,
  },
  plus: {
    fontSize: 40,
  },
});
