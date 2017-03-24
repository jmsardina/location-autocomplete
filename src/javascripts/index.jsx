import React from 'react';
import ReactDOM from 'react-dom';
import LocationAutocomplete from './location-autocomplete.jsx';

ReactDOM.render(
  <div>
    <LocationAutocomplete
      onChange={()=> {console.log('input changed')}}
      onDropdownSelect={()=>{console.log('selected')}}
      googleAPIKey="replaceWithAPIKey"
    />
    <LocationAutocomplete
      onChange={()=>{()=> {console.log('input changed')}}}
      onDropdownSelect={()=>{console.log('selected')}}
      googleAPIKey="replaceWithAPIKey"
    />
    <LocationAutocomplete
      onChange={()=>{()=> {console.log('input changed')}}}
      onDropdownSelect={()=>{console.log('selected')}}
      googleAPIKey="replaceWithAPIKey"
    />
    <LocationAutocomplete
      onChange={()=>{()=> {console.log('input changed')}}}
      onDropdownSelect={()=>{console.log('selected')}}
      googleAPIKey="replaceWithAPIKey"
    />
  </div>,
  document.getElementById('container')
);
