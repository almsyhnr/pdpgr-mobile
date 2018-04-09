import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.primary
  },
  headerTitle: {
    color: Colors.snow,
    alignSelf: 'center',
    fontFamily: Fonts.type.base,
    flex: 1
  }
})
