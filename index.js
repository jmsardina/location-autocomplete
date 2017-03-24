'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationAutocomplete = function (_React$Component) {
  _inherits(LocationAutocomplete, _React$Component);

  function LocationAutocomplete(props, context) {
    _classCallCheck(this, LocationAutocomplete);

    var _this2 = _possibleConstructorReturn(this, (LocationAutocomplete.__proto__ || Object.getPrototypeOf(LocationAutocomplete)).call(this, props, context));

    _this2.geolocate.bind(_this2);
    return _this2;
  }

  _createClass(LocationAutocomplete, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var autocompleteLibrary = document.getElementById('location-autocomplete-library');

      if (autocompleteLibrary) {
        if (this.constructor.libraryHasLoaded()) {
          this.initAutocomplete();
        } else {
          autocompleteLibrary.addEventListener('load', function () {
            _this3.initAutocomplete();
          });
        }
      } else if (this.constructor.libraryHasLoaded()) {
        this.initAutocomplete();
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
        scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.props.googleAPIKey + '&libraries=places&call';
      } else if (this.props.googlePlacesLibraryURL) {
        scriptTag.src = this.props.googlePlacesLibraryURL;
      }

      (document.head || document.body).appendChild(scriptTag);

      scriptTag.addEventListener('load', function () {
        _this.initAutocomplete();
      });
    }
  }, {
    key: 'initAutocomplete',
    value: function initAutocomplete() {
      var _this4 = this;

      // eslint-disable-next-line no-undef
      this.autocomplete = new google.maps.places.Autocomplete(this.input, { types: [this.props.locationType] });
      this.autocomplete.addListener('place_changed', function () {
        _this4.props.onDropdownSelect(_this4);
      });
      this.props.targetArea && this.geolocate();
    }
  }, {
    key: 'geolocate',
    value: function geolocate() {
      if (this.constructor.libraryHasLoaded()) {
        var _this = this;

        if (this.props.targetArea) {
          // eslint-disable-next-line no-undef
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ address: this.props.targetArea }, function (results) {
            var place = results[0].geometry.location;

            _this.setBounds(place);
          });
        }
      }
    }
  }, {
    key: 'setBounds',
    value: function setBounds(position) {
      // eslint-disable-next-line no-undef
      var circle = new google.maps.Circle({
        center: position,
        radius: position.coords ? position.coords.accuracy : 100
      });

      this.autocomplete.setBounds(circle.getBounds());
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return _react2.default.createElement('input', {
        type: 'text',
        name: this.props.name,
        id: this.props.id,
        placeholder: this.props.placeholder,
        className: this.props.className + ' location-field-autocomplete-component',
        ref: function ref(input) {
          _this5.input = input;
        },
        value: this.props.value,
        onChange: this.props.onChange
      });
    }
  }], [{
    key: 'libraryHasLoaded',
    value: function libraryHasLoaded() {
      return typeof google !== 'undefined';
    }
  }]);

  return LocationAutocomplete;
}(_react2.default.Component);

LocationAutocomplete.defaultProps = {
  locationType: 'geocode',
  placeholder: '' // overrides Google's default placeholder
};

LocationAutocomplete.propTypes = {
  name: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  targetArea: _react2.default.PropTypes.string,
  locationType: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func.isRequired,
  onDropdownSelect: _react2.default.PropTypes.func.isRequired,
  googleAPIKey: _react2.default.PropTypes.string,
  googlePlacesLibraryURL: _react2.default.PropTypes.string
};

exports.default = LocationAutocomplete;
