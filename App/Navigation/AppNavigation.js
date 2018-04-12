import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import ReportChooserScreen from '../Containers/ReportChooserScreen'
import PelaporanScreen from '../Containers/PelaporanScreen'
import ContactUsScreen from '../Containers/ContactUsScreen'
import InfoScreen from '../Containers/InfoScreen'

import ProfileScreen from '../Containers/ProfileScreen'
import HomeScreen from '../Containers/HomeScreen'
import LoginScreen from '../Containers/LoginScreen'

import {DrawerButton} from '../Components/Button'
import DrawerContent from '../Containers/DrawerContent'
import { Colors } from '../Themes'
import styles from './Styles/NavigationStyles'

const MainDrawer = DrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Profile: {
    screen: ProfileScreen
  },
  Info: { screen: InfoScreen },
  HubungiKami: { screen: ContactUsScreen }
}, {
  drawerWidth: 300,
  contentComponent: (props) => {
    return (
      <DrawerContent {...props} />
    )
  }
})

const MainDrawerNavigation = StackNavigator({
  MainScreen: {screen: MainDrawer}
}, {
  headerMode: 'none',
  navigationOptions: ({navigation}) => ({
    headerLeft: <DrawerButton navigation={navigation} />,
    headerStyle: styles.header,
    headerTintColor: Colors.snow,
    headerTitleStyle: styles.headerTitle,
    headerBackTitle: null
  })
})

const PrimaryNav = StackNavigator({
  ReportChooserScreen: { screen: ReportChooserScreen },
  PelaporanScreen: { screen: PelaporanScreen },
  MainDrawerScreen: { screen: MainDrawerNavigation },
  LoginScreen: { screen: LoginScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTintColor: Colors.snow,
    headerTitleStyle: styles.headerTitle,
    headerBackTitle: null
  }
})

export default PrimaryNav
