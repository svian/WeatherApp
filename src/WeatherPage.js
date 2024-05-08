import { View, Image, StyleSheet, Text } from "react-native";
import InsetShadow from "react-native-inset-shadow";

export default function WeatherPage(props) {
  return (
    <>
      {props.temp !== undefined && props.visuals.theme && (
        <View style={styles.container}>
          <Image style={styles.image} source={props.visuals.theme.img} />
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
            <View
              style={[{ backgroundColor: props.visuals.theme.box }, styles.box]}
            >
              <Text style={styles.boxText}>{props.visuals.theme.quote}</Text>
              <View>
                <Text style={styles.boxText}>
                  {props.visuals.theme.quoteSrc}
                </Text>
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
    width: "100%",
  },
  image: {
    marginTop: "15%",
    height: "45%",
    width: "100%",
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
  box: {
    borderRadius: 20,
    paddingLeft: 25,
    paddingRight: 20,
  },
});
