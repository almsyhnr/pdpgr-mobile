import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  forumTitleContainer: {
    padding: 10,
    backgroundColor: Colors.gray
  },
  forumTitle: {
    color: Colors.darkGray,
    fontFamily: Fonts.type.base
  }
})
