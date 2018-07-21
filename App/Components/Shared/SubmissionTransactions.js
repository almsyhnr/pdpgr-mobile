import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Card, ListItem, Icon, Divider, Button } from 'react-native-elements'
import { formatMoney } from '../../Lib/helpers'
import { Colors } from '../../Themes'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
class SubmissionTransactions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      sticky: []
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
      data.push({...termin, type: 'termin'})
      sticky.push(data.length - 1)

      // filter termin trans
      _.map(transactions, trans => {
        if (termin.id === trans.termin_id) {
          data.push({...trans, type: 'transaction'})
        }
      })
    })

    this.setState({ data, sticky })
  }

  renderTermin = (item) => {
    return (
      <View>
        <ListItem title={'Termin ' + item.termin} rightIcon={<Icon name='list' />} />
        <Divider />
      </View>

    )
  }

  renderTransaction = (item) => {
    return (
      <View>
        <ListItem
          rightElement={<View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon type='evilicon' name='calendar' color={Colors.primary} />
            <Text>{item.date}</Text>
          </View>}
          title={item.description}
          subtitle={`Rp.${formatMoney(item.price)} x ${formatMoney(item.quantity)} = Rp.${formatMoney(item.price * item.quantity)}`} />
        <Divider />
      </View>

    )
  }
  render () {
    // group based on termin
    // generate item
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{flexGrow: 1}} stickyHeaderIndices={this.state.sticky}>
          {_.map(this.state.data, (item, index) => item.type === 'termin' ? this.renderTermin(item) : this.renderTransaction(item))}
        </ScrollView>
        <Button buttonStyle={{ borderRadius: 0 }} title='Tambah' />
      </View>

    )
  }
}

SubmissionTransactions.propTypes = {
  termins: PropTypes.array,
  transactions: PropTypes.array
}

export default SubmissionTransactions
