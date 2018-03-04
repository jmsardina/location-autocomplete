'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global google */

var LocationAutocomplete = function (_React$Component) {
  _inherits(LocationAutocomplete, _React$Component);

  function LocationAutocomplete() {
    _classCallCheck(this, LocationAutocomplete);

    return _possibleConstructorReturn(this, (LocationAutocomplete.__proto__ || Object.getPrototypeOf(LocationAutocomplete)).apply(this, arguments));
  }

  _createClass(LocationAutocomplete, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var libraryScript = this.existingLibraryScript;

      if (this.libraryHasLoaded) {
        this.initAutocomplete();
      } else if (libraryScript) {
        libraryScript.addEventListener('load', function () {
          _this3.initAutocomplete();
        });
      } else {
        this.addAutocompleteLibrary();
      }
    }
  }, {
    key: 'addAutocompleteLibrary',
    value: function addAutocompleteLibrary() {
      var _this = this;
      var scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.id = 'location-autocomplete-library';
      if (this.props.googleAPIKey) {
        scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.props.googleAPIKey + '&libraries=places';
      } else if (this.props.googlePlacesLibraryURL) {
        scriptTag.src = this.props.googlePlacesLibraryURL;
      }

      (document.head || document.body).appendChild(scriptTag);

      scriptTag.addEventListener('load', function () {
        _this.initAutocomplete();
      });
    }
  }, {
    key: 'setRestrictions',
    value: function setRestrictions() {
      var country = this.props.componentRestrictions.country;

      if (country) this.autocomplete.setComponentRestrictions({ 'country': country });
    }
  }, {
    key: 'initAutocomplete',
    value: function initAutocomplete() {
      var _this4 = this;

      var params = {};
      if (this.props.locationType) params.types = [this.props.locationType];

      this.autocomplete = new google.maps.places.Autocomplete(this.input, params);
      this.autocomplete.addListener('place_changed', function () {
        _this4.props.onDropdownSelect(_this4);
      });

      if (this.props.componentRestrictions) this.setRestrictions();
      this.props.targetArea && this.geolocate();
    }
  }, {
    key: 'geolocate',
    value: function geolocate() {
      if (this.libraryHasLoaded) {
        if (this.props.targetArea) {
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: this.props.targetArea }, function (results) {
            var position = results[0].geometry.location;

            new google.maps.Circle({
              center: position,
              radius: position.coords ? position.coords.accuracy : 100
            });
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement('input', _extends({
        type: 'text',
        ref: function ref(input) {
          _this5.input = input;
        }
      }, this.filteredInputProps));
    }
  }, {
    key: 'libraryHasLoaded',
    get: function get() {
      return typeof google !== 'undefined';
    }
  }, {
    key: 'filteredInputProps',
    get: function get() {
      var _this6 = this;

      var keysToOmit = ['googleAPIKey', 'googlePlacesLibraryURL', 'onDropdownSelect', 'locationType', 'targetArea', 'componentRestrictions'];

      return Object.keys(this.props).filter(function (key) {
        return !keysToOmit.includes(key);
      }).reduce(function (obj, key) {
        obj[key] = _this6.props[key];
        return obj;
      }, {});
    }
  }, {
    key: 'existingLibraryScript',
    get: function get() {
      return document.getElementById('location-autocomplete-library') || document.querySelectorAll('script[src*="maps.googleapis.com/maps/api/js"]')[0];
    }
  }]);

  return LocationAutocomplete;
}(_react2.default.Component);

LocationAutocomplete.defaultProps = {
  placeholder: '' // overrides Google's default placeholder
};

LocationAutocomplete.propTypes = {
  targetArea: _propTypes2.default.string,
  locationType: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  onDropdownSelect: _propTypes2.default.func.isRequired,
  googleAPIKey: _propTypes2.default.string,
  googlePlacesLibraryURL: _propTypes2.default.string,
  componentRestrictions: _propTypes2.default.shape({
    country: _propTypes2.default.arrayOf(_propTypes2.default.string)
  })
};

exports.default = LocationAutocomplete;
