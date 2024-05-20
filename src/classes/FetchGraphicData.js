import * as day from '../themes/DayThemes';
import * as night from '../themes/NightThemes';

export class FetchGraphicData {
  constructor(data) {
    this.description = data.type;
    this.time = data.time;
    this.category = '';
    this.theme = {
      primary: '#CDE9F1',
      secondary: '#CDE9F1',
      img: null,
    };
    this.setVisuals();
  }

  setVisuals() {
    const t_module = this.time === 'Day' ? day : night;

    switch (this.description) {
      case 'clear sky':
        this.category = 'Clear Skies';
        this.theme = t_module.Clear;
        break;
      case 'few clouds':
      case 'scattered clouds':
        this.category = 'Few Clouds';
        this.theme = t_module.FewClouds;
        break;
      case 'broken clouds':
      case 'overcast clouds':
        this.category = 'Cloudy';
        this.theme = t_module.Cloudy;
        break;
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
        this.category = 'Light Rain';
        this.theme = t_module.LightRain;
        break;
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
      case 'freezing rain':
      case 'shower rain':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
        this.category = 'Rainy';
        this.theme = t_module.Rainy;
        break;
      case this.description.includes('thunderstorm'):
        this.category = 'Thunderstorm';
        this.theme = t_module.Thunder;
        break;
      case 'light snow':
      case 'snow':
      case 'sleet':
      case 'light shower sleet':
      case 'light rain and snow':
      case 'light shower snow':
        this.category = 'Snowy';
        this.theme = t_module.Snowy;
        break;
      case 'heavy snow':
      case 'shower sleet':
      case 'rain and snow':
      case 'shower snow':
      case 'heavy shower snow':
        this.category = 'Heavy Snow';
        this.theme = t_module.HeavySnow;
        break;
      case 'sand/dust whirls':
        this.category = 'Dust';
        this.theme = t_module.FogEtc;
        break;
      case 'volcanic ash':
        this.category = 'Ash';
        this.theme = t_module.FogEtc;
        break;
      default:
        this.category =
          this.description.charAt(0).toUpperCase() + this.description.slice(1);
        this.theme = t_module.FogEtc;
        break;
    }
  }
}
