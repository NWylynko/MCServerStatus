import React, {useContext} from 'react';
import {Text} from 'react-native';
import StoreContext from '../store';

export default function(props) {
  const {color} = useContext(StoreContext);
  return <Text {...props} style={[{color: color.text}, props.style]} />;
}
