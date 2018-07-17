import React from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CompanyItem from './CompanyItem';
import PropTypes from 'prop-types';





const mapStateToProps = state => {
  const people = _.map(state.people, (val, uid) =>{
    return {...val, uid};
  });

  const unsortedCompanies =
  _.chain(people)
  .groupBy('company')
  .map((value, key) => {
    return {
      company: key,
      names: value,
    };
  })
  .value();
  const companies = _.orderBy(unsortedCompanies, ['company'], ['asc'])
  return {
    companies,
  }
}

class CompanyList extends React.Component {
  static propTypes = {
    companies: PropTypes.array,
  };

  static navigationOptions = {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'business'}
          size={50}
          style={[{color: tintColor}]}
        />
      )
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.companies);
    return (
      <View style={styles.container}>
      <ListView
        enableEmptySections={true}
        dataSource={this.dataSource}
        renderRow={(rowData) =>
          <CompanyItem companies={rowData} />
        }
      />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#e5e5e5',
  },

});

export default connect(mapStateToProps)(CompanyList)
