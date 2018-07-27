import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
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
  },
  diposting: {
    fontFamily: Fonts.type.emphasis,
    fontSize: 12,
    color: Colors.darkGray
  },
  titleContainer: {
    padding: 10,
    backgroundColor: Colors.snow,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.darkGray
  },
  title: {
    fontFamily: Fonts.type.bold
  },
  body: {
    padding: 10,
    backgroundColor: Colors.snow
  }
})
