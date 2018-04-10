import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  profileContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 7
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center'
  },
  name: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: 24
  },
  email: {
    color: Colors.snow,
    fontFamily: Fonts.type.emphasis
  },
  menuText: {
    color: Colors.gray,
    flex: 1
  },
  logoutContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    width: '100%',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Colors.gray
  }
})
