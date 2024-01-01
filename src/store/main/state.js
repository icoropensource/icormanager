export default {
  loading: false,
  mobileMode: false,
  startPage: '/icor', // '/icor'

  showPane_ICOR: true,
  showPane_Content: true,

  left_Rows: 4,
  show_Help: false,
  show_TabCloseButton: false,
  show_LinksInNewTab: true,
  show_LinksTabSelect: true,
  newInterface: true, // pokazywanie nowego widoku obiektow itp.
  notifyMessagesCnt: 0,
  notifyMessages: [],

  appMode: {
    demo: false,
    icor: true,
    name: process.env.MAIN_APPLICATION // icor, ehrle, proauto
  },

  icor: {
    url: window.location.origin, // process.env.MAIN_APPURL,
    isrcFileModal: ''
  }
}
