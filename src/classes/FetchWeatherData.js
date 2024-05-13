import {REACT_APP_BASE_URL, REACT_APP_API_KEY} from '@env';

const API_KEY = REACT_APP_API_KEY;
const POST_URL = REACT_APP_BASE_URL;
export class FetchWeatherData {
  constructor(data) {
    this.name = data.name;
    this.lat = '';
    this.lon = '';
    this.type = '';
    this.temp = '';
    this.time = '';
    this.units = data.units;
    this.forecast = [{time: '', temp: '', type: ''}];

    this.getWeatherValues(data.coords);
  }

  getWeatherValues(coords) {
    const t_coords = coords.split(' ');
    this.lat = t_coords[0];
    this.lon = t_coords[1];

    this.fetchWeather();
    this.fetchForecast();
  }

  setTypeandTemp(n_type, n_temp, n_unix, n_sunrise, n_sunset) {
    var date = new Date(n_unix * 1000);
    var sunrise = new Date(n_sunrise * 1000);
    var sunset = new Date(n_sunset * 1000);

    if (date > sunrise && date < sunset) {
      this.time = 'Day';
    } else {
      this.time = 'Night';
    }
    this.type = n_type;
    this.temp = n_temp;

    console.log(this.time);
    console.log('Weather is ' + this.temp + ' and ' + this.type);
  }

  fetchWeather() {
    const url = `${POST_URL}data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${API_KEY}&units=${this.units}`;
    let unitSig = this.units === 'metric' ? '°C' : '°F';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setTypeandTemp(
          data.weather[0].description,
          `${Math.round(data.main.temp)}${unitSig}`,
          data.dt,
          data.sys.sunrise,
          data.sys.sunset,
        );
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  fetchForecast() {
    const url = `${POST_URL}data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&cnt=8&appid=${API_KEY}&units=${this.units}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let t_arr = [];
        data.list.map(item => {
          t_arr.push({
            time: item.dt_txt.substr(11, 2),
            temp: `${Math.round(item.main.temp)}°`,
            type: item.weather[0].description,
          });
        });
        this.forecast = t_arr;
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }
}
