/* eslint-disable no-unused-vars */
import React from 'react';
import LocationAutocomplete from './location-autocomplete.jsx';
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom';

// This file is for development only.  Feel free to pass in different props such
// as locationType and targetArea to see how these affect the results.
ReactDOM.render(
  <div>
   <h4>Biased to Brusick Township, NJ</h4>
    <LocationAutocomplete
      onChange={() =>{}}
      onDropdownSelect={()=>{ }}
      googleAPIKey='replaceWithAPIKey'
      className='location'
      targetArea="North Brunswick Township, NJ"
      placeholder='Search in your current location.'
    />

    <h4>Biased to establishments Rome, Italy</h4>
    <LocationAutocomplete
      onChange={() =>{}}
      onDropdownSelect={()=>{ }}
      targetArea='Rome, Italy'
      googleAPIKey='replaceWithAPIKey'
      className='location'
      placeholder='Search places in Rome, Italy.'
      locationType='establishment'
    />

    <h4>Biased based on current location</h4>
    <LocationAutocomplete
      onChange={()=>{ }}
      onDropdownSelect={()=>{ }}
      googleAPIKey='replaceWithAPIKey'
      className='location'
      placeholder='Search all location types.'
    />

    <h4>Biased to regions around New York City</h4>
    <LocationAutocomplete
      onChange={()=>{ }}
      onDropdownSelect={()=>{ }}
      googleAPIKey='replaceWithAPIKey'
      className='location'
      locationType='(regions)'
      targetArea='New York City, NY'
      placeholder='Search regions around New York City.'
    />
  </div>,
  document.getElementById('container')
);
