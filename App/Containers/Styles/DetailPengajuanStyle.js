import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  section: {
    backgroundColor: Colors.snow,
    marginBottom: 1
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginVertical: 10,
    color: Colors.darkGray
  },
  sectionContent: {
    backgroundColor: Colors.snow,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20
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
  mediaContainer: {
    height: Metrics.screenWidth,
    width: Metrics.screenWidth
  },
  media: {
    height: Metrics.screenWidth / 4,
    width: Metrics.screenWidth / 4,
    resizeMode: 'contain',
    backgroundColor: Colors.shadow,
    marginHorizontal: 5
  }
})
