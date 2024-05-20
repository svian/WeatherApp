import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {OutlinedText} from './OutlinedText';

export default function CurrentWeatherCard(props) {
  var graphics = props.graphics,
    weather = props.weather;

  const windowHeight = Dimensions.get('window').height;

  const TITLE_FONT_SIZE = windowHeight / 9;
  const SUBTITLE_FONT_SIZE = windowHeight / 17;

  return (
    <View style={[{backgroundColor: graphics.theme.primary}, styles.box]}>
      {graphics.theme && (
        <>
          <Image
            resizeMode="contain"
            style={{
              alignSelf: 'center',
              marginTop: -20,
              marginBottom: 10,
              height: windowHeight / 3,
            }}
            source={graphics.theme.img}
          />
          <View style={{alignItems: 'center'}}>
            <OutlinedText stroke={1} color={graphics.theme.secondary}>
              <Text
                style={{
                  fontSize: TITLE_FONT_SIZE,
                  color: '#FFFFFF',
                  fontFamily: 'Jomhuria-Regular',
                  letterSpacing: 7,
                  marginVertical: -TITLE_FONT_SIZE,
                }}>
                {graphics.category}
              </Text>
            </OutlinedText>
            <OutlinedText stroke={1} color={graphics.theme.secondary}>
              <Text
                style={{
                  fontSize: SUBTITLE_FONT_SIZE,
                  color: '#FFFFFF',
                  fontFamily: 'Jomhuria-Regular',
                  letterSpacing: 7,
                }}>
                {`It's ${weather.temp}`}
              </Text>
            </OutlinedText>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 20,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 1)',
    height: 'fit-content',
  },
});
