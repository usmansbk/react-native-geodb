# react-native-geodb
A simple and fully customizable GeoDB cities api component for iOS and Android React-Native apps

### Preview

![](https://raw.githubusercontent.com/usmansbk/react-native-geodb/master/Assets/screenshot.png

### Installation

1. ```npm install react-native-geodb --save``` or ```yarn add react-native-geodb```
2. Get your [GeoDB Cities API key](http://geodb-cities-api.wirefreethought.com/) and [subscribe](https://rapidapi.com/wirefreethought/api/GeoDB%20Cities/pricing) to the free basic plan.

### Example
```jsx
import GeoDBCitiesSearch from 'react-native-geodb';

<GeoDBCitiesSearch
  placeholder="Search cities"
  placeholderTextColor="#f5f5f5"
  onPress={(data) => console.log(data.city)}
  emptyListImagePlaceholder={require('../../../assets/emptyList.png')}
  query={{
    key: GEODB_API_KEY,
    api: 'cities'
  }}
  params={{
    language: 'en',
    limit: 10
  }}
  renderLeftButton={() => <CustomIconButton onPress={...}>}
  styles={{...}}
/>
```
### Props

| Prop | type | default |
| ---- | ---- | ------- |
| styles | object (StyleSheet) | {...} |
| debounce | number | 200 |
| minLength | number | 2 |
| query | object (Query) | {...} |
| params | object (Params) | key/value of GeoDB search url params |
| onPress | function | called on select search item |

## Query
| Key | Type | default |
| --- | ---- | ------- |
| api | string | "geo" |
| key | string | YOUR_API_KEY |
| version | string | "v1" |
| types | string | "cities" |

## Params
Checkout GeoDB guides for a complete list

| Key | Type | default |
| ---- | ---- | ------- |
| limit | number | 10 |
| languageCode | string | "en" |
| location | string | "lat,lon" |


### Styling

```GeoDBCitiesSearch``` can be easily customized to meet styles of your  app. Pass styles props to ```GeoDBCitiesSearch``` with style object for different elements (keys for style object are listed below)

| key | type |
| ---- | ---- |
| contentContainer | object (View) |
| textInputContainer | object (View style) |
| textInput | object (style) |
| itemContainer | object (Veiw style) |
| itemContent | object (View style) |
| itemText | object (Text style) |
| emptyList | object (View style) |
| loader | object (View style) |
| poweredContainer | object (View style) |
| powered | object (Image style) |
| poweredText | object (Text style) |
| separator | object (View style) |
| imagePlaceholder | object (Image style) |

### License

[MIT](LICENSE)

### Authors

- [Babakolo Usman Suleiman](https://www.twitter.com/usbkay)
