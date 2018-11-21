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
import { CommentTypes } from '../Redux/CommentRedux'
import { ForumTypes } from '../Redux/ForumRedux'
import { ForumReplyTypes } from '../Redux/ForumReplyRedux'
import { MasterDataTypes } from '../Redux/MasterDataRedux'

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
  likeSubmission,
  reportSubmission
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
import { getComments, postComment } from './CommentSagas'
import {
  getForums,
  getForumDetail,
  createForum,
  updateForum
} from './ForumSagas'
import { getForumReplies, replyForum } from './ForumReplySagas'
import {
  getBantuanNelayan,
  getBantuanTani,
  getBantuanTernak,
  getDisabilitas,
  getJenisNelayan
} from './MasterDataSagas'
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
    takeLatest(SubmissionTypes.REPORT_SUBMISSION, reportSubmission, api),

    // comment
    takeLatest(CommentTypes.GET_COMMENTS, getComments, api),
    takeLatest(CommentTypes.POST_COMMENT, postComment, api),

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

    // Master Data
    takeLatest(MasterDataTypes.GET_BANTUAN_TANI, getBantuanTani, api),
    takeLatest(MasterDataTypes.GET_BANTUAN_TERNAK, getBantuanTernak, api),
    takeLatest(MasterDataTypes.GET_DISABILITAS, getDisabilitas, api),
    takeLatest(MasterDataTypes.GET_JENIS_NELAYAN, getJenisNelayan, api),
    takeLatest(MasterDataTypes.GET_BANTUAN_NELAYAN, getBantuanNelayan, api),

    // SubVillage
    takeLatest(SubVillageTypes.GET_SUB_VILLAGES, getSubVillages, api),

    // Notifications
    takeLatest(NotificationTypes.GET_NOTIFICATIONS, getNotifications, api),
    takeLatest(NotificationTypes.READ_NOTIFICATION, readNotification, api),

    // forum
    takeLatest(ForumTypes.GET_FORUMS, getForums, api),
    takeLatest(ForumTypes.GET_FORUM_DETAIL, getForumDetail, api),
    takeLatest(ForumTypes.CREATE_FORUM, createForum, api),
    takeLatest(ForumTypes.UPDATE_FORUM, updateForum, api),

    // forum reply
    takeLatest(ForumReplyTypes.GET_FORUM_REPLIES, getForumReplies, api),
    takeLatest(ForumReplyTypes.REPLY_FORUM, replyForum, api)
  ])
}
