import React from 'react';
import { 
  View,
  Image
} from 'react-native';
import defaultStyles from './styles';

export default ({ styles={}, source }) => (
  <View style={[
    defaultStyles.emptyList,
    styles.emptyList
  ]}>
    {
      !!source && (
        <Image
          resizeMode="contain"
          source={source}
          style={[
            defaultStyles.imagePlaceholder,
            styles.imagePlaceholder
          ]}
        />
      )
    }
  </View>
);