/* eslint camelcase: "off" */
import localstore from '../../lib/localstore.js'

export const setUser_UserName = (state, v) => {
  state.user.username = v
}

export const setUser_FirstName = (state, v) => {
  state.user.firstname = v
}

export const setUser_LastName = (state, v) => {
  state.user.lastname = v
}

export const setUser_Description = (state, v) => {
  state.user.description = v
}

export const setUser_UID = (state, v) => {
  state.user.uid = v
}

export const setUser_EMail = (state, v) => {
  state.user.email = v
}

export const setUser_Phone = (state, v) => {
  state.user.phone = v
}

export const setUser_Avatar = (state, v) => {
  state.user.avatar = v
}

export const setUser_groups = (state, v) => {
  state.user.groups = v
}

export const setUser_kontrahent = (state, v) => {
  state.user.kontrahent = v
}

export const setUser_Token = (state, v) => {
  console.log('setUser_Token', v)
  localstore.set('access_token', v)
  state.user.token = v
}

export const setUser_Fingerprint = (state, v) => {
  localstore.set('fid', v)
  state.user.fingerprint = v
}

export const setUser_FingerprintComponents = (state, v) => {
  state.user.fingerprintcomponents = v
}
