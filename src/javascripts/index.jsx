/* eslint-disable no-unused-vars */
import React from 'react';
import LocationAutocomplete from './location-autocomplete.jsx';
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom';

// eslint-disable-nextline no-unused-vars
const LocationField = props => (
  <LocationAutocomplete
    onChange={() => {}}
    onDropdownSelect={() => {}}
    googleAPIKey="yourApiKey"
    className="location"
    {...props}
  />
);

// This file is for development only.  Feel free to pass in different props such
// as locationType and targetArea to see how these affect the results.
ReactDOM.render(
  <div>
   <h4>Biased to Brusick Township, NJ</h4>
   <small>Favors results near the above area, but will not exclude those outside of that neighborhood.</small>
    <LocationField
      targetArea="North Brunswick Township, NJ"
      placeholder='Search in your current location.'
    />

    <h4>Restricted to establishments Italy</h4>
    <small>Returns only establishments in Italy.</small>
    <LocationField
      componentRestrictions={{ country: ['it'] }}
      placeholder='Search places in Rome, Italy.'
      locationType='establishment'
    />

    <h4>Biased to current location</h4>
    <small>Returns all location types, favoring locations near you.</small>
    <LocationField
      placeholder='Search all location types.'
    />
  </div>,
  document.getElementById('container')
);
