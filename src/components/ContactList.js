import React from 'react';
import { TextInput, View, ListView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import PeopleItem from './PeopleItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import PeopleDetail from './PeopleDetail';
// import { loadInitialContacts } from '../actions';
import { Button } from 'react-native-elements';
import * as actions from '../actions';
import PropTypes from 'prop-types';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';



const mapStateToProps = state => {
  const unsortedPeople = _.map(state.people, (val, uid) =>{
    return {...val, uid, full_name: `${val.first_name} ${val.last_name}`};
  });
  const people = _.orderBy(unsortedPeople, ['full_name'], ['asc'])
  return {
    people,
    searchTerm: '',
    detailView: state.detailView,
  }
}

class ContactList extends React.Component {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
    }
  }

  static propTypes = {
    detailView: PropTypes.bool,
    people: PropTypes.array,
    loadInitialContacts:PropTypes.func,
    loadFilteredContacts:PropTypes.func,
  };

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

  handelSearch()  {
    // this.props.loadInitialContacts();
    console.log(this.state);
    this.props.loadFilteredContacts(this.state.searchTerm)
  }

  deleteSearch()  {
    // this.props.loadInitialContacts();

    console.log(this.state);
    this.props.loadInitialContacts();
    this.setState({
      searchTerm: "",
    });
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
            value={this.state.searchTerm}
            onChangeText={(text) => this.setState({searchTerm: text})}
          />
          <SimpleIcon name={'close'} size={20} style={styles.closeIcon}
              onPress={() => this.deleteSearch()} />
          <Button
            buttonStyle={styles.buttonStyle}
            title="Search"
            onPress={() => this.handelSearch()}
          />
        </View>
        <View style={styles.list}>
          {this.renderInitialView()}
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    marginBottom: 40,
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
  list: {
    marginRight: 10,
  },
  closeIcon: {
    paddingTop: 10,
  },
});

export default connect(mapStateToProps, actions)(ContactList);
