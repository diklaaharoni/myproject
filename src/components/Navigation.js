import { createBottomTabNavigator } from 'react-navigation';
import ContactList from './ContactList';
import CompanyList from './CompanyList';
import AddPerson from './AddPerson';
import Logout from './Logout';



const Navigation = createBottomTabNavigator({
  ContactList: {screen: ContactList},
  AddPerson: {screen: AddPerson},
  CompanyList: {screen: CompanyList},
  Logout: {screen: Logout}
},{
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'rgb(189,226,243)',
    swipeEnable: true,
    showLabel: false,
    style: {
      backgroundColor: 'grey',
      marginTop: 10,
    },
  },
});

export default Navigation;
