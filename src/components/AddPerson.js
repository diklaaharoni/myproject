import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';




const AddButton = MKButton.coloredButton()
.withText('SAVE')
.build();

const AddImage = MKButton.coloredButton()
.withText('ADD IMAGE')
.build();

const mapStateToProps = state => {
  const { avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook, twitter, job_description,
     notes } = state;
  return { avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook,
     twitter, job_description, notes };

};
class AddPerson extends Component {
  static propTypes = {
    avatarUri: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.string,
    instagram: PropTypes.string,
    linkedin: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    job_description: PropTypes.string,
    notes: PropTypes.string,
    uid: PropTypes.string,
    createNewContact:PropTypes.func,
    navigation:PropTypes.object,
    formUpdate:PropTypes.func,
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     avatar: '',
  //   }
  // }
  static navigationOptions = {
    tabBarLabel: 'Contacts',
    tabBarIcon: ({ tintColor }) => (
      <Icon
      name={'plus'}
      size={50}
      style={[{color: tintColor}, styles.icon]}
      />
    )
  }
  onAddPress() {
    const { avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook,
       twitter,
       job_description, notes } = this.props;

    this.props.createNewContact({ avatarUri, first_name, last_name, phone, email, company, instagram, linkedin,
       facebook, twitter, job_description, notes });

    this.props.navigation.navigate('PeopleList');
  }

  addImage = () => {
    ImagePicker.showImagePicker({
      title: 'Select your profile image',
      cancelButtonTitle: 'Cancel'
      }, response => {
      if (response.didCancel) {
        alert('cancel')
      }else if (response.error) {
        alert('sorry, not working')
      }else {
        this.props.addPhoto(response.data)
      }
    })
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.text}>CREATE YOUR CARD</Text>
        <View>
          <Image
            source={{uri: 'data:image/jpeg;base64,' + this.props.avatarUri}}
            style={styles.avatar}
          />
          <AddImage
            onPress={()=>this.addImage()}
          />
        </View>
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'First name...'}
          tintColor={MKColor.Blue}
          value={this.props.first_name}
          onChangeText={value => this.props.formUpdate({ prop: 'first_name', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Last name...'}
          tintColor={MKColor.Blue}
          value={this.props.last_name}
          onChangeText={value => this.props.formUpdate({ prop: 'last_name', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Phone number...'}
          tintColor={MKColor.Blue}
          value={this.props.phone}
          onChangeText={value => this.props.formUpdate({ prop: 'phone', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Email...'}
          tintColor={MKColor.Blue}
          value={this.props.email}
          onChangeText={value => this.props.formUpdate({ prop: 'email', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Company...'}
          tintColor={MKColor.Blue}
          value={this.props.company}
          onChangeText={value => this.props.formUpdate({ prop: 'company', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Instagram...'}
          tintColor={MKColor.Blue}
          value={this.props.instagram}
          onChangeText={value => this.props.formUpdate({ prop: 'instagram', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'LinkedIn...'}
          tintColor={MKColor.Blue}
          value={this.props.linkedin}
          onChangeText={value => this.props.formUpdate({ prop: 'linkedin', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Facebook...'}
          tintColor={MKColor.Blue}
          value={this.props.facebook}
          onChangeText={value => this.props.formUpdate({ prop: 'facebook', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Twitter...'}
          tintColor={MKColor.Blue}
          value={this.props.twitter}
          onChangeText={value => this.props.formUpdate({ prop: 'twitter', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Job Description...'}
          tintColor={MKColor.Blue}
          value={this.props.job_description}
          onChangeText={value => this.props.formUpdate({ prop: 'job_description', value})}
          />
          <MKTextField
          textInputStyle={styles.fieldStyles}
          placeholder={'Notes...'}
          tintColor={MKColor.Blue}
          value={this.props.notes}
          onChangeText={value => this.props.formUpdate({ prop: 'notes', value})}
          />
          <View style={styles.addButton}>
          <AddButton onPress={this.onAddPress.bind(this)}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  fieldStyles: {
    height: 40,
    color: MKColor.Orange,
  },
  addButton:{
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    color: 'grey',
  },
  avatar: {
    width: 50,
    height: 50,
  },
});
export default connect(mapStateToProps, actions)(AddPerson);
