import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_LOCATION_DATA = {
  //default location is Boston MA
  coords: '42.3554334 -71.060511',
  name: 'Boston, MA',
};

const DEFAULT_UNITS = 'imperial';

export class AsyncSavedData {
  constructor() {
    this.name = '';
    this.coords = '';
    this.units = '';
  }

  initSavedData() {
    this.getSavedUnits();
    this.getSavedLocation();

    console.log('init');
  }

  getUnits() {
    return this.units;
  }

  saveUnits = async t_units => {
    if (typeof t_units === 'string') {
      this.units = t_units;
      try {
        const jsonValue = t_units;
        await AsyncStorage.setItem('units', jsonValue);
      } catch (e) {
        console.error('Error saving data:', e);
      }
    }
  };
  saveLocation = async t_location => {
    try {
      const jsonValue = JSON.stringify(t_location);
      await AsyncStorage.setItem('location', jsonValue);
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };

  getSavedUnits = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('units');
      if (jsonValue !== null) {
        this.units = jsonValue;
      } else {
        this.units = DEFAULT_UNITS;
      }
      console.log('got: ' + this.units);
    } catch (e) {
      console.error('Error fetching stored units:', e);
    }
  };

  getSavedLocation = async () => {
    try {
      let t_location;
      const jsonValue = await AsyncStorage.getItem('location');
      if (jsonValue !== null) {
        t_location = JSON.parse(jsonValue);
      } else {
        t_location = DEFAULT_LOCATION_DATA;
      }
      //FOR TESTING PURPOSES
      // t_location = DEFAULT_LOCATION_DATA;

      this.coords = t_location.coords;
      this.name = t_location.name;
      console.log('got: ' + this.coords + ' ' + this.name);
    } catch (e) {
      console.error('Error fetching stored location:', e);
    }
  };
}
