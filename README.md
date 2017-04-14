# Location Autocomplete
LocationAutocomplete is a tested React component that introduces an input field with autocomplete functionality.  It leverages the Google Places API to provide a typeahead effect with address predictions, based on your established criteria.

### Features:
- configurable to:
  - [x] bias suggestions by "target area" or by current location (without restricting)
  - [x] provide suggestions by location type
  - [x] restrict results to up to five countries
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

Instantiate your component and set the properties that fit your needs:
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

- `onDropdownSelect` -- function to handle selection of dropdown option.  This will fire when the user clicks on one of the locations on the dropdown.  You can use this function to handle updates of multiple fields.

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
- Any attribute that's normally accepted on an input field (e.g. `name`, `disabled`, etc.).

- `targetArea` -- "City, State" to bias results to a specific geographic location.  If this value is not set, the component will bias results by current location. Note: Biasing results does not restrict. See `componentRestrictions` if you would like to return results only from a specific region.

- `locationType` -- String value used to restrict results to a specific location type.  For a complete list of supported types, visit [Google's API documentation](https://developers.google.com/places/supported_types).  When not set, the component will include all location types.

- componentRestrictions -- filter results by up to five countries.  Countries must be passed as as a two-character, ISO 3166-1 Alpha-2 compatible country code. Multiple countries must be passed as a list of country codes: `componentRestrictions={{ country: ['it'] }}`

### Example Usage:

```jsx
<!-- location-field.jsx -->
import React from 'react';
import LocationAutocomplete from 'location-autocomplete';

const LocationField = props => (
  <LocationAutocomplete
    onChange={() => {}}
    onDropdownSelect={() => {}}
    googleAPIKey={GOOGLE_API_KEY}
    className="location"
    {...props}
  />
);

export default LocationField;
```
```jsx
<!-- registration-form.jsx -->
import React from 'react';
import LocationField from 'src/location-field.jsx';

<!-- ... -->
<LocationField
  componentRestrictions={{ country: ['us', 'pr'] }}
  locationType="establishments"
/>
<!-- ... -->
```

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

Don't forget the following commands before committing!
```
$ npm run test
$ npm run lint:test
$ npm run lint
$ npm run build
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
