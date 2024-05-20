import {Text, StyleSheet, View, ImageBackground} from 'react-native';
import ForecastCardItem from './ForecastCardItem';
import {useEffect} from 'react';
import {OutlinedText} from '../OutlinedText';

export default function ForecastCard(props) {
  // var forecast = props.weather.forecast;
  var theme = props.theme,
    forecast = props.forecast.forecast;

  //get images
  //split into two groups of 4
  var indexToSplit = 4;
  var first = forecast.slice(0, indexToSplit);
  var second = forecast.slice(indexToSplit);
  return (
    <View>
      <View style={[{backgroundColor: theme.primary}, styles.upperBox]}>
        <OutlinedText stroke={1} color={theme.secondary}>
          <Text style={styles.text}>Upcoming Forecast</Text>
        </OutlinedText>
      </View>
      <View style={styles.box}>
        <ForecastCardItem forecast={first} />
      </View>
      <View style={styles.box}>
        <ForecastCardItem forecast={second} isLower={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  upperBox: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingLeft: 15,
    width: '93.5%',
    alignSelf: 'center',
  },
  box: {
    alignItems: 'center',
    paddingBottom: 2,
  },
  text: {
    fontFamily: 'Jomhuria-Regular',
    color: '#ffffff',
    letterSpacing: 7,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {height: 2},
    textShadowRadius: 15,
    fontSize: 26,
  },
  title: {
    fontSize: 75,
    marginBottom: '-10%',
  },
  subtitle: {
    fontSize: 40,
    marginBottom: 30,
  },
});
