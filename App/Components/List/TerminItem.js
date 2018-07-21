import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Card, Badge, Divider, Button } from 'react-native-elements'
import { formatMoney } from '../../Lib/helpers'
import { Fonts, Colors } from '../../Themes'

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  headerTitle: {
    fontFamily: Fonts.type.bold
  },
  label: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    marginBottom: 5,
    marginTop: 5
  },
  value: {
    fontSize: 16,
    fontFamily: Fonts.type.base,
    color: Colors.darkGray,
    backgroundColor: Colors.shadow,
    padding: 5,
    borderWidth: 1,
    borderColor: Colors.darkGray,
    marginBottom: 20
  },
  ajukan: {
    backgroundColor: Colors.darkGreen
  },
  ajukanUlang: {
    backgroundColor: Colors.darkYellow
  }
})

const renderAction = (termin, onSubmit) => {
  if (termin.total_penggunaan > 0) {
    switch (termin.status_id) {
      case 0:
        return <Button title='Ajukan' buttonStyle={styles.ajukan} />
      case 50:
        return <Button title='Ajukan Ulang' buttonStyle={styles.ajukanUlang} />
    }
  }

  return null
}

const TerminItem = ({ termin, onSubmit }) => (
  <Card containerStyle={{ marginBottom: 10 }}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Termin {termin.termin}</Text>
      <Badge
        value={termin.status}
        textStyle={{ fontFamily: Fonts.type.base }}
        containerStyle={{
          backgroundColor: termin.status_color,
          marginLeft: 10
        }}
      />
    </View>
    <Divider />
    <View>
      <Text style={styles.label}>Jumlah (Rp.)</Text>
      <Text style={styles.value}>{formatMoney(termin.jumlah)}</Text>
      <Text style={styles.label}>Jumlah Realisasi (Rp.)</Text>
      <Text style={styles.value}>{formatMoney(termin.total_penggunaan)}</Text>
      {termin.note !== '' &&
      <View>
        <Text style={styles.label}>Catatan</Text>
        <Text style={styles.value}>{termin.note}</Text>
      </View>}
      {renderAction(termin, onSubmit)}
    </View>
  </Card>
)

TerminItem.propTypes = {
  termin: PropTypes.object.isRequired
}

export default TerminItem
