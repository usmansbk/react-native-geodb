# react-native-geodb
A simple and fully customizable GeoDB cities api component for iOS and Android React-Native apps

### Preview
<img width="200" alt="Screenshot_2019-10-13-02-46-32-488_com examples" src="https://user-images.githubusercontent.com/10219539/66710663-0a396180-ed75-11e9-94c1-d95ebb0e32eb.png"> <img width="200" alt="Screenshot_2019-10-13-02-46-43-816_com examples" src="https://user-images.githubusercontent.com/10219539/66710675-36ed7900-ed75-11e9-975f-7b4a57567e00.png"> <img width="200" alt="Screenshot_2019-10-13-00-43-13-468_com schdlr" src="https://user-images.githubusercontent.com/10219539/66710692-80d65f00-ed75-11e9-8151-822e9261a48d.png">



### Installation

1. ```npm install react-native-geodb --save``` or ```yarn add react-native-geodb```
2. Get your [GeoDB Cities API key](http://geodb-cities-api.wirefreethought.com/) and [subscribe](https://rapidapi.com/wirefreethought/api/GeoDB%20Cities/pricing) to the free basic plan.

> ...Or Use the Free Instance (without passing any API KEY)
> The free instance allows up to 432,000 requests/day. However, it has significantly less cities (only cities with populations of greater than 20,0000).

### Example
```jsx
import GeoDBCitiesSearch from 'react-native-geodb';

GeoDBCitiesSearch.init({key: GEODB_API_KEY}); // Set your rapidapi key

<GeoDBCitiesSearch
  debounce={200}
  placeholder="Search cities"
  placeholderTextColor="#f5f5f5"
  onSelectItem={(data) => console.log(data.city)}
  emptyListImagePlaceholder={require('../../../assets/emptyList.png')}
  query={{
    key: GEODB_API_KEY, // skip if you've set key already
    api: 'geo',
    types: 'cities'
  }}
  params={{
    language: 'en',
    limit: 10,
    offset: 0
  }}
  renderLeftButton={() => <CustomIconButton onPress={...}>}
  renderItem={({ item }) => <CustomSearchItem />}
  ListEmptyComponent={({ metadata, styles, source }) => <CustomEmptyList />}
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
| onSelectItem | function | not used if renderItem is defined |
| onError | function | console.log |
| onResponse | function | console.log |
| hideTextInput | boolean | false |
| hidePoweredBy | boolean | false |
| showActivityIndicator | boolean | false |
| colors | array | []

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
| poweredContainer | object (View style) |
| powered | object (Image style) |
| poweredText | object (Text style) |
| separator | object (View style) |
| imagePlaceholder | object (Image style) |

### Geocoder
```js
import { Geocoder } from 'react-native-geodb';

// Returns a promise of nearby cities of the given location object
Geocoder({ lat: xxxx, lng: xxxx }).then(response => {
  console.log(response);
});
```


### License

[MIT](LICENSE)

### Authors

- [Babakolo Usman Suleiman](https://www.twitter.com/usbkay)
