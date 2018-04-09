import React, { Component } from 'react'
import { ScrollView, Text, Image } from 'react-native'
import { connect } from 'react-redux'

// components
import { StatusBar } from '../Components/General'

// Styles
import styles from './Styles/ContactUsScreenStyle'
import { Images } from '../Themes'

class ContactUsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Hubungi Kami',
      title: 'Hubungi Kami',
      drawerIcon: ({focused}) => <Image source={Images.mail} style={styles.sidebarIcon} />
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <StatusBar />
        <Text>ContactUsScreen Container</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsScreen)
