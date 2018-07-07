import React, { Component } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { DrawerItems, NavigationActions } from 'react-navigation'
import { Avatar } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'

// redux
import AuthActions from '../Redux/AuthRedux'

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
    const { user } = this.props
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
          <DrawerItems {...this.props}
            getLabel={(scene) => (
              <View style={{ paddingVertical: 15 }}>
                <Text style={styles.menuText}>{this.props.getLabel(scene)}</Text>
              </View>)}
            activeTintColor={Colors.gray} inactiveTintColor={Colors.gray}
            activeBackgroundColor={Colors.tabActive} itemStyle={styles.drawerItem} />
          <Touchable onPress={() => this.props.logout()}>
            <View style={styles.logoutContainer}>
              <Image source={Images.logout} style={styles.sidebarIcon} />
              <Text style={[styles.menuText, {marginLeft: 17}]}>Logout</Text>
            </View>
          </Touchable>
        </ScrollView>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accessToken: state.auth.accessToken,
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
