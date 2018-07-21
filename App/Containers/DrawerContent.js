import React, { Component } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { DrawerItems, NavigationActions } from 'react-navigation'
import { Divider } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'
import _ from 'lodash'

// redux
import AuthActions from '../Redux/AuthRedux'

import { Avatar } from '../Components/General'

// Styles
import styles from './Styles/DrawerContentStyle'
import { Colors, Images } from '../Themes'

class DrawerContent extends Component {
  constructor (props) {
    super(props)

    this.openLogin = this.openLogin.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.accessToken === null) {
      this.openLogin()
    }
  }

  openLogin = () => {
    this.props.navigation.dispatch(
      NavigationActions.reset({
        key: null,
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'LoginScreen',
            params: {}
          })
        ]
      })
    )
  }

  render () {
    const { user, items, ...rest } = this.props
    if (!user) {
      return null
    }
    const hiddenMenus = ['Home', 'Profile']
    const filteredItems = items.filter(item => !_.includes(hiddenMenus, item.key))
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar source={{uri: user.avatar}}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7} large rounded />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>
        <ScrollView>
          <Touchable onPress={() => this.props.navigation.navigate('Profile')}>
            <View style={styles.logoutContainer}>
              <Image source={Images.ic_profil} style={styles.sidebarIcon} />
              <Text style={[styles.menuText, {marginLeft: 17}]}>Akun</Text>
            </View>
          </Touchable>
          <Touchable onPress={() => this.props.navigation.navigate('Home')}>
            <View style={styles.logoutContainer}>
              <Image source={Images.ic_home} style={styles.sidebarIcon} />
              <Text style={[styles.menuText, {marginLeft: 17}]}>Home</Text>
            </View>
          </Touchable>
          <Divider style={styles.divider} />
          <DrawerItems items={filteredItems} {...rest}
            getLabel={(scene) => (
              <View style={{ paddingVertical: 15 }}>
                <Text style={styles.menuText}>{this.props.getLabel(scene)}</Text>
              </View>)}
            activeTintColor={Colors.gray} inactiveTintColor={Colors.gray}
            activeBackgroundColor={Colors.tabActive} itemStyle={styles.drawerItem} />
          <Divider style={styles.divider} />
          <Touchable onPress={() => this.props.logout()}>
            <View style={styles.logoutContainer}>
              <Image source={Images.logout} style={styles.sidebarIcon} />
              <Text style={[styles.menuText, {marginLeft: 17}]}>Logout</Text>
            </View>
          </Touchable>
          <Divider style={styles.divider} />
        </ScrollView>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.auth.accessToken,
    user: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
