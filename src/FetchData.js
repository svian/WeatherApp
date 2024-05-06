import { REACT_APP_BASE_URL, REACT_APP_API_KEY } from "@env";
export class FetchData {
  constructor(location) {
    this.location = location;
    this.postUrl = REACT_APP_BASE_URL;
    this.apiKey = REACT_APP_API_KEY;
    this.locationData = this.location !== "" && this.fetchLocation();
    this.lat = "";
    this.lon = "";
    this.type = "";
    this.temp = "";
    this.time = "";
  }

  getWeatherValues() {
    return (
      "Weather in " + this.location + " is " + this.temp + " and " + this.type
    );
  }

  setTypeandTemp(n_type, n_temp, n_unix, n_sunrise, n_sunset) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
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

    //console.log("Given: " + n_type + " " + n_temp);
    this.type = n_type;
    this.temp = n_temp;
    //console.log("Set: " + this.type + " " + this.temp);
  }

  setLatandLon(n_lat, n_lon) {
    //console.log("Given: " + n_lat + " " + n_lon);
    this.lat = n_lat;
    this.lon = n_lon;

    this.fetchWeather();
  }

  fetchLocation() {
    const url = `${this.postUrl}geo/1.0/direct?q=${this.location}&limit=5&appid=${this.apiKey}`;

    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data[0].current + " " + data[0].lat + " " + data[0].lon);
        this.setLatandLon(data[0].lat, data[0].lon);
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }

  fetchWeather() {
    const url = `${this.postUrl}data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=imperial`;

    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(
        //   "Response: " +
        //     data.name +
        //     " " +
        //     `${Math.round(data.main.temp)}°F` +
        //     " " +
        //     data.weather[0].main
        // );
        //console.log("Unix: " + data.dt);
        this.setTypeandTemp(
          data.weather[0].main,
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
