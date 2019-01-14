/* global describe:false, it:false, spyOn:false, expect:false, beforeEach:false, afterEach: false, google */
/* eslint-disable no-unused-vars*/
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LocationAutocomplete from '../../src/javascripts/location-autocomplete.jsx';
/* eslint-enable no-unused-vars*/
import { mount } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

describe('<LocationAutocomplete />', function() {
  beforeEach(function() {
    this.handleChange = () => {};
    this.onDropdownSelect = () => {};

    this.render = function() {
      this.wrapper = mount(
        <LocationAutocomplete
          value='some value'
          onChange={this.handleChange}
          onDropdownSelect={this.onDropdownSelect}
          googleAPIKey='someKey'
        />
      );

      this.inputField = this.wrapper.find('input');
    };
  });

  afterEach(function() {
    window.google = undefined;
    const libraries = document.querySelectorAll('#location-autocomplete-library');
    libraries.forEach(function(library) { document.head.removeChild(library); });
  });

  it('renders the value', function() {
    this.render();
    expect(this.inputField.props().value).toEqual('some value');
  });

  describe('when autocomplete library is not available', function() {
    it('does not break the input field', function() {
      spyOn(this, 'handleChange');
      this.render();
      this.wrapper.find('input').simulate('change');

      expect(this.handleChange).toHaveBeenCalled();
    });
  });

  describe('when autocomplete library is already available', function() {
    beforeEach(function() {
      window.google = {
        maps: {
          places: {
            Autocomplete: function() {
              return { addListener: function() { } };
            }
          }
        }
      };
    });

    it('does not import the library again', function() {
      this.render();

      expect(document.getElementById('location-autocomplete-library')).toEqual(null);
    });

    describe('when locationType is set', function() {
      it('biases autocomplete to specified locationType', function() {
        const autocomplete = spyOn(google.maps.places, 'Autocomplete').and.returnValue({
          addListener: function() { }
        });
        const wrapper = mount(
          <LocationAutocomplete
            locationType='(regions)'
            onChange={this.handleChange}
            onDropdownSelect={this.onDropdownSelect}
            googleAPIKey='someKey'
          />
        );

        expect(autocomplete).toHaveBeenCalledWith(
          wrapper.find('input').getDOMNode(), { types: ['(regions)'] }
        );
      });
    });
  });

  describe('when rendering multiple instances of LocationAutocomplete', function() {
    it('loads the autocomplete library only once', function() {
      this.render();
      this.render();

      expect(document.querySelectorAll('#location-autocomplete-library').length).toEqual(1);
    });
  });

  describe('when the Google Maps library is directly added to the DOM', function() {
    beforeEach(function() {
      const script = document.createElement('script');
      script.id = 'test-script';
      script.src = 'https://maps.googleapis.com/maps/api/js?key=someapikeyhere';

      document.head.append(script);
    });

    afterEach(function() {
      document.head.removeChild(document.getElementById('test-script'));
    });

    it('does not add the library script again', function() {
      spyOn(LocationAutocomplete.prototype, 'initAutocomplete');
      this.render();

      expect(document.getElementById('location-autocomplete-library')).toEqual(null);
    });
  });
});
