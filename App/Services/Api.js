// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import AppConfig from '../Config/AppConfig'

// our "constructor"
const create = (baseURL = AppConfig.baseUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const signin = (email, password) => api.post('api/login', {email: email, password: password})
  const getUser = () => api.get('api/user')
  const getSubmissions = (page) => api.get('api/submissions?page=' + page)
  const getSubmissionDetail = (id) => api.get('api/submissions/' + id)
  const getMySubmissions = (page) => api.get('api/my_submissions?page=' + page)
  const getMyApprovedSubmissions = (page) => api.get('api/my_approved_submissions?page=' + page)
  const getSubmissionTermins = (id) => api.get('api/my_approved_submissions/' + id + '/termins')
  const submitSubmissionTermin = (submissionId, id) => api.get('api/my_approved_submissions/' + submissionId + '/termins/' + id + '/submit')
  const getSubmissionTransactions = (id, page) => api.get('api/my_approved_submissions/' + id + '/transactions?page=' + page)
  const modules = () => api.get('api/modules')
  const subVillages = () => api.get('api/sub_villages')
  const getNotifications = (page) => api.get('api/notifications?page=' + page)
  const readNotification = (id) => api.post('api/notifications/' + id + '/read')
  const createSubmission = (form, files) => {
    var body = new FormData()
    body.append(`module_id`, form.module_id)
    body.append(`type`, form.type)
    body.append(`agen_id`, form.agen_id)
    body.append(`identifier`, form.identifier)
    body.append('group_name', form.group_name)
    body.append('pic_name', form.pic_name)
    body.append('nik', form.nik)
    body.append('email', form.email)
    body.append('phone', form.phone)
    body.append('address', form.address)
    body.append('rt', form.rt)
    body.append('rw', form.rw)
    body.append('sub_village_id', form.sub_village_id)
    body.append('village_id', form.village_id)
    body.append('district_id', form.district_id)
    body.append('tgl_lahir', form.tgl_lahir)

    if (files.length > 0) {
      files.map((file) => {
        if (file) {
          var image = {
            uri: file.path,
            type: file.mime,
            name: file.filename
          }
          body.append(`images[]`, image)
        }
      })
    }

    return api.post('api/submissions/create', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  const createTransaction = (form, files) => {
    var body = new FormData()
    body.append(`submission_termin_id`, form.termin_id)
    body.append(`description`, form.description)
    body.append(`price`, form.price)
    body.append(`quantity`, form.quantity)
    body.append('date', form.date)

    if (files.length > 0) {
      files.map((file) => {
        var image = {
          uri: file.path,
          type: file.mime,
          name: file.filename
        }
        body.append(`images[]`, image)
      })
    }

    return api.post('api/my_approved_submissions/' + form.submission_id + '/transactions/create', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  const deleteTransaction = (submissionId, transactionId) => api.delete('api/my_approved_submissions/' + submissionId + '/transactions/' + transactionId)
  const changeAvatar = (file) => {
    var body = new FormData()

    var image = {
      uri: file.path,
      type: file.mime,
      name: file.filename
    }
    body.append(`photo`, image)

    return api.post('api/profile/change_avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  const changePassword = (form) => api.post('api/profile/change_password', form)
  const updateProfile = (form) => api.post('api/profile/update_profile', form)
  const likeSubmission = (id) => api.post('api/submissions/' + id + '/likes')
  const getComments = (id, page) => api.get('api/submissions/' + id + '/comments?page=' + page)
  const postComment = (id, form) => api.post('/api/submissions/' + id + '/comments', form)

  const getForums = (type, page) => api.get('api/forum/index/' + type + '?page=' + page)
  const getForumDetail = (id) => api.get('api/forum/' + id)
  const getForumReplies = (id, page) => api.get('api/forum/' + id + '/replies?page=' + page)
  const createForum = (form) => api.post('api/forum/create', form)
  const updateForum = (id, form) => api.put('api/forum/' + id + '/update')
  const replyForum = (form) => api.post('api/forum/reply', form)
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setHeader: api.setHeader,
    signin,
    getUser,
    getSubmissions,
    getSubmissionDetail,
    getMySubmissions,
    getMyApprovedSubmissions,
    getSubmissionTermins,
    getSubmissionTransactions,
    submitSubmissionTermin,
    createSubmission,
    modules,
    getNotifications,
    readNotification,
    subVillages,
    createTransaction,
    deleteTransaction,
    changeAvatar,
    changePassword,
    updateProfile,
    likeSubmission,
    getComments,
    postComment,
    getForums,
    getForumDetail,
    getForumReplies,
    createForum,
    updateForum,
    replyForum
  }
}

// let's return back our create method as the default.
export default {
  create
}
