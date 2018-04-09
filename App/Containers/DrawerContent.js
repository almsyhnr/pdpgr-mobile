import React, { Component } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { DrawerItems, NavigationActions } from 'react-navigation'
import { Avatar } from 'react-native-elements'
import Touchable from 'react-native-platform-touchable'

// Styles
import styles from './Styles/DrawerContentStyle'
import { Colors, Images } from '../Themes'

class DrawerContent extends Component {
  constructor (props) {
    super(props)

    this.openLogin = this.openLogin.bind(this)
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
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
            onPress={() => console.log('Works!')}
            activeOpacity={0.7} large rounded />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>Jhon</Text>
            <Text style={styles.email}>email@gmail.com</Text>
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
          <Touchable onPress={this.openLogin}>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
