# Location Autocomplete
LocationAutocomplete is a tested React component that introduces an input field with autocomplete functionality.  It leverages the Google Places API to provide a typeahead effect with address predictions, based on your established criteria.

### Features:
- configurable to:
  - [x] bias suggestions by "target area" or by current location
  - [x] provide suggestions by location type
- allows multiple instances to be used on single page, without importing autocomplete library multiple times

### Usage:
Install the package by running `npm install location-autocomplete`.

`import LocationAutocomplete from 'location-autocomplete';`

Simply use the component and set the styles to fit your needs:
```jsx
<LocationAutocomplete
  onChange={}
  handleDropdownSelect={}
/>
```

__Required props:__
- `onChange` (function)
- `handleDropdownSelect` (function)

__Required for autocomplete functionality:__
`googleAPIKey` OR `googlePlacesLibraryURL`

__Other permitted props:__
- `name`
- `id`
- `placeholder`
- `classNames`
- `style`
- `value`
- `targetArea`
- `locationType`
- `googleAPIKey`
- `googlePlacesLibraryURL`

To bias address predictions to a specific area, set `targetArea` to a city, state:
```jsx
<LocationAutocomplete
  onChange={}
  handleDropdownSelect={}
  targetArea="New York, NY"
/>
```
If `targetArea` is not set, the component will bias results by `currentLocation`.

To return a specific address type, set `locationType` to a supported location type.  For a list of all supported types, visit [supported types](https://developers.google.com/places/supported_types)

### Development:
__Available Commands:__
- `npm run test`
- `npm run serve`
- `npm run lint`

__Installing dependencies:__
After cloning the repo, `cd` into directory and run `npm install`.

__Running the server:__
1. Create an `index.html` file to mount your component:
```html
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="container" />
    <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
  </body>
</html>
```

2. For the purpose of testing locally, you can use `location-autocomplete.jsx` to mount the component.  At the top of `index.js`, import React DOM, which will allow us to mount the component:
```jsx
import ReactDOM from 'react-dom;'
```

Using `ReactDOM`, you can render the component, or multiple instances of the component.

### Contribute:
1. Follow the steps under Development.
2. Create an issue if one doesn't exist already.
3. In your commit message, include `Reference` as a footer to include the issue number:

```
Commit title

<What does this commit introduce?>

References:
<Issue number>
```
4. Open a PR.
