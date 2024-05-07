import { View, Image, StyleSheet, Text } from "react-native";
import InsetShadow from "react-native-inset-shadow";

export default function Page3(props) {
  getBoxStyle = function (myColor) {
    return {
      width: "100%",
      borderRadius: 20,
      paddingLeft: 25,
      paddingRight: 20,
      backgroundColor: myColor,
    };
  };

  return (
    <>
      {props.temp !== undefined && props.visuals.img && (
        <View style={styles.container}>
          <Image style={styles.image} source={props.visuals.img} />
          <View>
            <Text style={styles.title}>{props.visuals.type}</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>{`It's ${props.temp}`}</Text>
          </View>
          <InsetShadow
            containerStyle={{
              borderRadius: 20,
              height: "fit-content",
              marginBottom: "20%",
            }}
          >
            <View style={getBoxStyle(props.visuals.boxColor)}>
              <Text style={styles.boxText}>{props.visuals.quote}</Text>
              <View>
                <Text style={styles.boxText}>{props.visuals.quoteSrc}</Text>
              </View>
            </View>
          </InsetShadow>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginTop: "10%",
    height: 220,
    width: 220,
  },
  title: {
    fontFamily: "Jomhuria-Regular",
    color: "#ffffff",
    letterSpacing: 7,
    fontSize: 76,
    marginBottom: "-5%",
    marginTop: "-5%",
  },
  subtitle: {
    fontFamily: "Jomhuria-Regular",
    color: "#ffffff",
    letterSpacing: 7,
    fontSize: 40,
    marginBottom: 20,
  },
  boxText: {
    fontFamily: "Jomhuria-Regular",
    letterSpacing: 7,
    color: "#ffffff",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 15,
    paddingBottom: 15,
  },
});
