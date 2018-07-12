import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import firebase from 'firebase';
import Loader from './Loader'
import { login } from '../actions';


const LoginButton =  MKButton.coloredButton()
  .withText('Login')
  .build();

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    erroe: '',
    loading: false,
  };

  onButtonPress() {
    const { email, password } = this.state;
    const onStart = () => this.setState({error: '', loading: true});
    const onAuthSuccess = () => this.onAuthSuccess();
    const onAuthFailed = () => this.onAuthFailed();
    login(email, password, onAuthSuccess, onAuthFailed, onStart)
  }

  onAuthSuccess() {
    this.setState({
      email: '',
      password: '',
      erroe: '',
      loading: false,
    })
  }

  onAuthFailed() {
    this.setState({
      error: 'Authentication Failed',
      loading: false
    });
  }

  renderLoader() {
    if (this.state.loading) {
      return <Loader size='large' />;
    } else {
      return <LoginButton onPress={this.onButtonPress.bind(this)}/>
    }
  }

  render() {
    const {form, fieldStyles, loginButtonArea, errorMessage, text, container} = styles;
    return (
      <View style={form, container}>
        <Text style={text}>Login or Create a new account</Text>
        <MKTextField
          text={this.state.email}
          onTextChange={email => this.setState({ email })}
          textInputStyle={fieldStyles}
          placeholder={'Email'}
          tintColor={MKColor.Grey}
        />
        <MKTextField
          text={this.state.password}
          onTextChange={password => this.setState({ password })}
          textInputStyle={fieldStyles}
          placeholder={'Password'}
          tintColor={MKColor.Grey}
          password={true}
        />
        <Text style={errorMessage}>
          {this.state.error}
        </Text>
        <View style={loginButtonArea}>
          {this.renderLoader()}
        </View>
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
  text: {
    fontSize: 20,
    color: 'blue',
  },
});
