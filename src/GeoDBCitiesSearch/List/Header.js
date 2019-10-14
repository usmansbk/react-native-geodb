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
  placeholderTextColor,
  keyboardAppearance,
  numberOfLines,
  editable,
  onSubmitEditing,
  multiline
}) => (
  <View style={[
    defaultStyles.textInputContainer,
    styles.textInputContainer
  ]}>
    <LeftButton />
    <TextInput
      multiline={multiline}
      numberOfLines={numberOfLines}
      editable={editable}
      placeholderTextColor={placeholderTextColor}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoCorrect={false}
      onChangeText={onChangeText}
      clearButtonMode={clearButtonMode}
      returnKeyLabel={returnKeyType}
      returnKeyType={returnKeyType}
      keyboardAppearance={keyboardAppearance}
      onSubmitEditing={onSubmitEditing}
      value={value}
      style={[
        defaultStyles.textInput,
        styles.textInput
      ]}
    />
  </View>
);