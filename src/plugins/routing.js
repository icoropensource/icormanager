import Fingerprint2 from 'fingerprintjs2'

function getFingerprint () {
  return new Promise(resolve => {
    // new Fingerprint2().get(function (result, components) {
    Fingerprint2.getV18(function (result, components) {
      resolve({result, components})
    })
  })
}

export default async ({app, store, router, Vue}) => {
  const {result, components} = await getFingerprint()
  store.commit('setUser_Fingerprint', result)
  store.commit('setUser_FingerprintComponents', components)

  // console.log('router beforeEach')
  router.beforeEach(async (to, from, next) => {
    // console.log('beforeeach: ' + to.fullPath + ' - ' + to.path)
    /* Inform Google Analytics
      if (typeof ga !== 'undefined') {
        ga('set', 'page', to.path)
        ga('send', 'pageview')
      }
    */
    if (to.path.startsWith('/login')) {
      store.dispatch('showPageLogin')
      return next()
    }
    if (to.path.startsWith('/#login')) {
      store.dispatch('showPageLogin')
      return next()
    }

    let isLoggedIn = store.getters.isLoggedIn
    if (!isLoggedIn) {
      isLoggedIn = await Vue.prototype.$icor.main.checkSession()
      // console.log('  logged: ' + isLoggedIn + ' - ' + store.getters.getUser_UID)
      if (!isLoggedIn) {
        // console.log('  not logged in at: ' + to.fullPath)
        return next('/login/')
      }
    }

    if (store.getters.getAppMode_ICOR) {
      if (to.path === '/') {
        return next('/icor/')
      }
      if (to.path.startsWith('/icor')) {
        store.dispatch('showPaneICOR')
        // store.dispatch('enableModeICOR')
        return next()
      }
      store.dispatch('showPaneContent')
      if (to.path.startsWith('/stats')) {
        // store.dispatch('enableModeICOR')
      } else {
        // store.dispatch('enableModeDemo')
      }
    }
    return next()
  })
}
