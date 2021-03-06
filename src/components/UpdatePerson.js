import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';




const UpdateButton = MKButton.coloredButton()
  .withText('UPDATE')
  .build();

const AddImage = MKButton.coloredButton()
.withText('Update Image')
.build();

const AddCompanyImage = MKButton.coloredButton()
.withText('Update Company Logo')
.build();

const mapStateToProps = state => {
  const { companyUri, avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook,
     twitter, job_description,  notes, uid } = state;
  return { companyUri, avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook,
     twitter, job_description, notes, uid };

};
class UpdatePerson extends Component {
  static propTypes = {
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
    avatarUri: PropTypes.string,
    formUpdate: PropTypes.func,
    saveContact: PropTypes.func,
  }

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
    onUpdatePress() {
      const { companyUri, avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook,
         twitter, job_description, notes, uid } = this.props;

      this.props.saveContact({ companyUri, avatarUri, first_name, last_name, phone, email, company, instagram,
         linkedin, facebook, twitter, job_description, notes, uid });
    }

    updateImage = () => {
      ImagePicker.showImagePicker({
        title: 'Select your profile image',
        cancelButtonTitle: 'Cancel'
        }, response => {
        if (response.didCancel) {
          alert('cancel')
        }else if (response.error) {
          alert('sorry, not working')
        }else {
          console.log(response.data)
          this.props.addPhoto(response.data)
        }
      })
    }

    updateCompanyImage = () => {
      ImagePicker.showImagePicker({
        title: 'Select your company logo',
        cancelButtonTitle: 'Cancel'
        }, response => {
        if (response.didCancel) {
          alert('cancel')
        }else if (response.error) {
          alert('sorry, not working')
        }else {
          this.props.addCompanyPhoto(response.data)
        }
      })
    }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
        <View style={styles.header}>
          <Image
          source={{uri: 'data:image/jpeg;base64,' + this.props.avatarUri}}
          style={styles.avatar}
          />
          <Text style={styles.text}>UPDATE CONTACT</Text>
          <Image
          source={{uri: 'data:image/jpeg;base64,' + this.props.companyUri}}
          style={styles.avatar}
          />
          </View>
          <View style={styles.buttons}>
            <AddImage
              onPress={()=>this.updateImage()}
            />
            <AddCompanyImage
              onPress={()=>this.updateCompanyImage()}
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
          <View style={styles.updateButton}>
            <UpdateButton onPress={this.onUpdatePress.bind(this)}/>
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
  addButton: {
    marginTop: 20,
  },
  updateButton: {
    marginTop: 20,
    marginBottom: 40,
  },
  text: {
    fontSize: 24,
    marginLeft: 20,
    color: 'blue',
  },
  closeIcon: {
      position: 'absolute',
      top: 5,
      left: 345,
      color: 'grey',
      paddingTop: 10,
      backgroundColor: 'rgba(255,255,255,0)',
  },
  avatar: {
    width: 50,
    height: 50,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
export default connect(mapStateToProps, actions)(UpdatePerson);
