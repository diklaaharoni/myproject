import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ImagePicker from 'react-native-image-picker';



const AddButton = MKButton.coloredButton()
.withText('ADD')
.build();

const mapStateToProps = state => {
  const { first_name, last_name, phone, email, company, instagram, linkedin, facebook, twitter, project, notes } = state;
  return { first_name, last_name, phone, email, company, instagram, linkedin, facebook, twitter, project, notes };

};
class AddPerson extends Component {
  constructor() {
    super();
    this.state = {
      avatar: '',
    }
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
  onAddPress() {
    const { first_name, last_name, phone, email, company, instagram, linkedin, facebook, twitter, project, notes } = this.props;

    this.props.createNewContact({ first_name, last_name, phone, email, company, instagram, linkedin, facebook, twitter, project, notes });

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
        this.setState({
          avatar: response.uri
        })
      }
    })
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.form}>
      <Text style={styles.text}>ADD A NEW CONTACT</Text>
      <View>
      <Image sorce={{uri: this.state.avatar}}
      style={styles.avatar}
      />
      <Button
      title='Add Image'
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
    color: 'blue',
  },
  avatar: {
    width: 50,
    height: 50,
  },
});
export default connect(mapStateToProps, actions)(AddPerson);
