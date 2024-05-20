import {REACT_APP_BASE_URL, REACT_APP_API_KEY} from '@env';
import day_simple from '../../assets/icons/simple/day';
import night_simple from '../../assets/icons/simple/night';

const API_KEY = REACT_APP_API_KEY;
const POST_URL = REACT_APP_BASE_URL;
export class FetchForecastData {
  constructor(data) {
    this.lat = '';
    this.lon = '';
    this.units = data.units;
    this.forecast = [{time: '', temp: '', icon: null}];

    this.getWeatherValues(data.coords);
  }

  getWeatherValues(coords) {
    const t_coords = coords.split(' ');
    this.lat = t_coords[0];
    this.lon = t_coords[1];

    this.fetchForecast();
  }

  getTimevalues(dt, timezone) {
    const t_dt = (dt + timezone) * 1000;
    var d = new Date(t_dt);
    return d.toISOString().substr(11, 2);
  }

  fetchForecast() {
    const url = `${POST_URL}data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&cnt=8&appid=${API_KEY}&units=${this.units}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let t_arr = [];
        const timezone = data.city.timezone;
        data.list.map(item => {
          const t_time = this.getTimevalues(item.dt, timezone);
          // const tod = t_time >= 6 && t_time <= 18 ? 'Day' : 'Night';
          t_arr.push({
            time: t_time,
            temp: `${Math.round(item.main.temp)}°`,
            icon: this.getIcons(item.weather[0].description, item.sys.pod),
          });
        });
        this.forecast = t_arr;
      })
      .catch(error => {
        console.error('Error fetching forecast data:', error);
      });
  }

  getIcons(type, tod) {
    const t_module = tod === 'd' ? day_simple : night_simple;
    switch (type) {
      case 'clear sky':
        return t_module.clear;
      case 'few clouds':
      case 'scattered clouds':
        return t_module.few_clouds;
      case 'broken clouds':
      case 'overcast clouds':
        return t_module.cloudy;
      case 'light intensity drizzle':
      case 'drizzle':
      case 'heavy intensity drizzle':
      case 'light intensity drizzle rain':
      case 'drizzle rain':
      case 'heavy intensity drizzle rain':
      case 'shower rain and drizzle':
      case 'heavy shower rain and drizzle':
      case 'shower drizzle':
      case 'light rain':
      case 'light intensity shower rain':
        return t_module.light_rain;
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
      case 'freezing rain':
      case 'shower rain':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
        return t_module.rainy;
      case this.description.includes('thunderstorm'):
        return t_module.thunder;
      case 'light snow':
      case 'snow':
      case 'sleet':
      case 'light shower sleet':
      case 'light rain and snow':
      case 'light shower snow':
        return t_module.snowy;
      case 'heavy snow':
      case 'shower sleet':
      case 'rain and snow':
      case 'shower snow':
      case 'heavy shower snow':
        return t_module.heavy_snow;
      default:
        return t_module.fog;
    }
  }
}
