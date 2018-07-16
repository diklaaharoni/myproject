import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getTheme} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actions from '../actions';
import { connect } from 'react-redux';


const theme = getTheme();

const CompanyItem = (props) => {
  return(
    <View>
      <View style={[theme.cardStyle, styles.card]}>
        <Image
          source={require('../images/light-blue.jpg')}
          style={styles.image}
        />
        <Icon
          name={'business'}
          size={80}
          style={styles.icon}
        />
        <Text style={[theme.cardTitleStyle, styles.title]}>{props.companies.company}</Text>
        {props.companies.names.map((name) => {
          return (
            <TouchableWithoutFeedback key={name.uid}
              onPress={() => props.selectPerson(name.uid)}
            >
            <View>
              <Text   style={[theme.cardActionStyle, styles.action]}>
                {name.first_name} {name.last_name} - Project: {name.project}
              </Text>
            </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
  },
  title: {
    top: 20,
    left: 80,
    fontSize: 24,
    marginLeft: 15,
  },
  image: {
    height: 100,
    backgroundColor: 'rgba(60, 164, 240, 0.19)',
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
    backgroundColor: 'grey',
    color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

export default connect(null, actions)(CompanyItem);
