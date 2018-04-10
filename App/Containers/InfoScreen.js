import React, { Component } from 'react'
import { ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'

// components
import { StatusBar, UnderDevelopment } from '../Components/General'

// Styles
import styles from './Styles/InfoScreenStyle'
import { Images } from '../Themes'

class InfoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Info',
      title: 'Info',
      drawerIcon: ({focused}) => <Image source={Images.info} style={styles.sidebarIcon} />
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoScreen)
