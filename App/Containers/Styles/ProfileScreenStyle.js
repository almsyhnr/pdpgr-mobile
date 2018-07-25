import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  avatarContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 75,
    marginBottom: 20
  },
  email: {
    marginVertical: 5,
    fontFamily: Fonts.type.emphasis
  },
  menuContainer: {
    padding: 20,
    backgroundColor: Colors.gray,
    flex: 1
  },
  card: {padding: 0, marginBottom: 5}
})
