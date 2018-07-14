import React from 'react';
import { TextInput, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import PeopleItem from './PeopleItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import PeopleDetail from './PeopleDetail';
import { loadInitialContacts } from '../actions';
import { Button } from 'react-native-elements';

const mapStateToProps = state => {
  const people = _.map(state.people, (val, uid) =>{
    return {...val, uid};
  });
  return {
    people,
    detailView: state.detailView,
  }
}

class ContactList extends React.Component {
  static navigationOptions = {
      tabBarLabel: 'Contacts',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'user'}
          size={50}
          style={[{color: tintColor}]}
        />
      )
  }
  UNSAFE_componentWillMount() {
    this.props.loadInitialContacts();
  }

  renderInitialView() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.dataSource = ds.cloneWithRows(this.props.people);

    if (this.props.detailView === true) {
      return(
        <PeopleDetail />
      );
    } else {
      return(
      <ListView
        enableEmptySections={true}
        dataSource={this.dataSource}
        renderRow={(rowData) =>
          <PeopleItem people={rowData} />
        }
      />
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchText}
            placeholder="Search..."
          />
          <Button
            buttonStyle={styles.buttonStyle}
            title="Search"
            onPress={() => {console.log("click");}}
          />
        </View>
        <View>
          {this.renderInitialView()}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 400,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  searchBar: {
    flexDirection: 'row',
  },
  searchText: {
    flex: 1,
  },
  buttonStyle: {
    height: 40,
    marginBottom: 8,
  },
});

export default connect(mapStateToProps, {loadInitialContacts})(ContactList);
