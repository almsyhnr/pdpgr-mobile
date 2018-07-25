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
  card: {padding: 0, marginBottom: 5},
  modalImageContainer: {
    width: 220,
    height: 120,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalImageContent: {
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalImageItem: {
    padding: 7,
    alignItems: 'center'
  },
  modalImage: {
    width: 80,
    height: 80
  },
  modalImageText: {
    fontFamily: Fonts.type.base,
    color: Colors.darkPrimary
  },
  image: {
    width: 80,
    height: 60
  }
})
