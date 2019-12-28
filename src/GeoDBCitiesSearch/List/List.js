import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  SafeAreaView,
  RefreshControl
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
    loading: false
  };

  _fetch = debounce((namePrefix) => {
    if (namePrefix.length < this.props.minLength) return;
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
    if (this.props.showActivityIndicator) this.setState({ loading: true });
    fetch(url, {
      method: 'GET',
      headers
    }).then(resonse => resonse.json())
    .then((json) => {
      if (window.LOG_LEVEL === 'DEBUG') console.log(json);
      const { data, errors, error, metadata } = json;
      this.setState({ data, metadata }, () => this.props.onResponse(json));
      const e = errors || error;
      if (e) this.props.onError(e);
      this.setState({ loading: false });
    })
    .catch(error => {
      this.setState({ loading: false });
      this.props.onError(error);
    });
  }, this.props.debounce);

  _getItemLayout = (_, index) => (
    {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index + SEPARATOR_HEIGHT,
      index
    }
  ); 
  
  _onChangeText = (value) => this.setState({ value }, () => this._fetch(value));

  _onRefresh = () => this.props.showActivityIndicator ? this._fetch(this.state.value) : null;

  _onPressItem = (data) => this.props.onSelectItem(data);

  _keyExtractor = (item) => String(item.id);

  _renderItem = ({ item }) => (
    <Item
      styles={this.props.styles}
      text={`${item.name}, ${item.countryCode}`}
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
    keyboardAppearance={this.props.keyboardAppearance}
    underlineColorAndroid={this.props.underlineColorAndroid}
    editable={this.props.editable}
    multiline={this.props.multiline}
    numberOfLines={this.props.numberOfLines}
    styles={this.props.styles}
    onChangeText={this._onChangeText}
    value={this.state.value}
    onSubmitEditing={this.props.onSubmitEditing}
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
    let _getItemLayout = this._getItemLayout;

    const {
      renderItem,
      getItemLayout,
      hidePoweredBy,
      hideTextInput,
      keyboardShouldPersistTaps,
      styles
    } = this.props;

    if (renderItem) {
      if (getItemLayout) {
        _getItemLayout = getItemLayout;
      } else {
        _getItemLayout = undefined;
      }
    }

    return (
      <SafeAreaView style={defaultStyles.contentContainer}>
        <FlatList
          contentContainerStyle={[
            defaultStyles.contentContainer,
            styles.contentContainer
          ]}
          refreshControl={<RefreshControl
            refreshing={this.state.loading}
            onRefresh={this._onRefresh}
            colors={this.props.colors || []}
          />}
          progressViewOffset={20}
          data={this.state.data}
          ListEmptyComponent={this._renderEmpty}
          ItemSeparatorComponent={this._renderSeparator}
          ListFooterComponent={hidePoweredBy ? undefined : this._renderFooter}
          ListHeaderComponent={hideTextInput ? undefined : this._renderHeader}
          renderItem={renderItem || this._renderItem}
          keyExtractor={this._keyExtractor}
          stickyHeaderIndices={hideTextInput ? undefined : [0]}
          getItemLayout={_getItemLayout}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        />
      </SafeAreaView>
    );
  }
}

List.defaultProps = {
  styles: {},
  debounce: 200,
  keyboardShouldPersistTaps: "always",
  keyboardAppearance: "default",
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
  onSelectItem: () => null,
  onError: console.log,
  multiline: false,
  numberOfLines: 1,
  hideTextInput: false,
  hidePoweredBy: false,
  editable: true,
  onSubmitEditing: () => null,
  onResponse: () => null,
  underlineColorAndroid: 'transparent',
  showActivityIndicator: false
};

List.propTypes = {
  styles: PropTypes.object,
  debounce: PropTypes.number,
  keyboardShouldPersistTaps: PropTypes.string,
  keyboardAppearance: PropTypes.string,
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
  ListEmptyComponent: PropTypes.elementType,
  onError: PropTypes.func,
  numberOfLines: PropTypes.number,
  hideTextInput: PropTypes.bool,
  editable: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  onResponse: PropTypes.func,
  underlineColorAndroid: PropTypes.string,
  hidePoweredBy: PropTypes.bool,
  multiline: PropTypes.bool,
  getItemLayout: PropTypes.func,
  showActivityIndicator: PropTypes.bool
};