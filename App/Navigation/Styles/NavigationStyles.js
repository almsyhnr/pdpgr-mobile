import { StyleSheet } from 'react-native'
import { Colors, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
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
