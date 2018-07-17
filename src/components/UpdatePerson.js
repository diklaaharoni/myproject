import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
// import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PropTypes from 'prop-types';




const UpdateButton = MKButton.coloredButton()
  .withText('UPDATE')
  .build();

const mapStateToProps = state => {
  const { avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook,
     twitter, project,  notes, uid } = state;
  return { avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook,
     twitter, project, notes, uid };

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
    project: PropTypes.string,
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
      const { avatarUri, first_name, last_name, phone, email, company, instagram, linkedin, facebook,
         twitter, project, notes, uid } = this.props;

      this.props.saveContact({ avatarUri, first_name, last_name, phone, email, company, instagram,
         linkedin, facebook, twitter, project, notes, uid });
    }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={styles.text}>UPDATE CONTACT</Text>
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
            placeholder={'Project...'}
            tintColor={MKColor.Blue}
            value={this.props.project}
            onChangeText={value => this.props.formUpdate({ prop: 'project', value})}
          />
          <MKTextField
            textInputStyle={styles.fieldStyles}
            placeholder={'Notes...'}
            tintColor={MKColor.Blue}
            value={this.props.notes}
            onChangeText={value => this.props.formUpdate({ prop: 'notes', value})}
          />
          <View style={styles.addButton}>
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
  addButton:{
    marginTop: 20,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
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
});
export default connect(mapStateToProps, actions)(UpdatePerson);
