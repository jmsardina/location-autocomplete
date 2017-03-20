import React from 'react';
import { mount } from 'enzyme';
import LocationAutocomplete from '../../src/javascripts/location-autocomplete.jsx';

describe('<LocationAutocomplete />', function() {
  beforeEach(function() {
    this.handleChange = () => {};
    this.handleDropdownSelect = () => {};

    this.render = function() {
      this.wrapper = mount(
        <LocationAutocomplete
          value='some value'
          onChange={this.handleChange}
          handleDropdownSelect={this.handleDropdownSelect}
          googleAPIKey="someKey"
        />
      );

      this.inputField = this.wrapper.find('input');
    };
  });

  afterEach(function() {
    window.google = undefined;
    const library = document.getElementById('location-autocomplete-library');
    if (library) { library.remove(); }
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

    it('binds the handleDropdownSelect handler', function() {
      const autocomplete = spyOn(google.maps.places, 'Autocomplete').and.returnValue({
        addListener: function() { }
      });

      spyOn(autocomplete(), 'addListener');
      this.render();

      expect(autocomplete).toHaveBeenCalledWith(
        this.wrapper.find('input').node, { types: ['geocode'] }
      );
      expect(autocomplete().addListener).toHaveBeenCalledWith(
        'place_changed',
        this.handleDropdownSelect
      );
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
            handleDropdownSelect={this.handleDropdownSelect}
            googleAPIKey="someKey"
          />
        );

        expect(autocomplete).toHaveBeenCalledWith(
          wrapper.find('input').node, { types: ['(regions)'] }
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
});