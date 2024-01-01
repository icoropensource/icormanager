/* eslint camelcase: "off" */
import localstore from '../../lib/localstore.js'

export const getUser_UID = (state, getters, rootState) => {
  if (state.user.uid) {
    if ((state.user.uid !== '') || (state.user.uid >= 0)) {
      return state.user.uid
    }
  }
  return ''
}

export const getUser_Token = (state, getters, rootState) => {
  let v = state.user.token
  console.log('getUser_Token', v)
  if (v === '') {
    v = localstore.get('access_token', '')
  }
  return v
}

export const isLoggedIn = (state, getters, rootState) => {
  let uid = getters.getUser_UID
  if ((typeof uid === typeof -1) && (uid > 0)) {
    return true
  }
  if ((typeof uid === typeof '') && (uid !== '')) {
    return true
  }
  return false
}

export const getUser_User = (state, getters, rootState) => {
  return state.user ? state.user : {}
}

export const getUser_UserName = (state, getters, rootState) => {
  return state.user.username
}

export const getUser_EMail = (state, getters, rootState) => {
  return state.user.email
}

export const getUser_Phone = (state, getters, rootState) => {
  return state.user.phone
}

export const getUser_Avatar = (state, getters, rootState) => {
  return state.user.avatar
}

export const getUser_FirstName = (state, getters, rootState) => {
  return state.user.firstname
}

export const getUser_LastName = (state, getters, rootState) => {
  return state.user.lastname
}

export const getUser_Description = (state, getters, rootState) => {
  return state.user.description
}

export const getUser_groups = (state, getters, rootState) => {
  return state.user.groups ? state.user.groups : []
}

export const getUser_kontrahent = (state, getters, rootState) => {
  return state.user.kontrahent
}

export const getUser_Fingerprint = (state, getters, rootState) => {
  return state.user.fingerprint
}

export const getUser_FingerprintComponents = (state, getters, rootState) => {
  return state.user.fingerprintcomponents ? state.user.fingerprintcomponents : {}
}

export const getUser_groups_UserManager = (state, getters, rootState) => {
  return state.user.groups.includes('User Manager')
}

export const getUser_groups_SQLManager = (state, getters, rootState) => {
  return state.user.groups.includes('SQL Manager')
}

export const getUser_groups_WWWDeveloper = (state, getters, rootState) => {
  return state.user.groups.includes('WWW Developer')
}

export const getUser_groups_Administrators = (state, getters, rootState) => {
  return state.user.groups.includes('Administrators')
}

export const getUser_groups_ApplicationDevelopers = (state, getters, rootState) => {
  return state.user.groups.includes('Application Developers')
}

export const getUser_groups_LibraryDevelopers = (state, getters, rootState) => {
  return state.user.groups.includes('Library Developers')
}

export const getUser_groups_System = (state, getters, rootState) => {
  return state.user.groups.includes('System')
}

export const getUser_groups_SystemLibraryDevelopers = (state, getters, rootState) => {
  return state.user.groups.includes('System Library Developers')
}

export const getUser_groups_Users = (state, getters, rootState) => {
  return state.user.groups.includes('Users')
}

export const getUser_groups_WWWDevelopers = (state, getters, rootState) => {
  return state.user.groups.includes('WWW Developers')
}

export const getUser_groups_AccessRightsManager = (state, getters, rootState) => {
  return state.user.groups.includes('Access Rights Manager')
}

export const getUser_groups_UserImpersonator = (state, getters, rootState) => {
  return state.user.groups.includes('User Impersonator')
}

export const getUser_groups_CMSDevelopers = (state, getters, rootState) => {
  return state.user.groups.includes('CMS Developers')
}

export const getUser_groups_SystemDevelopers = (state, getters, rootState) => {
  return state.user.groups.includes('System Developers')
}

export const getUser_groups_SystemAdministrators = (state, getters, rootState) => {
  return state.user.groups.includes('System Administrators')
}
