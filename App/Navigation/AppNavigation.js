import { StackNavigator, DrawerNavigator } from 'react-navigation'
import ProfileScreen from '../Containers/ProfileScreen'
import HomeScreen from '../Containers/HomeScreen'
import LoginScreen from '../Containers/LoginScreen'

import styles from './Styles/NavigationStyles'

const MainDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Profile: {
    screen: ProfileScreen
  }
})

const PrimaryNav = StackNavigator({
  MainDrawerScreen: { screen: MainDrawer,
    navigationOptions: {
      header: null
    } },
  LoginScreen: { screen: LoginScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
