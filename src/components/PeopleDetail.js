import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';
import DetailsView from './DetailsView';
import UpdatePerson from './UpdatePerson';
import PropTypes from 'prop-types';


const theme = getTheme();

const mapStateToProps = state => {
  return {
    toUpdate: state.toUpdate,
   };
};

class PeopleDetail extends Component {
  static propTypes = {
    toUpdate: PropTypes.bool,
  };

    renderDetails() {
      if (this.props.toUpdate) {
        return <UpdatePerson />
      } else {
        return <DetailsView />
      }
    }
  render() {
    return (
      <View>
        {this.renderDetails()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
    borderColor: 'lightgrey',
    borderWidth: 0.5,
  },
  title1: {
      top: 10,
      left: 80,
      fontSize: 24,
      marginLeft: 10,
  },
  title2: {
      top: 35,
      left: 82,
      fontSize: 15,
      marginLeft: 10,
      color: 'gray',
  },
  image: {
      flex: 0,
      height: 100,
      width: 395,
      position: 'relative',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      borderRadius: 5,
  },
  image2: {
      borderRadius: 10,
      marginTop: 10,
      width: 80,
      height:80,
      marginLeft: 10,
      marginRight: 10,
      position: 'absolute',
  },
  closeIcon: {
      position: 'absolute',
      top: 5,
      left: 345,
      color: 'grey',
      paddingTop: 10,
      backgroundColor: 'rgba(255,255,255,0)',
  },
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
  textArea: {
      flexDirection: 'row',
      paddingLeft: 20,
      paddingTop: 10,
      width: 260,
  },
  textIcons: {
      color: 'rgba(246, 108, 9, 0.71)',
  },
  actionArea: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  actionImage: {
    width: 80,
    height: 80,
  },
  editIcon: {
    color: '#26a6e4',

  },
  sections: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    width: 100,
  },
  deleteIcon: {
    color: '#e9a69a',
  },
  editDeleteText: {
    marginTop: 10,
    paddingBottom: 20,
    marginBottom: 20,
  },
  editDeleteArea: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211, 0.3)',
    marginBottom: 10,
  },
});

export default connect(mapStateToProps, actions)(PeopleDetail);
