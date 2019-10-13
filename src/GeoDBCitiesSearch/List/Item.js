import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import defaultStyles from './styles';


export default class Item extends React.Component {
  _onPress = () => this.props.onPress(this.props.data);

  shouldComponentUpdate = (nextProps) => this.props.text !== nextProps.text;

  render() {
    const {
      styles={},
      text
    } = this.props;

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={[
          defaultStyles.itemContainer,
          styles.itemContainer
        ]}>
          <View style={[
            defaultStyles.itemContent,
            styles.itemContent
          ]}>
            <Text style={[
              defaultStyles.itemText,
              styles.itemText
            ]}>{text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
