import React from 'react'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import DetailPengajuan from '../Containers/DetailPengajuan'
import PengajuanSaya from '../Containers/PengajuanSaya'
import TambahPengajuan from '../Containers/TambahPengajuan'
import LaunchScreen from '../Containers/LaunchScreen'
import PilihJenisPengajuan from '../Containers/PilihJenisPengajuan'
import { NotificationsScreen } from '../Containers/Notifications'
import { DaftarRealisasi } from '../Containers/Realisasi'
import { DetailRealisasi } from '../Containers/DetailRealisasi'
import { ForumSatpolPp, ForumYasinan } from '../Containers/Forum'

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
  NewSubmission: {
    screen: PilihJenisPengajuan
  },
  PengajuanSaya: {
    screen: PengajuanSaya
  },
  Realisasi: {
    screen: DaftarRealisasi
  },
  ForumSatpolPp: {
    screen: ForumSatpolPp
  },
  ForumYasinan: {
    screen: ForumYasinan
  },
  Profile: {
    screen: ProfileScreen
  }
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
  DetailRealisasi: { screen: DetailRealisasi },
  Notifications: { screen: NotificationsScreen },
  DetailPengajuan: { screen: DetailPengajuan },
  PengajuanSaya: { screen: PengajuanSaya },
  TambahPengajuan: { screen: TambahPengajuan },
  LaunchScreen: { screen: LaunchScreen },
  PilihJenisPengajuan: { screen: PilihJenisPengajuan },
  MainDrawerScreen: { screen: MainDrawerNavigation },
  LoginScreen: { screen: LoginScreen }
}, {
  // Default config for all screens
  headerMode: 'screen',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTintColor: Colors.snow,
    headerTitleStyle: styles.headerTitle,
    headerBackTitle: null
  }
})

export default PrimaryNav
