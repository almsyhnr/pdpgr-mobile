import React, { Component } from 'react'
import { View, InteractionManager, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
// redux
import ModuleActions from '../Redux/ModuleRedux'

// components
import { StatusBar } from '../Components/General'
import { NotificationButton } from '../Components/Button'
import { MainMenuItem } from '../Components/Menu'

// Styles
import styles from './Styles/PilihJenisPengajuanStyle'
import { Images } from '../Themes'

class PilihJenisPengajuan extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'Tambah Pengajuan',
      drawerIcon: ({focused}) => <Image source={Images.ic_tambah_pengajuan} style={styles.sidebarIcon} />,
      title: 'Pilih Jenis Pengajuan',
      headerRight: <NotificationButton onPress={() => navigation.navigate('Notifications')} />
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
    return <MainMenuItem title={item.name} image={item.icons.color} onPress={() => this.props.navigation.navigate('TambahPengajuan', {module: item})} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PilihJenisPengajuan)
