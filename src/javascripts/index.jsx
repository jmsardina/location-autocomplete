/* eslint-disable no-unused-vars */
import React from 'react';
import LocationAutocomplete from './location-autocomplete.jsx';
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom';

// This file is for development only.  Feel free to pass in different props such
// as locationType and targetArea to see how these affect the results.
ReactDOM.render(
  <div>
   <h4>Biased to Current Location</h4>
    <LocationAutocomplete
      onChange={() =>{}}
      onDropdownSelect={()=>{ }}
      googleAPIKey='replaceWithAPIKey'
      className='location'
      placeholder='Search in your current location.'
    />

    <h4>Biased to Rome, Italy</h4>
    <LocationAutocomplete
      onChange={() =>{}}
      onDropdownSelect={()=>{ }}
      targetArea='Rome, Italy'
      googleAPIKey='replaceWithAPIKey'
      className='location'
      placeholder='Search places in Rome, Italy.'
    />

    <h4>Set to return all location types</h4>
    <LocationAutocomplete
      onChange={()=>{ }}
      onDropdownSelect={()=>{ }}
      googleAPIKey='replaceWithAPIKey'
      className='location'
      placeholder='Search all location types.'
    />

    <h4>Set to return regions around New York City</h4>
    <LocationAutocomplete
      onChange={()=>{ }}
      onDropdownSelect={()=>{ }}
      googleAPIKey='replaceWithAPIKey'
      className='location'
      locationType='(regions)'
      targetArea='New York City, NY'
      placeholder='Search only regions in New York City.'
    />
  </div>,
  document.getElementById('container')
);
