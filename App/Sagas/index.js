import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { UserTypes } from '../Redux/UserRedux'
import { SubmissionTypes } from '../Redux/SubmissionRedux'
import { SubmissionTerminTypes } from '../Redux/SubmissionTerminRedux'
import { SubmissionTransactionTypes } from '../Redux/SubmissionTransactionRedux'
import { ModuleTypes } from '../Redux/ModuleRedux'
import { SubVillageTypes } from '../Redux/SubVillageRedux'
import { NotificationTypes } from '../Redux/NotificationRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signin } from './AuthSagas'
import {
  getUser,
  changeAvatar,
  changePassword,
  updateProfile
} from './UserSagas'
import {
  getSubmissions,
  getSubmissionDetail,
  getMySubmissions,
  getMyApprovedSubmissions,
  createSubmission,
  likeSubmission
} from './SubmissionSagas'
import {
  getSubmissionTermins,
  submitSubmissionTermin
} from './SubmissionTerminSagas'
import {
  getSubmissionTransactions,
  createTransaction,
  deleteTransaction
} from './SubmissionTransactionSagas'
import { getModules } from './ModuleSagas'
import { getSubVillages } from './SubVillageSagas'
import { getNotifications, readNotification } from './NotificationSagas'
/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup, api),

    // Auth
    takeLatest(AuthTypes.SIGNIN, signin, api),

    // User
    takeLatest(UserTypes.GET_USER, getUser, api),
    takeLatest(UserTypes.CHANGE_AVATAR, changeAvatar, api),
    takeLatest(UserTypes.CHANGE_PASSWORD, changePassword, api),
    takeLatest(UserTypes.UPDATE_PROFILE, updateProfile, api),

    // Submission
    takeLatest(SubmissionTypes.GET_SUBMISSIONS, getSubmissions, api),
    takeLatest(SubmissionTypes.GET_SUBMISSION_DETAIL, getSubmissionDetail, api),
    takeLatest(SubmissionTypes.GET_MY_SUBMISSIONS, getMySubmissions, api),
    takeLatest(
      SubmissionTypes.GET_MY_APPROVED_SUBMISSIONS,
      getMyApprovedSubmissions,
      api
    ),
    takeLatest(SubmissionTypes.CREATE_SUBMISSION, createSubmission, api),
    takeLatest(SubmissionTypes.LIKE_SUBMISSION, likeSubmission, api),

    // Submission Termin
    takeLatest(
      SubmissionTerminTypes.GET_SUBMISSION_TERMINS,
      getSubmissionTermins,
      api
    ),
    takeLatest(
      SubmissionTerminTypes.SUBMIT_SUBMISSION_TERMIN,
      submitSubmissionTermin,
      api
    ),

    // Submission Transactions
    takeLatest(
      SubmissionTransactionTypes.GET_SUBMISSION_TRANSACTIONS,
      getSubmissionTransactions,
      api
    ),
    takeLatest(
      SubmissionTransactionTypes.CREATE_TRANSACTION,
      createTransaction,
      api
    ),
    takeLatest(
      SubmissionTransactionTypes.DELETE_TRANSACTION,
      deleteTransaction,
      api
    ),

    // Module
    takeLatest(ModuleTypes.GET_MODULES, getModules, api),

    // SubVillage
    takeLatest(SubVillageTypes.GET_SUB_VILLAGES, getSubVillages, api),

    // Notifications
    takeLatest(NotificationTypes.GET_NOTIFICATIONS, getNotifications, api),
    takeLatest(NotificationTypes.READ_NOTIFICATION, readNotification, api)
  ])
}
