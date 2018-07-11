import React, { Component } from 'react'
import { View, InteractionManager, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Icon } from 'react-native-elements'

// redux
import ModuleActions from '../Redux/ModuleRedux'

// components
import { StatusBar, HeaderTitle } from '../Components/General'
import { NotificationButton } from '../Components/Button'
import { MainMenuItem } from '../Components/Menu'

// Styles
import { Colors, Images } from '../Themes'
import styles from './Styles/ReportChooserScreenStyle'

class ReportChooserScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pilih Jenis Pengajuan',
      headerRight: <NotificationButton />
    }
  }

  constructor (props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
  }

  componentWillMount () {
    InteractionManager.runAfterInteractions(() => {
      this.props.getModules()
    })
  }

  renderItem = ({ item, index }) => {
    return <MainMenuItem title={item.name} image={item.icons.color} onPress={() => this.props.navigation.navigate('PelaporanScreen', {module: item})} />
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList
          numColumns={2}
          data={this.props.modules}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => `${index}`} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modules: state.module.modules
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getModules: () => dispatch(ModuleActions.getModules())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportChooserScreen)
