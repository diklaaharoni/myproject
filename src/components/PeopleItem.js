import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { getTheme} from 'react-native-material-kit';
// import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';
import PropTypes from 'prop-types';


const theme = getTheme();

const PeopleItem = (props) => {
  return(
    <TouchableWithoutFeedback
      onPress={() => props.selectPerson(props.people)}
      style={styles.container}
    >
      <View style={[theme.cardStyle, styles.card]}>
        <Image
          source={require('../images/light-blue.jpg')}
          style={styles.image}
        />
        <Image
          source={{uri: 'data:image/jpeg;base64,' + props.people.avatarUri}}
          size={100}
          style={styles.image2}
        />
        <Text style={[theme.cardTitleStyle, styles.title]}>{props.people.first_name} {props.people.last_name}</Text>
        <Text style={[theme.cardTitleStyle, styles.action]}>{props.people.company}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

PeopleItem.propTypes = {
    selectPerson: PropTypes.func,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    company: PropTypes.string,
    people: PropTypes.object,
  }

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  container: {
    width: '100%',
  },
  title: {
    top: 15,
    left: 80,
    fontSize: 24,
    marginLeft: 15,
  },
  image: {
    height: 100,
    // backgroundColor: 'rgba(60, 164, 240, 0.19)',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
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
  action: {
    top: 45,
    left: 80,
    fontSize: 16,
    marginLeft: 15,
    color: 'grey',
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 0,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

export default connect(null, actions)(PeopleItem);
