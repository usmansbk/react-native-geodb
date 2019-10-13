import React from 'react';
import { View } from 'react-native';
import defaultStyles from './styles';

export default ({ styles={} }) => (
  <View
    style={[
      defaultStyles.separator,
      styles.separator
    ]}
  />
);