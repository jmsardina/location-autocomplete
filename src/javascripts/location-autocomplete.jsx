import React from 'react';
/* global google */

class LocationAutocomplete extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.geolocate.bind(this);
  }

  componentDidMount() {
    const autocompleteLibrary = document.getElementById('location-autocomplete-library');

    if (autocompleteLibrary) {
      if (this.constructor.libraryHasLoaded()) {
        this.initAutocomplete();
      } else {
        autocompleteLibrary.addEventListener('load',  () => { this.initAutocomplete(); });
      }
    } else if (this.constructor.libraryHasLoaded()) {
      this.initAutocomplete();
    } else {
      this.addAutocompleteLibrary();
    }
  }

  static libraryHasLoaded() {
    return typeof google !== 'undefined';
  }

  addAutocompleteLibrary() {
    const _this = this;
    let scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.id = 'location-autocomplete-library';
    if (this.props.googleAPIKey) {
      scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.googleAPIKey}&libraries=places&call`;
    } else if (this.props.googlePlacesLibraryURL) {
      scriptTag.src = this.props.googlePlacesLibraryURL;
    }

    (document.head || document.body).appendChild(scriptTag);

    scriptTag.addEventListener('load', () => { _this.initAutocomplete(); });
  }

  initAutocomplete() {
    let params = {};
    if (this.props.locationType)  params.types = [this.props.locationType];

    this.autocomplete = new google.maps.places.Autocomplete(this.input, params);
    this.autocomplete.addListener('place_changed', () => { this.props.onDropdownSelect(this); });
    this.props.targetArea && this.geolocate();
  }

  geolocate() {
    if (this.constructor.libraryHasLoaded()) {
      const _this = this;

      if (this.props.targetArea) {
        // eslint-disable-next-line no-undef
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: this.props.targetArea}, (results) => {
          const place = results[0].geometry.location;

          _this.setBounds(place);
        });
      }
    }
  }

  setBounds(position) {
    // eslint-disable-next-line no-undef
    const circle = new google.maps.Circle({
      center: position,
      radius: position.coords ? position.coords.accuracy : 100
    });

    this.autocomplete.setBounds(circle.getBounds());
  }

  filteredInputProps() {
    const keysToOmit = [
      'googleAPIKey',
      'googlePlacesLibraryURL',
      'onDropdownSelect',
      'locationType',
      'targetArea'
    ];

    return Object.keys(this.props)
      .filter(key => !keysToOmit.includes(key))
      .reduce((obj, key) => {
        obj[key] = this.props[key];
        return obj;
      }, {});
  }

  render() {
    const defaultInputProps = this.filteredInputProps();

    return (
      <input
        type='text'
        ref={(input) => { this.input = input; }}
        {...defaultInputProps}
      />
    );
  }
}

LocationAutocomplete.defaultProps = {
  placeholder: '' // overrides Google's default placeholder,
};

LocationAutocomplete.propTypes = {
  targetArea: React.PropTypes.string,
  locationType: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  onDropdownSelect: React.PropTypes.func.isRequired,
  googleAPIKey: React.PropTypes.string,
  googlePlacesLibraryURL: React.PropTypes.string
};

export default LocationAutocomplete;
