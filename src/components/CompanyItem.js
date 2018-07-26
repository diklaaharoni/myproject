import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getTheme} from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as actions from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



const theme = getTheme();

const CompanyItem = (props) => {
  console.log(props.companies);
  let companyImage;
  let companyUri = null;
  props.companies.names.forEach((name) => {
    if (name.companyUri !== undefined) {
      companyUri = name.companyUri;
    }
  });

  if (companyUri !== null) {
    companyImage = (
      <Image
        source={{uri: 'data:image/jpeg;base64,' + companyUri}}
        size={100}
        style={styles.image2}
      />
    );
  } else {
    companyImage = (
    <Icon
    name={'business'}
    size={80}
    style={styles.icon}
    />
  );
  }

  return(
    <View>
      <View style={[theme.cardStyle, styles.card]}>
        <Image
          source={require('../images/light-blue.jpg')}
          style={styles.image}
        />

        {companyImage}
        <Text style={[theme.cardTitleStyle, styles.title]}>{props.companies.company}</Text>
        {props.companies.names.map((name) => {
          return (
            <TouchableWithoutFeedback key={name.uid}
            >
            <View style={[theme.cardActionStyle, styles.action]}>
              <Text style={styles.nameDetails}>
                {name.first_name} {name.last_name}
              </Text>
              <Text style={styles.jobDetails}> {name.job_description} </Text>
            </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  )
}

CompanyItem.propTypes = {
    names: PropTypes.string,
    companies: PropTypes.object,
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
    backgroundColor: 'grey',
    // color: 'white',
    paddingTop: 5,
    paddingBottom: 5,
    // borderBottomWidth: 0.5,
    marginBottom: 0.5,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    flexDirection: 'row',
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0)',
  },
  nameDetails: {
    color: 'white',
    marginRight: 10,
  },
  jobDetails: {
    color: 'rgb(189,226,243)',
    top: 3,
    fontSize: 12,
  },
});

export default connect(null, actions)(CompanyItem);
