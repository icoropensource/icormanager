/* eslint camelcase: "off" */
import localstore from '../../lib/localstore.js'

export const showFileModal = (context) => {
  context.commit('setIsrcFileModal', '/icormanager/jslib/rich-filemanager/ifm.html')
}

export const hideFileModal = (context) => {
  context.commit('setIsrcFileModal', '')
}

export const showPageLogin = (context) => {
  context.commit('setShowPane_ICOR', false)
  context.commit('setShowPane_Content', true)
}

export const showPaneICOR = (context) => {
  context.commit('setShowPane_Content', false)
  context.commit('setShowPane_ICOR', true)
}

export const showPaneContent = (context) => {
  context.commit('setShowPane_ICOR', false)
  context.commit('setShowPane_Content', true)
}

export const enableModeDemo = (context) => {
  context.commit('setAppMode_Demo', true)
  context.commit('setAppMode_ICOR', true)
}

export const enableModeICOR = (context) => {
  context.commit('setAppMode_Demo', false)
  context.commit('setAppMode_ICOR', true)
}

export const initLocalParameters = (context) => {
  let pwlp = localstore.get('pwlp', 2) // Szerokość lewego panelu
  let pscp = localstore.get('pscp', false) // Czy wyświetlać przycisk zamykania na zakładkach
  let pslt = localstore.get('pslt', true) // Czy wyświetlać linki w nowych zakładkach
  context.commit('setLeftRows', pwlp)
  context.commit('setShow_TabCloseButton', pscp)
  context.commit('setShow_LinksInNewTab', pslt)
}
