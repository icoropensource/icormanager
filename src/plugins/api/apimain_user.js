import localstore from '../../lib/localstore.js'

export default (app, store, router, Vue) => {
  return {
    isAuthorized () {
      let tid = localstore.get('access_token', '')
      // console.log('isAuthorized:' + tid + ' t: ' + typeof tid)
      if ((typeof tid === typeof '') && (tid !== '')) {
        console.log('isAuthorized true')
        return true
      }
      console.log('isAuthorized false')
      return false
    },

    async checkSession () {
      let isauth = this.isAuthorized()
      if (!isauth) {
        return false
      }
      let isloggedin = store.getters.isLoggedIn
      if (isloggedin) {
        return true
      }
      let url = ''
      if (store.getters.getAppMode_ICOR) {
        url = '/icormanager/app/manager/checksession'
      }
      let response = await Vue.prototype.$http.icor.post(url, {})
      if (response.data.status === 0) {
        store.dispatch('setUser', response.data.user)
        return true
      }
      return false
    },

    async login (username, password) {
      let status = -1
      let user = {}
      let info = ''
      let url = ''

      if (store.getters.getAppMode_ICOR) {
        url = '/icormanager/app/manager/login_ICOR'
      }
      let params = {
        username: username,
        password: password,
        fid: store.getters.getUser_Fingerprint,
        fdata: store.getters.getUser_FingerprintComponents
      }
      let response = await Vue.prototype.$http.icorLoading.post(url, params)
      status = response.data.status
      user = {}
      info = ''
      if (status === 0) {
        user = response.data.user
        store.dispatch('setUser', user)
      } else {
        info = response.data.info
      }
      return [status, info]
    },

    async logout () {
      let url = ''
      if (store.getters.getAppMode_ICOR) {
        url = '/icormanager/app/manager/logout'
      }
      let response = await Vue.prototype.$http.icorLoading.post(url, {})
      if (response.data.status === 0) {
        store.dispatch('setUser', {})
      }
      return response.data.status
    },

    async getUsersByAdmin () {
      let params = {
        mode: 'all'
      }
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/getUsersByAdmin', params)
      if (response.data.status === 0) {
        return response.data.data
      }
      return []
    }
  }
}
