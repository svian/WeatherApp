import {
  DayClear,
  DayCloudy,
  DayFewClouds,
  DayFogEtc,
  DayLightRain,
  DayRainy,
  DaySnowy,
  DayThunder,
  DayLightSnow,
} from "../themes/DayThemes";
import {
  NightClear,
  NightCloudy,
  NightFewClouds,
  NightFogEtc,
  NightLightRain,
  NightRainy,
  NightSnowy,
  NightThunder,
  NightLightSnow,
} from "../themes/NightThemes";

export class VisualData {
  constructor(time, description) {
    this.description = description;
    this.time = time;
    this.category = "";
    this.theme = {
      background: "#D9D9D9",
      box: "#D9D9D9",
      quote: "",
      quoteSrc: "",
      img: null,
    };

    this.setCategory();
    console.log(this.category);
    this.setVisuals();
    console.log(this.theme);
  }

  setCategory() {
    switch (this.description) {
      case "clear sky":
        this.category = "Clear";
        break;
      case "few clouds":
      case "scattered clouds":
        this.category = "Few Clouds";
        break;
      case "broken clouds":
      case "overcast clouds":
        this.category = "Cloudy";
        break;
      case "light intensity drizzle":
      case "drizzle":
      case "heavy intensity drizzle":
      case "light intensity drizzle rain":
      case "drizzle rain":
      case "heavy intensity drizzle rain":
      case "shower rain and drizzle":
      case "heavy shower rain and drizzle":
      case "shower drizzle":
      case "light rain":
      case "light intensity shower rain":
        this.category = "Light Rain";
        break;
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
      case "freezing rain":
      case "shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        this.category = "Rainy";
        break;
      case this.description.includes("thunderstorm"):
        this.category = "Thunderstorm";
        break;
      case "light snow":
      case "snow":
      case "sleet":
      case "light shower sleet":
      case "light rain and snow":
      case "light shower snow":
        this.category = "Snowy";
        break;
      case "heavy snow":
      case "shower sleet":
      case "rain and snow":
      case "shower snow":
      case "heavy shower snow":
        this.category = "Heavy Snow";
        break;
      case "sand/dust whirls":
        this.category = "Dust";
        break;
      case "volcanic ash":
        this.category = "Ash";
        break;
      default:
        this.category =
          this.description.charAt(0).toUpperCase() + this.description.slice(1);
        break;
    }
  }

  setVisuals() {
    if (this.time === "Day") {
      switch (this.category) {
        case "Clear Skies":
          this.theme = DayClear;
          break;

        case "Few Clouds":
          this.theme = DayFewClouds;
          break;

        case "Cloudy":
          this.theme = DayCloudy;
          break;

        case "Light Rain":
          this.theme = DayLightRain;
          break;

        case "Rainy":
          this.theme = DayRainy;
          break;

        case "Thunderstorm":
          this.theme = DayThunder;
          break;

        case "Snowy":
          this.theme = DayLightSnow;
          break;

        case "Heavy Snow":
          this.theme = DaySnowy;
          break;

        default:
          this.theme = DayFogEtc;
          break;
      }
    } else {
      switch (this.category) {
        case "Clear Skies":
          this.theme = NightClear;
          break;

        case "Few Clouds":
          this.theme = NightFewClouds;
          break;

        case "Cloudy":
          this.theme = NightCloudy;
          break;

        case "Light Rain":
          this.theme = NightLightRain;
          break;

        case "Rainy":
          this.theme = NightRainy;
          break;

        case "Thunderstorm":
          this.theme = NightThunder;
          break;

        case "Snowy":
          this.theme = NightLightSnow;
          break;

        case "Heavy Snow":
          this.theme = NightSnowy;
          break;

        default:
          this.theme = NightFogEtc;
          break;
      }
    }
  }
}
