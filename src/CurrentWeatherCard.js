import {StyleSheet, Text, View, Image} from 'react-native';
import {OutlinedText} from './OutlinedText';

export default function CurrentWeatherCard(props) {
  var graphics = props.graphics,
    weather = props.weather;
  return (
    <View style={styles.container}>
      {graphics.theme && (
        <View style={[{backgroundColor: graphics.theme.primary}, styles.box]}>
          <Image
            style={{
              height: 300,
              width: 340,
              marginTop: '-5%',
              marginBottom: '-10%',
            }}
            source={graphics.theme.img}
          />
          <View style={{alignItems: 'center'}}>
            <OutlinedText stroke={1.2} color={graphics.theme.secondary}>
              <Text
                style={{
                  fontSize: 70,
                  color: '#FFFFFF',
                  fontFamily: 'Jomhuria-Regular',
                  letterSpacing: 7,
                  marginVertical: -15,
                }}>
                {graphics.category}
              </Text>
            </OutlinedText>
            <OutlinedText stroke={1} color={graphics.theme.secondary}>
              <Text
                style={{
                  fontSize: 40,
                  color: '#FFFFFF',
                  fontFamily: 'Jomhuria-Regular',
                  letterSpacing: 7,
                  marginVertical: -15,
                }}>
                {`It's ${weather.temp}`}
              </Text>
            </OutlinedText>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  box: {
    borderRadius: 20,
    padding: 15,
    paddingBottom: 30,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 1)',
    height: 'fit-content',
  },
});
