import React, { Component } from 'react'
import { ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

// components
import { StatusBar, UnderDevelopment } from '../Components/General'

// Styles
import styles from './Styles/ProfileScreenStyle'
import { Images } from '../Themes'

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Profile',
      title: 'Profile',
      drawerIcon: ({focused}) => <Image source={Images.ic_profil} style={styles.sidebarIcon} />
    }
  }
  render () {
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <StatusBar />
        <UnderDevelopment />
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
