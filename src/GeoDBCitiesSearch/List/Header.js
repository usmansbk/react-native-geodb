import React from 'react';
import {
  View,
  TextInput
} from 'react-native';
import defaultStyles from './styles';

export default ({
  styles={},
  value,
  placeholder="Search cities",
  autoFocus=true,
  onChangeText=() => null,
  clearButtonMode="while-editing",
  renderLeftButton: LeftButton = () => null,
  returnKeyType="search",
  placeholderTextColor
}) => (
  <View style={[
    defaultStyles.textInputContainer,
    styles.textInputContainer
  ]}>
    <LeftButton />
    <TextInput
      placeholderTextColor={placeholderTextColor}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoCorrect={false}
      onChangeText={onChangeText}
      clearButtonMode={clearButtonMode}
      returnKeyLabel={returnKeyType}
      returnKeyType={returnKeyType}
      value={value}
      style={[
        defaultStyles.textInput,
        styles.textInput
      ]}
    />
  </View>
);