import React, { Component } from 'react'
import { ScrollView, Image } from 'react-native'

// components
import { StatusBar, UnderDevelopment } from '../../Components/General'

// styles
import { Images } from '../../Themes'
import styles from './styles'

class ForumYasinan extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Forum Yasinan',
      title: 'Forum Yasinan',
      drawerIcon: ({focused}) => <Image source={Images.ic_forum} style={styles.sidebarIcon} />
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

export default ForumYasinan
