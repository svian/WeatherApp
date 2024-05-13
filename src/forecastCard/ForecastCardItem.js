import {Image, StyleSheet, Text, View} from 'react-native';
import {OutlinedText} from '../OutlinedText';

export default function ForecastCardItem(props) {
  function getBorders(index) {
    if (props.isLower) {
      if (index === 0) {
        return {
          borderBottomStartRadius: 20,
          width: '25%',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
          paddingVertical: 5,
        };
      } else if (index === 3) {
        return {
          borderBottomEndRadius: 20,
          width: '25%',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
          paddingVertical: 5,
        };
      } else {
        return {
          width: '25%',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
          paddingTop: 5,
          paddingBottom: 7,
        };
      }
    } else {
      return {
        width: '25%',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingVertical: 5,
      };
    }
  }

  return (
    <View style={styles.container}>
      {props.forecast.map((item, index) => {
        return (
          <View key={index} style={getBorders(index)}>
            <Text style={styles.text}>
              {item.time == 12
                ? '12pm'
                : item.time > 12
                ? `${item.time - 12}pm`
                : item.time === '00'
                ? '12am'
                : `${item.time[1]}am`}
            </Text>
            <Image
              style={{
                height: 55,
                width: 55,
              }}
              source={require('../../assets/icons/simple/CloudyNightSimple.png')}
            />
            <View style={{paddingLeft: 10}}>
              <Text style={styles.text}>{item.temp}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 1.5,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  box: {
    width: '25%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 5,
  },
  text: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Jomhuria-Regular',
    letterSpacing: 7,
    marginVertical: -15,
  },
});
