import ClearDay from "../assets/icons/ClearIcon_Day.png";
import CloudyDay from "../assets/icons/CloudyIcon_Day.png";
import RainyDay from "../assets/icons/RainyIcon_Day.png";
import ThunderDay from "../assets/icons/ThunderIcon_Day.png";

import ClearNight from "../assets/icons/ClearIcon_Night.png";
import CloudyNight from "../assets/icons/CloudyIcon_Night.png";
import RainyNight from "../assets/icons/RainyIcon_Night.png";
import ThunderNight from "../assets/icons/ThunderIcon_Night.png";

export class VisualData {
  constructor(time, type) {
    this.type = type;
    this.time = time;
    this.img;
    this.quote = "";
    this.quoteSrc = "";
    this.backgroundColor = "#D9D9D9";
    this.boxColor = "";
    this.setVisuals();
  }

  setVisuals() {
    if (this.time === "Day") {
      switch (this.type) {
        case "Clear":
          this.type = "Clear Skies";
          this.img = ClearDay;
          this.quote =
            '"O, Sunlight! The most precious gold to be found on Earth."';
          this.quoteSrc = "-Roman Payne";
          this.backgroundColor = "#FFA553";
          this.boxColor = "#A14D00";
          break;

        case "Drizzle":
        case "Rain":
          this.type = "Rainy";
          this.img = RainyDay;
          this.quote =
            "\"Life isn't about waiting for the storm to pass...It's about learning to dance in the rain.\"";
          this.quoteSrc = "-Vivian Greene";
          this.backgroundColor = "#29557E";
          this.boxColor = "#163451";
          break;

        case "Clouds":
          this.type = "Cloudy";
          this.img = CloudyDay;
          this.quote =
            '"Clouds are on top for a reason. They float so high because they refuse to carry any burden!"';
          this.quoteSrc = "-Jasleen Kaur Gumber";
          this.backgroundColor = "#9EB8D0";
          this.boxColor = "#587FA3";
          break;

        case "Thunderstorm":
          this.type = "Storming";
          this.img = ThunderDay;
          this.quote =
            '"Thunderstorms are as much our friends as the sunshine."';
          this.quoteSrc = "-Criss Jami";
          this.backgroundColor = "#003260";
          this.boxColor = "#001C35";
          break;
      }
    } else {
      switch (this.type) {
        case "Clear":
          this.type = "Clear Skies";
          this.img = ClearNight;
          this.quote =
            '"O, Sunlight! The most precious gold to be found on Earth."';
          this.quoteSrc = "-Roman Payne";
          this.backgroundColor = "#5B65C1";
          this.boxColor = "#343E90";
          break;

        case "Drizzle":
        case "Rain":
          this.type = "Rainy";
          this.img = RainyNight;
          this.quote =
            "\"Life isn't about waiting for the storm to pass...It's about learning to dance in the rain.\"";
          this.quoteSrc = "-Vivian Greene";
          this.backgroundColor = "#1D317A";
          this.boxColor = "#0A1E65";
          break;

        case "Clouds":
          this.type = "Cloudy";
          this.img = CloudyNight;
          this.quote =
            '"Clouds are on top for a reason. They float so high because they refuse to carry any burden!"';
          this.quoteSrc = "-Jasleen Kaur Gumber";
          this.backgroundColor = "#525189";
          this.boxColor = "#383770";
          break;

        case "Thunderstorm":
          this.type = "Storming";
          this.img = ThunderNight;
          this.quote =
            '"Thunderstorms are as much our friends as the sunshine."';
          this.quoteSrc = "-Criss Jami";
          this.backgroundColor = "#";
          this.boxColor = "#";
          break;
      }
    }
  }
}
