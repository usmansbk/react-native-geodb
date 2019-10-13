import React from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';
import defaultStyles from './styles';

export default ({ styles={} }) => (
  <View style={[
    defaultStyles.poweredContainer,
    styles.poweredContainer
  ]}>
    <Image
      source={require('../img/logo.png')}
      style={styles.powered}
      height={30}
      width={30}
    />
    <Text style={[
      defaultStyles.poweredText,
      styles.poweredText,
    ]}>
      GeoDB Cities
    </Text>
  </View>
)