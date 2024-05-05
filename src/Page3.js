import { View, Image } from "react-native-web";
import { StyleSheet } from "react-native";

export default function Page3(props) {
  getBoxStyle = function (myColor) {
    return {
      fontSize: "24px",
      width: "275px",
      height: "250px",
      borderRadius: "20px",
      paddingLeft: "25px",
      paddingRight: "20px",
      textAlign: "center",
      display: "grid",
      alignContent: "center",
      boxShadow: "inset 0px 4px 4px rgba(0,0,0,0.5)",
      backgroundColor: myColor,
    };
  };

  return (
    <>
      {props.temp !== undefined && props.visuals.img && (
        <View style={styles.container}>
          {/* <Image
            source={require("../assets/icons/sun1.gif")}
            style={styles.image}
          /> */}
          <Image style={styles.image} source={props.visuals.img} />
          <div style={styles.title}>{props.visuals.type}</div>
          <div style={styles.subtitle}>{`It's ${props.temp}`}</div>
          <div style={getBoxStyle(props.visuals.boxColor)}>
            {props.visuals.quote}
            <div>{props.visuals.quoteSrc}</div>
          </div>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "content",
    fontFamily: "Jomhuria-Regular",
    letterSpacing: "7px",
    width: "350px",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
    textShadow: "0px 4px 4px rgba(0,0,0,0.3)",
  },
  image: {
    marginTop: "20px",
    marginBottom: "20px",
    height: "320px",
    width: "320px",
  },
  title: {
    fontSize: "96px",
  },
  subtitle: {
    fontSize: "40px",
    marginBottom: "20px",
  },
});
