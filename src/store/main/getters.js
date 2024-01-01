/* eslint camelcase: "off" */

export const isLoading = (state) => {
  return state.loading
}

export const getMobileMode = (state) => {
  return state.mobileMode
}

export const getStartPage = (state) => {
  return state.startPage
}

export const getNewInterface = (state) => {
  return state.newInterface
}

export const getICORURL = (state) => {
  return state.icor.url
}

export const getIsrcFileModal = (state) => {
  return state.icor.isrcFileModal
}

export const getShowPane_ICOR = (state) => {
  return state.showPane_ICOR
}

export const getShowPane_Content = (state) => {
  return state.showPane_Content
}

export const getLeftRows = (state) => {
  return state.left_Rows
}

export const getShow_Help = (state) => {
  return state.show_Help
}

export const getShow_TabCloseButton = (state) => {
  return state.show_TabCloseButton
}

export const getShow_LinksInNewTab = (state) => {
  return state.show_LinksInNewTab
}

export const getShow_LinksTabSelect = (state) => {
  return state.show_LinksTabSelect
}

export const getAppMode_Demo = (state) => {
  return state.appMode.demo
}

export const getAppMode_ICOR = (state) => {
  return state.appMode.icor
}

export const getAppMode_name = (state) => {
  return state.appMode.name
}

export const getNotifyMessages = (state) => {
  return state.notifyMessages
}
