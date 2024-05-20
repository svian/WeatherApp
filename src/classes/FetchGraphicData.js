import * as day from '../themes/DayThemes';
import * as night from '../themes/NightThemes';

export class FetchGraphicData {
  constructor(data) {
    this.description = data.type;
    this.time = data.time;
    this.category = this.setCategory(data.type);
    this.theme = {
      primary: '#CDE9F1',
      secondary: '#CDE9F1',
      img: null,
    };
    this.setVisuals();
  }

  setCategory(type) {
    switch (type) {
      case 'clear sky':
        return 'Clear Skies';
      case 'few clouds':
      case 'scattered clouds':
        return 'Few Clouds';
      case 'broken clouds':
      case 'overcast clouds':
        return 'Cloudy';
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
        return 'Light Rain';
      case 'moderate rain':
      case 'heavy intensity rain':
      case 'very heavy rain':
      case 'extreme rain':
      case 'freezing rain':
      case 'shower rain':
      case 'heavy intensity shower rain':
      case 'ragged shower rain':
        return 'Rainy';
      case this.description.includes('thunderstorm'):
        return 'Thunderstorm';
      case 'light snow':
      case 'snow':
      case 'sleet':
      case 'light shower sleet':
      case 'light rain and snow':
      case 'light shower snow':
        return 'Snowy';
      case 'heavy snow':
      case 'shower sleet':
      case 'rain and snow':
      case 'shower snow':
      case 'heavy shower snow':
        return 'Heavy Snow';
      case 'sand/dust whirls':
        return 'Dust';
      case 'volcanic ash':
        return 'Ash';
      default:
        return (
          this.description.charAt(0).toUpperCase() + this.description.slice(1)
        );
    }
  }

  setVisuals() {
    const t_module = this.time === 'Day' ? day : night;
    switch (this.category) {
      case 'Clear Skies':
        this.theme = t_module.Clear;
        break;

      case 'Few Clouds':
        this.theme = t_module.FewClouds;
        break;

      case 'Cloudy':
        this.theme = t_module.Cloudy;
        break;

      case 'Light Rain':
        this.theme = t_module.LightRain;
        break;

      case 'Rainy':
        this.theme = t_module.Rainy;
        break;

      case 'Thunderstorm':
        this.theme = t_module.Thunder;
        break;

      case 'Snowy':
        this.theme = t_module.Snowy;
        break;

      case 'Heavy Snow':
        this.theme = t_module.HeavySnow;
        break;

      default:
        this.theme = t_module.FogEtc;
        break;
    }
  }
}
