/* eslint camelcase: "off" */
import { date } from 'quasar'
import localstore from '../../lib/localstore.js'

export const isLoading = (state) => {
  state.loading = true
}

export const isNotLoading = (state) => {
  state.loading = false
}

export const setMobileMode = (state, value) => {
  state.mobileMode = value
}

export const setIsrcFileModal = (state, src) => {
  state.icor.isrcFileModal = src
}

export const setICORURL = (state, value) => {
  state.icor.url = value
}

export const setShowPane_ICOR = (state, v) => {
  state.showPane_ICOR = v
}

export const setShowPane_Content = (state, v) => {
  state.showPane_Content = v
}

export const setLeftRows = (state, v) => {
  localstore.set('pwlp', v)
  state.left_Rows = v
}

export const setShow_Help = (state, v) => {
  state.show_Help = v
}

export const setShow_TabCloseButton = (state, v) => {
  localstore.set('pscp', v)
  state.show_TabCloseButton = v
}

export const setShow_LinksInNewTab = (state, v) => {
  localstore.set('pslt', v)
  state.show_LinksInNewTab = v
}

export const setShow_LinksTabSelect = (state, v) => {
  state.show_LinksTabSelect = v
}

export const setAppMode_Demo = (state, v) => {
  state.appMode.demo = v
}

export const setAppMode_ICOR = (state, v) => {
  state.appMode.icor = v
}

export const addNotifyMessages = (state, v) => {
  v['id'] = state.notifyMessagesCnt
  let timeStamp = Date.now()
  // let formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
  let formattedString = date.formatDate(timeStamp, 'HH:mm:ss')
  v['datetime'] = formattedString
  state.notifyMessagesCnt += 1
  state.notifyMessages.unshift(v)
}
