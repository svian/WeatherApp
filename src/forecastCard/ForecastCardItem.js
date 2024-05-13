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
    // switch (index) {
    //   case 4:
    //     return {
    //       borderBottomStartRadius: 20,
    //       width: '25%',
    //       alignItems: 'center',
    //       backgroundColor: 'rgba(0,0,0,0.2)',
    //       paddingVertical: 5,
    //     };
    //   default:
    //     return {
    //       width: '25%',
    //       alignItems: 'center',
    //       backgroundColor: 'rgba(0,0,0,0.2)',
    //       paddingVertical: 5,
    //     };
    // }
  }

  return (
    <View style={styles.container}>
      {props.forecast.map((item, index) => {
        return (
          <View key={index} style={getBorders(index)}>
            <OutlinedText stroke={1} color={props.theme.secondary}>
              <Text style={styles.text}>
                {item.time == 12
                  ? '12pm'
                  : item.time > 12
                  ? `${item.time - 12}pm`
                  : item.time === '00'
                  ? '12am'
                  : `${item.time[1]}am`}
              </Text>
            </OutlinedText>
            <Image
              style={{
                height: 60,
                width: 55,
              }}
              source={require('../../assets/icons/simple/CloudyNightSimple.png')}
            />
            <OutlinedText stroke={1} color={props.theme.secondary}>
              <Text style={styles.text}>{item.temp}</Text>
            </OutlinedText>
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
