import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';

const theme = getTheme();

const mapStateToProps = state => {
  return {
    person: state.personSelected,
    toUpdate: state.toUpdate,
   };
};



class DetailsView extends Component {
    handleClick = (link) => {
        Linking.canOpenURL(link).then(suppported => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log('Don\'t know how to open URI: ' + link);
            }
        });
    };


  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[theme.cardStyle, styles.card]}>
          <Image
              source={require('../images/light-blue.jpg')}
              style={[theme.cardImageStyle, styles.image]}
          />
          <Image
              source={{uri: this.props.person.image}}
              style={[theme.cardImageStyle, styles.image2]}
              size={100}
          />
          <SimpleIcon name={'arrow-left-circle'} size={30} style={styles.closeIcon}
              onPress={() => this.props.noneSelected()} />
          <Text style={[theme.cardTitleStyle, styles.title1]}>{this.props.person.first_name} {this.props.person.last_name}</Text>
          <Text style={[theme.cardTitleStyle, styles.title2]}>from {this.props.person.company}</Text>
          <View style={styles.textArea}>
             <MaterialIcon name={'phone'} size={40} style={styles.textIcons}/>
             <Text style={theme.cardContentStyle}>{this.props.person.phone}</Text>
          </View>
          <View style={styles.textArea}>
             <MaterialIcon name={'email'} size={40} style={styles.textIcons}/>
             <Text style={theme.cardContentStyle}>{this.props.person.email}</Text>
          </View>
          <View style={styles.textArea}>
             <MaterialIcon name={'assignment'} size={40} style={styles.textIcons}/>
             <Text style={theme.cardContentStyle}>{this.props.person.project}</Text>
          </View>
          <View style={styles.textArea}>
             <MaterialIcon name={'mode-edit'} size={40} style={styles.textIcons}/>
             <Text style={theme.cardContentStyle}>{this.props.person.notes}</Text>
          </View>
          <View style={styles.editArea}>
              <TouchableOpacity style={styles.sections}
                 onPress={() => { this.props.updateContact(this.props.person)}}>
                 <MaterialIcon name={'autorenew'} size={40} style={styles.editIcon}/>
                 <Text style={styles.editDeleteText}>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sections}
                 onPress={() => { this.props.deleteContact(this.props.person.uid)}}>
                 <MaterialIcon name={'delete-forever'} size={40} style={styles.editIcon}/>
                 <Text style={styles.editDeleteText}>DELETE</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.actionArea}>
              <TouchableOpacity
                  onPress={() => { this.handleClick(`tel:${this.props.person.phone}`)}}
              >
                  <Image source={require('../images/call.png')} style={styles.actionImage}/>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => { this.handleClick(`sms:${this.props.person.phone}`)}}
              >
                  <Image source={require('../images/sms.png')} style={styles.actionImage}/>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => { this.handleClick(`mailto:${this.props.person.email}`)}}
              >
                  <Image source={require('../images/email.png')} style={styles.actionImage}/>
              </TouchableOpacity>
          </View>
          <View style={styles.actionArea}>
              <Text>Call</Text>
              <Text>SMS</Text>
              <Text>Email</Text>
          </View>
        </View>
      </ScrollView>
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
      fontSize: 22,
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

export default connect(mapStateToProps, actions)(DetailsView);
