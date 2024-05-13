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

    this.setCategory();
    this.setVisuals();
  }

  setCategory() {
    switch (this.description) {
      case 'clear sky':
        this.category = 'Clear Skies';
        break;
      case 'few clouds':
      case 'scattered clouds':
        this.category = 'Few Clouds';
        break;
      case 'broken clouds':
      case 'overcast clouds':
        this.category = 'Cloudy';
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
        break;
      case this.description.includes('thunderstorm'):
        this.category = 'Thunderstorm';
        break;
      case 'light snow':
      case 'snow':
      case 'sleet':
      case 'light shower sleet':
      case 'light rain and snow':
      case 'light shower snow':
        this.category = 'Snowy';
        break;
      case 'heavy snow':
      case 'shower sleet':
      case 'rain and snow':
      case 'shower snow':
      case 'heavy shower snow':
        this.category = 'Heavy Snow';
        break;
      case 'sand/dust whirls':
        this.category = 'Dust';
        break;
      case 'volcanic ash':
        this.category = 'Ash';
        break;
      default:
        this.category =
          this.description.charAt(0).toUpperCase() + this.description.slice(1);
        break;
    }
  }

  setVisuals() {
    if (this.time === 'Day') {
      switch (this.category) {
        case 'Clear Skies':
          this.theme = day.DayClear;
          break;

        case 'Few Clouds':
          this.theme = day.DayFewClouds;
          break;

        case 'Cloudy':
          this.theme = day.DayCloudy;
          break;

        case 'Light Rain':
          this.theme = day.DayLightRain;
          break;

        case 'Rainy':
          this.theme = day.DayRainy;
          break;

        case 'Thunderstorm':
          this.theme = day.DayThunder;
          break;

        case 'Snowy':
          this.theme = day.DaySnowy;
          break;

        case 'Heavy Snow':
          this.theme = day.DayHeavySnow;
          break;

        default:
          this.theme = day.DayFogEtc;
          break;
      }
    } else {
      switch (this.category) {
        case 'Clear Skies':
          this.theme = night.NightClear;
          break;

        case 'Few Clouds':
          this.theme = night.NightFewClouds;
          break;

        case 'Cloudy':
          this.theme = night.NightCloudy;
          break;

        case 'Light Rain':
          this.theme = night.NightLightRain;
          break;

        case 'Rainy':
          this.theme = night.NightRainy;
          break;

        case 'Thunderstorm':
          this.theme = night.NightThunder;
          break;

        case 'Snowy':
          this.theme = night.NightSnowy;
          break;

        case 'Heavy Snow':
          this.theme = night.NightHeavySnow;
          break;

        default:
          this.theme = night.NightFogEtc;
          break;
      }
    }
  }
}
