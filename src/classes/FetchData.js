import { REACT_APP_BASE_URL, REACT_APP_API_KEY } from "@env";
const API_KEY = REACT_APP_API_KEY;
const POST_URL = REACT_APP_BASE_URL;
export class FetchData {
  constructor(coords) {
    this.lat = "";
    this.lon = "";
    this.type = "";
    this.temp = "";
    this.time = "";

    this.getWeatherValues(coords);
  }

  getWeatherValues(coords) {
    const t_coords = coords.split(" ");
    this.lat = t_coords[0];
    this.lon = t_coords[1];

    this.fetchWeather();
  }

  setTypeandTemp(n_type, n_temp, n_unix, n_sunrise, n_sunset) {
    var date = new Date(n_unix * 1000);
    var sunrise = new Date(n_sunrise * 1000);
    var sunset = new Date(n_sunset * 1000);

    if (date > sunrise && date < sunset) {
      console.log("its daytime");
      this.time = "Day";
    } else {
      console.log("its nighttime");
      this.time = "Night";
    }
    this.type = n_type;
    this.temp = n_temp;

    console.log("Weather is " + this.temp + " and " + this.type);
  }

  fetchWeather() {
    const url = `${POST_URL}data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${API_KEY}&units=imperial`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setTypeandTemp(
          data.weather[0].description,
          `${Math.round(data.main.temp)}°F`,
          data.dt,
          data.sys.sunrise,
          data.sys.sunset
        );
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }
}
