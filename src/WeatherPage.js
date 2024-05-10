import {View, Image, StyleSheet, Text} from 'react-native';
import InsetShadow from 'react-native-inset-shadow';

export default function WeatherPage(props) {
  return (
    <>
      {props.temp !== undefined && props.visuals.theme && (
        <View style={styles.container}>
          <Image
            style={{
              width: '95%',
              height: '40%',
              marginTop: '-10%',
              marginBottom: '-10%',
            }}
            source={props.visuals.theme.img}
          />
          <View>
            <Text style={[styles.text, styles.title]}>
              {props.visuals.category}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.text,
                styles.subtitle,
              ]}>{`It's ${props.temp}`}</Text>
          </View>
          <InsetShadow
            containerStyle={{
              borderRadius: 20,
              height: 'fit-content',
            }}>
            <View
              style={[{backgroundColor: props.visuals.theme.box}, styles.box]}>
              <Text style={[styles.text, styles.boxText]}>
                {props.visuals.theme.quote}
              </Text>
              <View>
                <Text style={[styles.text, styles.boxText]}>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontFamily: 'Jomhuria-Regular',
    color: '#ffffff',
    letterSpacing: 7,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {height: 2},
    textShadowRadius: 15,
  },
  title: {
    fontSize: 75,
    marginBottom: '-10%',
  },
  subtitle: {
    fontSize: 40,
    marginBottom: 30,
  },
  boxText: {
    fontSize: 24,
    textAlign: 'center',
  },
  box: {
    borderRadius: 20,
    padding: 20,
  },
});
