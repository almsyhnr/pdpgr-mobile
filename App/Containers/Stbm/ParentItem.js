import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Touchable from 'react-native-platform-touchable'

const ParentItem = ({ stbm, onPress }) => (
  <Touchable style={styles.container} onPress={onPress}>
    <React.Fragment>
      <Text style={styles.label}>No. KK : {stbm.no_kk}</Text>
      <Text style={styles.label}>Nama Suami : {stbm.suami.nama}</Text>
      <Text style={styles.label}>Nama Istri : {stbm.istri.nama}</Text>
      <Text style={styles.label}>Jumlah Anak : {stbm.children.length}</Text>
    </React.Fragment>
  </Touchable>
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingBottom: 5,
    borderBottomWidth: 1
  },
  label: {
    marginBottom: 7
  }
})

export default ParentItem
