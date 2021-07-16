import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView1: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  cardView: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87CEFA',
  },
  input: {
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    width: '90%',
    fontWeight: 'bold',
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  login: {
    borderRadius: 20,
    backgroundColor: '#24a0ed',
    padding: 15,
    width: '30%',
  },
  signup: {
    borderRadius: 20,
    backgroundColor: '#ec24a0',
    padding: 15,
    width: '30%',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  backGround: {
    height: '100%',
    width: '100%',
  },
});
