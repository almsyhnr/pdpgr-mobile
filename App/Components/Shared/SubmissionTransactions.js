import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ImageZoom from 'react-native-image-pan-zoom'
import { ListItem, Icon, Divider, Button } from 'react-native-elements'
import Modal from 'react-native-modalbox'
import FastImage from 'react-native-fast-image'
import { formatMoney } from '../../Lib/helpers'
import { Colors, Fonts, Metrics } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  label: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    marginBottom: 5
  },
  value: {
    fontSize: 16,
    fontFamily: Fonts.type.base,
    color: Colors.darkGray,
    marginBottom: 20
  },
  textRight: {
    textAlign: 'right'
  },
  media: {
    height: Metrics.screenWidth / 4,
    width: Metrics.screenWidth / 4,
    resizeMode: 'contain',
    backgroundColor: Colors.shadow,
    marginHorizontal: 5
  },
  divider: {marginVertical: 5}
})
class SubmissionTransactions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      sticky: [],
      selectedTransaction: null,
      imageUrl: null
    }
  }

  componentDidMount () {
    this.formatData()
  }

  formatData = () => {
    const { transactions, termins } = this.props
    let data = []
    let sticky = []

    _.map(termins, termin => {
      data.push({ ...termin, type: 'termin' })
      sticky.push(data.length - 1)

      // filter termin trans
      _.map(transactions, trans => {
        if (termin.id === trans.termin_id) {
          data.push({ ...trans, type: 'transaction' })
        }
      })
    })

    this.setState({ data, sticky })
  };

  renderTermin = item => {
    return (
      <View>
        <ListItem
          title={'Termin ' + item.termin}
          rightIcon={<Icon name='list' />}
        />
        <Divider />
      </View>
    )
  };

  openDetail = selectedTransaction => {
    console.tron.error(selectedTransaction)
    this.setState({ selectedTransaction }, () => {
      this.refs.modal.open()
    })
  };

  openImage = uri => {
    this.setState({ imageUrl: uri }, () => {
      this.refs.modalImage.open()
    })
  };

  renderTransaction = item => {
    return (
      <View>
        <ListItem
          onPress={() => this.openDetail(item)}
          rightElement={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon type='evilicon' name='calendar' color={Colors.primary} />
              <Text>{item.date}</Text>
            </View>
          }
          title={item.description}
          subtitle={`Rp.${formatMoney(item.price)} x ${formatMoney(
            item.quantity
          )} = Rp.${formatMoney(item.price * item.quantity)}`}
        />
        <Divider />
      </View>
    )
  };

  render () {
    // group based on termin
    // generate item
    const { selectedTransaction } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          stickyHeaderIndices={this.state.sticky}
        >
          {_.map(
            this.state.data,
            (item, index) =>
              item.type === 'termin'
                ? this.renderTermin(item)
                : this.renderTransaction(item)
          )}
        </ScrollView>
        <Button buttonStyle={{ borderRadius: 0 }} title='Tambah' />
        <Modal
          ref='modal'
          position='center'
          style={{ width: '90%', height: '80%', borderRadius: 10, zIndex: 10 }}
        >
          {selectedTransaction && (
            <View style={{ flex: 1, padding: 10 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Fonts.type.bold,
                  fontSize: 16,
                  marginVertical: 10
                }}
              >
                Detail Transaksi
              </Text>
              <Divider style={styles.divider} />
              <View style={{ paddingVertical: 10 }}>
                <Text style={styles.label}>Deskripsi</Text>
                <Text style={styles.value}>
                  {selectedTransaction.description}
                </Text>
                <Divider style={styles.divider} />
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View>
                    <Text style={styles.label}>Kuantitas</Text>
                    <Text style={[styles.value, styles.textRight]}>
                      {formatMoney(selectedTransaction.quantity)}
                    </Text>
                  </View>
                  <View>
                    <Text style={[styles.label, styles.textRight]}>Harga</Text>
                    <Text style={[styles.value, styles.textRight]}>
                  Rp.{formatMoney(selectedTransaction.price)}
                    </Text>
                  </View>

                </View>
                <Divider style={styles.divider} />
                <Text style={[styles.label, styles.textRight]}>Total</Text>
                <Text style={[styles.value, styles.textRight]}>
                  Rp.{formatMoney(
                    selectedTransaction.quantity * selectedTransaction.price
                  )}
                </Text>
                {selectedTransaction.galleries.length > 0 && (
                  <View>
                    <Divider style={styles.divider} />
                    <FlatList
                      data={selectedTransaction.galleries}
                      numColumns={3}
                      keyExtractor={(item, index) => `${index}`}
                      renderItem={({ item, index }) => {
                        let uri = item.url
                        return (
                          <TouchableWithoutFeedback
                            onPress={() => this.openImage(uri)}
                          >
                            <FastImage
                              resizeMode={FastImage.resizeMode.contain}
                              source={{ uri: uri }}
                              style={styles.media}
                            />
                          </TouchableWithoutFeedback>
                        )
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          )}
        </Modal>
        <Modal ref='modalImage' coverScreen>
          <ImageZoom
            cropWidth={Metrics.screenWidth}
            cropHeight={Metrics.screenHeight}
            imageWidth={Metrics.screenWidth}
            imageHeight={Metrics.screenWidth}
            enableSwipeDown
            onSwipeDown={() => this.refs.modalImage.close()}
          >
            <FastImage
              source={{ uri: this.state.imageUrl }}
              resizeMode={FastImage.resizeMode.contain}
              style={{ width: '100%', height: '100%' }}
            />
          </ImageZoom>
        </Modal>
      </View>
    )
  }
}

SubmissionTransactions.propTypes = {
  termins: PropTypes.array,
  transactions: PropTypes.array
}

export default SubmissionTransactions
