import React from 'react'
import { Image } from 'react-native'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import DetailForum from '../Containers/DetailForum'
import KomentarScreen from '../Containers/KomentarScreen'
import UpdateProfileScreen from '../Containers/UpdateProfileScreen'
import UbahPasswordScreen from '../Containers/UbahPasswordScreen'
import DetailPengajuan from '../Containers/DetailPengajuan'
import PengajuanSaya from '../Containers/PengajuanSaya'
import TambahPengajuan from '../Containers/TambahPengajuan'
import TambahPengajuanRehabRumah from '../Containers/RehabRumah'
import LaunchScreen from '../Containers/LaunchScreen'
import PilihJenisPengajuan from '../Containers/PilihJenisPengajuan'
import { NotificationsScreen } from '../Containers/Notifications'
import { DaftarRealisasi } from '../Containers/Realisasi'
import { DetailRealisasi } from '../Containers/DetailRealisasi'
import { ForumList } from '../Containers/Forum'
import { TambahRealisasi } from '../Containers/TambahRealisasi'

import ProfileScreen from '../Containers/ProfileScreen'
import HomeScreen from '../Containers/HomeScreen'
import LoginScreen from '../Containers/LoginScreen'

import {DrawerButton} from '../Components/Button'
import DrawerContent from '../Containers/DrawerContent'
import { Colors, Images } from '../Themes'
import styles from './Styles/NavigationStyles'
import { FORUM_TYPE } from '../Containers/Forum/constant'

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
    screen: props => <ForumList {...props} type={FORUM_TYPE.SATPOL_PP} />,
    navigationOptions: {
      drawerLabel: 'Forum Satpol PP',
      title: 'Forum',
      drawerIcon: ({focused}) => <Image source={Images.ic_forum} style={styles.sidebarIcon} />
    }
  },
  ForumYasinan: {
    screen: props => <ForumList {...props} type={FORUM_TYPE.YASINAN} />,
    navigationOptions: {
      drawerLabel: 'Forum Yasinan',
      title: 'Forum',
      drawerIcon: ({focused}) => <Image source={Images.ic_forum} style={styles.sidebarIcon} />
    }
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
  DetailForum: { screen: DetailForum },
  KomentarScreen: { screen: KomentarScreen },
  UpdateProfileScreen: { screen: UpdateProfileScreen },
  UbahPasswordScreen: { screen: UbahPasswordScreen },
  TambahRealisasi: { screen: TambahRealisasi },
  DetailRealisasi: { screen: DetailRealisasi },
  Notifications: { screen: NotificationsScreen },
  DetailPengajuan: { screen: DetailPengajuan },
  PengajuanSaya: { screen: PengajuanSaya },
  TambahPengajuan: { screen: TambahPengajuan },
  TambahPengajuanRehabRumah: { screen: TambahPengajuanRehabRumah },
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
