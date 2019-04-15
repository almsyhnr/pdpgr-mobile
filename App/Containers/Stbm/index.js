import React, { Component } from 'react'
import { View, FlatList, Image, InteractionManager } from 'react-native'
import { connect } from 'react-redux'

import StbmActions from '../../Redux/StbmRedux'
// components
import { StatusBar, UnderDevelopment } from '../../Components/General'
import { LoadingIndicator } from '../../Components/Indicator'

// Styles
import styles from './styles'
import { Images } from '../../Themes'
import ParentItem from './ParentItem'
import { AddButton } from '../../Components/Button'

class StbmScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      drawerLabel: 'STBM',
      title: 'STBM',
      drawerIcon: ({focused}) => <Image source={Images.ic_stbm} style={styles.sidebarIcon} />,
      headerRight: (
        <AddButton
          onPress={() => navigation.navigate('StbmAdd')}
        />
      )
    }
  }

  componentDidMount () {
    InteractionManager.runAfterInteractions(() => {
      this.fetchData(1)
    })
  }

  fetchData = (page = 1) => {
    this.props.getListStbm(page)
  }

  loadMore = () => {
    const { pagination } = this.props
    if (pagination.current_page < pagination.total_pages) {
      this.getListStbm(pagination.current_page + 1)
    }
  }

  renderItem = ({ item }) => {
    return (
      <ParentItem stbm={item} />
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList
          refreshing={false}
          onRefresh={() => this.fetchData(1)}
          data={this.props.data}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderItem}
          contentContainerStyle={{flexGrow: 1}}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={<LoadingIndicator visible={this.props.fetching} size={'large'} />}
        />
      </View>
    )
  }
}

const mapStateToProps = ({ stbm }) => {
  return {
    data: stbm.data,
    fetching: stbm.fetching,
    error: stbm.error,
    pagination: stbm.pagination
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListStbm: (page) => dispatch(StbmActions.getListStbm(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StbmScreen)
