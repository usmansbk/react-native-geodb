import { StyleSheet } from 'react-native';
import {
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
  ITEM_HEIGHT,
  SEPARATOR_HEIGHT,
  backgroundColor
} from './constants';

export default StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor,
    height: HEADER_HEIGHT,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8
  },
  poweredContainer: {
    height: FOOTER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  poweredText: {
    marginHorizontal: 8,
    fontWeight: 'bold'
  },
  separator: {
    height: SEPARATOR_HEIGHT,
    backgroundColor
  },
  itemContainer: {
    height: ITEM_HEIGHT,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagePlaceholder: {
    height: 200,
    width: 200
  }
});