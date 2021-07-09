import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  text: {
    alignSelf: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailsButton: {
    backgroundColor: '#FF4862',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  cartButton: {
    backgroundColor: '#00CEFF',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
  },
  image: {
    height: 200,
    width: 300,
    aspectRatio: 1,
    alignSelf: 'center',
  },
});
