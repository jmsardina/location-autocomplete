# Location Autocomplete
LocationAutocomplete is a tested React component that introduces an input field with autocomplete functionality.  It leverages the Google Places API to provide a typeahead effect with address predictions, based on your established criteria.

### Features:
- configurable to:
  - [x] bias suggestions by "target area" or by current location
  - [x] provide suggestions by location type
- allows multiple instances to be used on single page, without importing autocomplete library multiple times

### Usage:
Install the package:
```
$ npm install location-autocomplete --save
```

At the top of your `.jsx` file, import the component:
```jsx
import LocationAutocomplete from 'location-autocomplete';
```

Instantiate your component and set the styles to fit your needs:
```jsx
<LocationAutocomplete
  name="venue"
  placeholder="Venue Name"
  targetArea="New York, NY"
  locationType="(regions)"
  googleAPIKey="yourApiKey"
  onChange={() => {}}
  onDropdownSelect={() => {}}
/>
```

#### Required props:
- `googleAPIKey` OR `googlePlacesLibraryURL` -- Only ONE of these is required for autocomplete functionality.

- `onChange` -- function to handle field changes.  This will fire on each key strike.

- `onDropdownSelect` -- function to handle selection of dropdown option.  This will fire when the user clicks on one of the locations for the dropdown.  You can use this function to handle updates of multiple fields.  For example, if I have two address fields -- one for venue name and one for the full address, and both of them have autocomplete functionality, then `onDropdownSelect` function allows me to manage the logic of updating both fields, by providing the autocomplete object in the context of `this`.  To test this, set a debugger inside of your `onDropdownSelect` function and type `this`:

```js
onDropdownSelect(component) {
  // this will give you access to the entire location object, including
  // the `place_id` and `address_components`
  const place = component.autocomplete.getPlace();

  // this will return a reference to the input field
  const inputField = component.input;

  // other awesome stuff
}
```

Visit [Google's API documentation](https://developers.google.com/maps/web/) to get your Google API key.

#### Other permitted props:
- `name`
- `id`
- `placeholder`
- `className`
- `value`

- `targetArea` -- "City, State" to bias results to a specific geographic location.  If this value is not set, the component will bias results by current location.  It will do this by geolocating each time the user focuses on the field.

- `locationType` -- String value used to restrict results to a specific location type.  For a complete list of supported types, visit [Google's API documentation](https://developers.google.com/places/supported_types).

### Development:
Install dependencies:
```
$ npm install
```

Run tests in watch mode:
```
$ npm run test:watch
```

Run the linter:
```
$ npm run lint
```

Start the server:
```
$ npm run bundle && npm run serve
```

### Ways to Contribute:
1. __Create an [issue](https://github.com/jmsardina/location-autocomplete/issues)__
2. __Open a PR__

Recommended commit format:

```
Commit title

<What does this commit introduce?>

References:
<Issue number>
```
