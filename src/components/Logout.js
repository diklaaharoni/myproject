import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';
import Loader from './Loader'
import { logout } from '../actions';



export default class Logout extends React.Component {
  state = {
    email: '',
    password: '',
    erroe: '',
    loading: false,
  };

  static navigationOptions = {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'business'}
          size={50}
          style={[{color: tintColor}]}
        />
      )
  }

  componentDidMount() {
    logout()
  }

  render() {
    const {form} = styles;
    return (
      <View style={form}>
        <Text>You have been Logged out</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    paddingBottom: 10,
    width: 200,
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange,
    width: 200,
  },
  loginButtonArea: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    marginTop: 15,
    fontSize: 15,
    color: 'red',
    alignSelf: 'center',
  },
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
});
