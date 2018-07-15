import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { SubmissionTypes } from '../Redux/SubmissionRedux'
import { ModuleTypes } from '../Redux/ModuleRedux'
import { SubVillageTypes } from '../Redux/SubVillageRedux'
/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signin } from './AuthSagas'
import { getSubmissions, getMySubmissions, createSubmission } from './SubmissionSagas'
import { getModules } from './ModuleSagas'
import { getSubVillages } from './SubVillageSagas'
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

    // Submission
    takeLatest(SubmissionTypes.GET_SUBMISSIONS, getSubmissions, api),
    takeLatest(SubmissionTypes.GET_MY_SUBMISSIONS, getMySubmissions, api),
    takeLatest(SubmissionTypes.CREATE_SUBMISSION, createSubmission, api),

    // Module
    takeLatest(ModuleTypes.GET_MODULES, getModules, api),

    // SubVillage
    takeLatest(SubVillageTypes.GET_SUB_VILLAGES, getSubVillages, api)
  ])
}
