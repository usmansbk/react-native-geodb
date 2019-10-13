import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  SafeAreaView
} from 'react-native';
import debounce from 'lodash.debounce';
import Item from './Item';
import Header from './Header';
import Footer from './Footer';
import Separator from './Separator';
import Empty from './Empty';
import defaultStyles from './styles';
import { ITEM_HEIGHT, SEPARATOR_HEIGHT } from './constants'; 
import { buildURL } from '../utils';
import {
  FREE_END_POINT,
  DEFAULT_HOST
} from '../env';

export default class List extends React.Component {

  state = {
    value: '',
    currentOffSet: null,
    loading: false,
    data: [],
    metadata: {},
  };

  _fetch = debounce((namePrefix) => {
    const {
      query,
      params
    } = this.props;
    const HOST = query.key ? DEFAULT_HOST : FREE_END_POINT;
    const url = buildURL(query, params, namePrefix);
    const headers = {
      "x-rapidapi-host": HOST,
      "x-rapidapi-key": query.key 
    };

    fetch(url, {
      method: 'GET',
      headers
    }).then(resonse => resonse.json())
    .then(({ data, errors, metadata }) => {
      this.setState({ data, metadata });
      if (errors) console.log(errors)
    })
    .catch(console.log);
  }, this.props.debounce);

  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  ); 
  
  _onChangeText = (value) => this.setState({ value }, () => {
    if (value.length >= this.props.minLength) this._fetch(value)
  });

  _onPressItem = (data) => this.props.onSelectItem(data);

  _keyExtractor = (item) => String(item.id);

  _renderItem = ({ item }) => (
    <Item
      styles={this.props.styles}
      text={item.name}
      onPress={this._onPressItem}
      data={item}
    />
  );

  _renderHeader = () => <Header
    renderLeftButton={this.props.renderLeftButton}
    placeholder={this.props.placeholder}
    placeholderTextColor={this.props.placeholderTextColor}
    autoFocus={this.props.autoFocus}
    clearButtonMode={this.props.clearButtonMode}
    returnKeyType={this.props.returnKeyType}
    styles={this.props.styles}
    onChangeText={this._onChangeText}
    value={this.state.value}
  />;

  _renderFooter = () => <Footer styles={this.props.styles} />;
  
  _renderSeparator = () => <Separator styles={this.props.styles} />;

  _renderEmpty = () => {
    const { ListEmptyComponent, styles } = this.props;
    let Component = Empty;
    if (ListEmptyComponent) Component = ListEmptyComponent;
    return <Component
      source={this.props.emptyListImagePlaceholder}
      metadata={this.state.metadata}
      styles={styles}
    />;
  };

  render() {
    return (
      <SafeAreaView style={defaultStyles.contentContainer}>
        <FlatList
          contentContainerStyle={[
            defaultStyles.contentContainer,
            this.props.styles.contentContainer
          ]}
          data={this.state.data}
          ListEmptyComponent={this._renderEmpty}
          ItemSeparatorComponent={this._renderSeparator}
          ListFooterComponent={this._renderFooter}
          ListHeaderComponent={this._renderHeader}
          renderItem={this.props.renderItem || this._renderItem}
          keyExtractor={this._keyExtractor}
          stickyHeaderIndices={[0]}
          getItemLayout={this._getItemLayout}
          keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
        />
      </SafeAreaView>
    );
  }
}

List.defaultProps = {
  styles: {},
  debounce: 200,
  keyboardShouldPersistTaps: "always",
  minLength: 2,
  returnKeyType: "search",
  placeholder: "Search cities",
  autoFocus: true,
  clearButtonMode: "while-editing",
  params: {
    limit: 10,
    languageCode: "en"
  },
  query: {},
  onSelectItem: () => null
};

List.propTypes = {
  styles: PropTypes.object,
  debounce: PropTypes.number,
  keyboardShouldPersistTaps: PropTypes.string,
  minLength: PropTypes.number,
  returnKeyType: PropTypes.string,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  clearButtonMode: PropTypes.string,
  renderLeftButton: PropTypes.elementType,
  renderItem: PropTypes.elementType,
  query: PropTypes.object,
  params: PropTypes.object,
  onSelectItem: PropTypes.func,
  placeholderTextColor: PropTypes.string,
  emptyListPlaceholder: PropTypes.object,
  ListEmptyComponent: PropTypes.elementType
};