import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StyleSheet, Platform, Linking } from 'react-native';
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import reducers from '../reducers/ContactReducer';
import Thunk from 'redux-thunk';
import { YellowBox } from 'react-native';
import _ from 'lodash';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
   window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));


export default class App extends React.Component {
  state = { loggedIn: null }
  componentDidMount() {
    const firebase = require("firebase")
    firebase.initializeApp({
      apiKey: "AIzaSyBJDEqZKq936PyhrzOjV4CsIhO2z9h51ZA",
      authDomain: "myproject-17b44.firebaseapp.com",
      databaseURL: "https://myproject-17b44.firebaseio.com",
      projectId: "myproject-17b44",
      storageBucket: "myproject-17b44.appspot.com",
      messagingSenderId: "563231765470"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        console.log(user);
        this.setState({loggedIn: true, userId: user.uid})
      } else {
        this.setState({loggedIn: false})
      }
    })

    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        this.navigateToProperRoute(url);
      });
    } else {
        Linking.addEventListener('url', this.handleOpenURL);
      }
    }

    componentWillUnmount() { // C
      Linking.removeEventListener('url', this.handleOpenURL);
    }

    handleOpenURL = (event) => { // D
      this.navigateToProperRoute(event.url);
    }

    navigateToProperRoute = (url) => { // E
      if (url) {
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];

        if (routeName === 'contact') {
          console.log(route, id);
          //navigate('People', { id, name: 'chris' })
        }
      }
    }

  renderInitialView() {
    switch (this.state.loggedIn) {
      case true:
        return <Navigation />
      case false:
        return <Login />
      default:
        return <Loader size='large' />
    }
  }
  render() {
    return (
      <Provider store={store} style={styles.container}>
          {this.renderInitialView()}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
