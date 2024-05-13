import {View, StyleSheet, Text} from 'react-native';
import ForecastCard from './forecastCard/ForecastCard';
import CurrentWeatherCard from './CurrentWeatherCard';
import {Switch} from 'react-native-switch';
import {useEffect, useState} from 'react';

const GREY = 'rgba(0,0,0,0.2)';

export default function MainPage(props) {
  var weather = props.weather,
    graphics = props.graphics,
    asyncStorage = props.asyncStorage,
    savedData = props.savedData;

  const [isMetric, setIsMetric] = useState(false);

  useEffect(() => {
    if (savedData) {
      console.log(savedData.units === 'metric');
      setIsMetric(savedData.units === 'metric');
    }
  }, [savedData]);

  return (
    <View style={styles.container}>
      {graphics.theme && (
        <>
          <View style={styles.currentBox}>
            <CurrentWeatherCard weather={weather} graphics={graphics} />
          </View>
          <View style={styles.forecastBox}>
            <ForecastCard theme={graphics.theme} weather={weather} />
          </View>
          <Switch
            backgroundActive={GREY}
            backgroundInactive={GREY}
            circleActiveColor={graphics.theme.primary}
            circleInActiveColor={graphics.theme.primary}
            activeText={null}
            inActiveText={null}
            activeTextStyle={styles.toggleBarText}
            inactiveTextStyle={styles.toggleBarText}
            renderInsideCircle={() => (
              <Text
                style={{
                  fontSize: 28,
                  color: '#FFFFFF',
                  fontFamily: 'Jomhuria-Regular',
                  marginVertical: -15,
                }}>
                {isMetric ? '°C' : '°F'}
              </Text>
            )}
            onValueChange={() => {
              asyncStorage.saveUnits(!isMetric ? 'metric' : 'imperial');
              setIsMetric(!isMetric);
            }}
            value={isMetric}
            switchWidthMultiplier={1.6}
            switchLeftPx={5}
            switchRightPx={5}
            circleBorderActiveColor={GREY}
            circleBorderInactiveColor={GREY}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  currentBox: {
    height: 'fit-content',
    marginBottom: 15,
  },
  forecastBox: {
    marginBottom: 5,
  },
});
