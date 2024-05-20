import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const FONT_SIZE = windowHeight / 25;

export default function ForecastCardItem(props) {
  function getBorders(index) {
    if (props.isLower) {
      if (index === 0) {
        return {
          borderBottomStartRadius: 20,
          width: '30%',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
          paddingVertical: 5,
        };
      } else if (index === 3) {
        return {
          borderBottomEndRadius: 20,
          width: '30%',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
          paddingVertical: 5,
        };
      } else {
        return {
          width: '30%',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.2)',
          paddingTop: 5,
          paddingBottom: 7,
        };
      }
    } else {
      return {
        width: '30%',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingVertical: 5,
      };
    }
  }

  function formatTime(time) {
    if (time == 0) {
      return '12am';
    } else {
      if (time < 12) {
        if (time[0] == 0) {
          return `${time[1]}am`;
        }
        return `${time}am`;
      } else {
        return `${time - 12}pm`;
      }
    }
  }

  return (
    <View style={styles.container}>
      {props.forecast.map((item, index) => {
        return (
          <View key={index} style={getBorders(index)}>
            <Text style={styles.text}>{formatTime(item.time)}</Text>
            <Image
              resizeMode="contain"
              style={{
                height: windowHeight / 10,
              }}
              source={item.icon}
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
    columnGap: 2,
    paddingHorizontal: 15,
    justifyContent: 'center',
    width: '91%',
  },
  box: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 5,
  },
  text: {
    fontSize: FONT_SIZE,
    color: '#FFFFFF',
    fontFamily: 'Jomhuria-Regular',
    letterSpacing: 7,
    marginVertical: -15,
  },
});
