import React from "react";

class LocationAutocomplete extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.geolocate = this.geolocate.bind(this);
  }

  componentDidMount() {
    const autocompleteLibrary = document.getElementById("location-autocomplete-library");

    if (autocompleteLibrary) {
      if (this.constructor.libraryHasLoaded()) {
        this.initAutocomplete();
      } else {
        autocompleteLibrary.addEventListener("load",  () => { this.initAutocomplete(); });
      }
    } else if (this.constructor.libraryHasLoaded()) {
      this.initAutocomplete();
    } else {
      this.addAutocompleteLibrary();
    }
  }

  static libraryHasLoaded() {
    return typeof google !== "undefined";
  }

  addAutocompleteLibrary() {
    const _this = this;
    let scriptTag = document.createElement("script");
    scriptTag.type = "text/javascript";
    scriptTag.id = "location-autocomplete-library";
    if (this.props.googleAPIKey) {
      scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.googleAPIKey}&libraries=places&call`;
    } else if (this.props.googlePlacesLibraryURL) {
      scriptTag.src = this.props.googlePlacesLibraryURL;

    }
    (document.head || document.body).appendChild(scriptTag);

    scriptTag.addEventListener("load", () => { _this.initAutocomplete(); });
  }

  initAutocomplete() {
    // eslint-disable-next-line no-undef
    this.autocomplete = new google.maps.places.Autocomplete(this.input, { types: [this.props.locationType] });
    this.autocomplete.addListener("place_changed", this.props.onDropdownSelect);
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

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        id={this.props.id}
        placeholder={this.props.placeholder}
        className={`${this.props.className} location-field-autocomplete-component`}
        ref={(input) => { this.input = input; }}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

LocationAutocomplete.defaultProps = {
  locationType: "geocode",
  placeholder: '' // overrides Google's default placeholder
};

LocationAutocomplete.propTypes = {
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string,
  value: React.PropTypes.string,
  targetArea: React.PropTypes.string,
  locationType: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  onDropdownSelect: React.PropTypes.func.isRequired,
  googleAPIKey: React.PropTypes.string,
  googlePlacesLibraryURL: React.PropTypes.string
};

export default LocationAutocomplete;
