import React, { Component } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'

// redux
import AuthActions from '../Redux/AuthRedux'

// components
import { StatusBar, UnderDevelopment } from '../Components/General'

// Styles
import styles from './Styles/ProfileScreenStyle'
import { Images } from '../Themes'
import { Text, ListItem, Divider, Card, Icon } from 'react-native-elements'

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Profile',
      title: 'Profile',
      drawerIcon: ({focused}) => <Image source={Images.ic_profil} style={styles.sidebarIcon} />
    }
  }
  render () {
    const { user } = this.props
    if (!user) {
      return null
    }
    const rightIcon = (
      <Icon name='chevron-right' />
    )
    const logoutIcon = (
      <Icon name='power' type='feather' />
    )
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar />
        <View style={styles.avatarContainer}>
          <FastImage source={{ uri: user.avatar }} style={styles.avatar} />
          <Text h4>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <View style={styles.menuContainer}>
          <Card containerStyle={styles.card}>
            <ListItem title='Ubah Avatar' rightIcon={rightIcon} />
          </Card>
          <Card containerStyle={styles.card}>
            <ListItem title='Ubah Password' rightIcon={rightIcon} />
          </Card>
          <Card containerStyle={styles.card}>
            <ListItem title='Ubah Profile' rightIcon={rightIcon} />
          </Card>
          <Card containerStyle={styles.card}>
            <ListItem title='Logout' rightIcon={logoutIcon} onPress={() => this.props.logout()} />
          </Card>

        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
