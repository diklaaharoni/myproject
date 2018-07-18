import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Share } from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
// import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
// import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';
import PropTypes from 'prop-types';


const theme = getTheme();

const mapStateToProps = state => {
  return {
    person: state.personSelected,
    toUpdate: state.toUpdate,
    userId: state.userId
   };
};



class DetailsView extends Component {
  static propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    person: PropTypes.object,
    avatar: PropTypes.string,
    updateContact:PropTypes.func,
    deleteContact:PropTypes.func,
    noneSelected:PropTypes.func,
  };

    handleClick = (link) => {
      console.log("link", link);
        Linking.canOpenURL(link).then(suppported => {
            if (suppported) {
                Linking.openURL(link);
            } else {
                console.log('Don\'t know how to open URI: ' + link);
            }
        });
    };

    share = () => {
      const person = this.props.person
       Share.share({message: `${person.first_name}
          ${person.last_name} ${person.phone} ${person.email}
           ${person.company} ${person.instagram}
            ${person.linkedin} ${person.facebook} ${person.twitter} ${person.project} ${person.notes}` })
    }


  render() {
console.log("bla", this.props.userId);
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[theme.cardStyle, styles.card]}>
          <Image
              source={require('../images/light-blue.jpg')}
              style={[theme.cardImageStyle, styles.image]}
          />
          <Image
              source={{uri: 'data:image/jpeg;base64,' + this.props.person.avatarUri}}
              style={[theme.cardImageStyle, styles.image2]}
              size={100}
          />
          <SimpleIcon name={'arrow-left-circle'} size={30} style={styles.closeIcon}
              onPress={() => this.props.noneSelected()} />
          <Text style={[theme.cardTitleStyle, styles.title1]}>{this.props.person.first_name} {this.props.person.last_name}</Text>
          <Text style={[theme.cardTitleStyle, styles.title2]}>{this.props.person.company}</Text>
         <View style={styles.shareArea}>
              <Text style={theme.cardContentStyle}>Share</Text>
            <TouchableOpacity
                onPress={this.share}
            >
                <Image source={require('../images/share_img.png')} style={styles.textIcons}/>
            </TouchableOpacity>
              <Text style={theme.cardContentStyle}>Contact</Text>
          </View>
          {!!this.props.person.phone &&
          <View style={styles.textArea}>
          <TouchableOpacity
              onPress={() => { this.handleClick(`tel:${this.props.person.phone}`)}}
          >
              <Image source={require('../images/call.png')} style={styles.textIcons}/>
          </TouchableOpacity>
             <Text style={theme.cardContentStyle}>{this.props.person.phone}</Text>
          </View>
        }
          {!!this.props.person.phone &&
          <View style={styles.textArea}>
          <TouchableOpacity
              onPress={() => { this.handleClick(`sms:${this.props.person.phone}`)}}
          >
              <Image source={require('../images/sms.png')} style={styles.textIcons}/>
          </TouchableOpacity>
             <Text style={theme.cardContentStyle}>{this.props.person.phone}</Text>
          </View>
        }
          {!!this.props.person.email &&
          <View style={styles.textArea}>
          <TouchableOpacity
              onPress={() => { this.handleClick(`mailto:${this.props.person.email}`)}}
          >
          <Image source={require('../images/email.png')} style={styles.textIcons}/>
          </TouchableOpacity>
             <Text style={theme.cardContentStyle}>{this.props.person.email}</Text>
          </View>
        }
          {!!this.props.person.project &&
            <View style={styles.textArea}>
               <MaterialIcon name={'assignment'} size={40} style={styles.icon}/>
               <Text style={theme.cardContentStyle}>{this.props.person.project}</Text>
            </View>
          }
          {!!this.props.person.notes &&
          <View style={styles.textArea}>
             <MaterialIcon name={'mode-edit'} size={40} style={styles.icon}/>
             <Text style={theme.cardContentStyle}>{this.props.person.notes}</Text>
          </View>
        }
        {this.props.person.created_by === this.props.userId &&
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
        }

          <View style={styles.actionArea}>
            {!!this.props.person.instagram &&
              <TouchableOpacity
                  onPress={() => { this.handleClick(`${this.props.person.instagram}`)}}
              >
                  <Image source={require('../images/instagram_logo.png')} style={styles.textIcons}/>
              </TouchableOpacity>
            }
            {!!this.props.person.linkedin &&
              <TouchableOpacity
                  onPress={() => { this.handleClick(`${this.props.person.linkedin}`)}}
              >
                  <Image source={require('../images/linkedin_logo.png')} style={styles.textIcons}/>
              </TouchableOpacity>
            }
            {!!this.props.person.facebook &&
              <TouchableOpacity
                  onPress={() => { this.handleClick(`${this.props.person.facebook}`)}}
              >
                  <Image source={require('../images/facebook_logo.png')} style={styles.textIcons}/>
              </TouchableOpacity>
            }
            {!!this.props.person.twitter &&
              <TouchableOpacity
                  onPress={() => { this.handleClick(`${this.props.person.twitter}`)}}
              >
                  <Image source={require('../images/twitter_logo.png')} style={styles.textIcons}/>
              </TouchableOpacity>
            }
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
      color: 'orange',
      marginBottom: 20,
      marginLeft: 10,
  },
  textArea: {
      flexDirection: 'row',
      paddingLeft: 20,
      paddingTop: 10,
      width: 260,
  },
  shareArea: {
      flexDirection: 'row',
      justifyContent: 'center',
  },
  textIcons: {
      height:60,
      width: 60,
      marginBottom: 10,
  },
  actionArea: {
      paddingTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
  },
  actionImage: {
    color: 'orange',
  },
  editIcon: {
    color: '#26a6e4',
    marginLeft: 10,
  },
  sections: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    width: 100,
  },
  deleteIcon: {
    color: '#e9a69a',
    marginLeft: 10,
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
