import React from 'react';
/* global google */

class LocationAutocomplete extends React.Component {
  componentDidMount() {
    const libraryScript = document.getElementById('location-autocomplete-library');

    if (this.libraryHasLoaded) {
      this.initAutocomplete();
    } else if (libraryScript) {
      libraryScript.addEventListener('load',  () => { this.initAutocomplete(); });
    } else {
      this.addAutocompleteLibrary();
    }
  }

  addAutocompleteLibrary() {
    const _this = this;
    let scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.id = 'location-autocomplete-library';
    if (this.props.googleAPIKey) {
      scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.googleAPIKey}&libraries=places`;
    } else if (this.props.googlePlacesLibraryURL) {
      scriptTag.src = this.props.googlePlacesLibraryURL;
    }

    (document.head || document.body).appendChild(scriptTag);

    scriptTag.addEventListener('load', () => { _this.initAutocomplete(); });
  }

  setRestrictions() {
    const { country } = this.props.componentRestrictions;
    if (country) this.autocomplete.setComponentRestrictions({ 'country': country });
  }

  initAutocomplete() {
    let params = {};
    if (this.props.locationType)  params.types = [this.props.locationType];

    this.autocomplete = new google.maps.places.Autocomplete(this.input, params);
    this.autocomplete.addListener('place_changed', () => { this.props.onDropdownSelect(this); });

    if (this.props.componentRestrictions) this.setRestrictions();
    this.props.targetArea && this.geolocate();
  }

  geolocate() {
    if (this.libraryHasLoaded) {
      if (this.props.targetArea) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: this.props.targetArea}, (results) => {
          const position = results[0].geometry.location;

          new google.maps.Circle({
            center: position,
            radius: position.coords ? position.coords.accuracy : 100
          });
        });
      }
    }
  }

  get libraryHasLoaded() {
    return typeof google !== 'undefined';
  }

  get filteredInputProps() {
    const keysToOmit = [
      'googleAPIKey',
      'googlePlacesLibraryURL',
      'onDropdownSelect',
      'locationType',
      'targetArea',
      'componentRestrictions'
    ];

    return Object.keys(this.props)
      .filter(key => !keysToOmit.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.props[key];
        return obj;
      }, {});
  }

  render() {
    return (
      <input
        type='text'
        ref={(input) => { this.input = input; }}
        {...this.filteredInputProps}
      />
    );
  }
}

LocationAutocomplete.defaultProps = {
  placeholder: '' // overrides Google's default placeholder
};

LocationAutocomplete.propTypes = {
  targetArea: React.PropTypes.string,
  locationType: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  onDropdownSelect: React.PropTypes.func.isRequired,
  googleAPIKey: React.PropTypes.string,
  googlePlacesLibraryURL: React.PropTypes.string,
  componentRestrictions: React.PropTypes.shape({
    country: React.PropTypes.arrayOf(React.PropTypes.string)
  })
};

export default LocationAutocomplete;
