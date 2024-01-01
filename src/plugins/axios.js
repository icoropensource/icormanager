import axios from 'axios'

let numberOfAjaxCallPending = 0

export default async ({ app, router, store, Vue }) => {
  /*
  var configURL
  if ((window.location.hostname === 'localhost') && (window.location.port === '8082') && (window.location.protocol === 'http:')) {
    configURL = 'statics/config_dev.json'
  } else {
    configURL = 'statics/config_prod.json'
  }
  let response = await axios.get(configURL)
  store.commit('setICORURL', response.data.url)
  */
  function checkLoadingState (state) {
    if (state) {
      numberOfAjaxCallPending += 1
      store.commit('isLoading')
    } else {
      numberOfAjaxCallPending -= 1
      if (numberOfAjaxCallPending === 0) {
        store.commit('isNotLoading')
      }
    }
  }

  //  intercetor: auth
  function interceptorRequestAuth (config) {
    checkLoadingState(true)
    console.log('request auth: ' + store.getters.getUser_Token)
    if (store.getters.getUser_Token) {
      config.headers['Authorization'] = 'Bearer ' + store.getters.getUser_Token
    }
    // config.headers['XXX-AuthInterceptor'] = 'on'
    return config
  }

  function interceptorRequestAuthError (error) {
    checkLoadingState(false)
    return Promise.reject(error)
  }

  /*
  function interceptorResponseAuth (response) {
    checkLoadingState(false)
    return response
  }

  function interceptorResponseAuthError (error) {
    checkLoadingState(false)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      store.dispatch('setUser', {}, router.app.$root) // logout
      console.log('http code: ' + error.response.status + ', redirect: ' + router.app._route.fullPath)
      router.push({
        path: '/login/',
        query: {
          redirect: router.app._route.fullPath
        }
      })
    }
    return Promise.reject(error)
  }
  */

  //  intercetor: loading
  function interceptorRequestLoading (config) {
    router.app.$root.$emit('loadingShow', 'interceptor')
    return config
  }

  function interceptorRequestLoadingError (error) {
    router.app.$root.$emit('loadingHide', 'interceptor')
    return Promise.reject(error)
  }

  function interceptorResponseLoading (response) {
    router.app.$root.$emit('loadingHide', 'interceptor')
    return response
  }

  function interceptorResponseLoadingError (error) {
    router.app.$root.$emit('loadingHide', 'interceptor')
    return Promise.reject(error)
  }

  const axiosInstanceJsonPlaceholder = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
  })

  const axiosInstanceGroupKt = axios.create({
    baseURL: 'http://services.groupkt.com'
  })

  const axiosInstanceICOR = axios.create({
    baseURL: store.getters.getICORURL,
    withCredentials: true
  })
  axiosInstanceICOR.interceptors.request.use(interceptorRequestAuth, interceptorRequestAuthError)
  const axiosInstanceICORLoading = axios.create({
    baseURL: store.getters.getICORURL,
    withCredentials: true
  })
  axiosInstanceICORLoading.interceptors.request.use(interceptorRequestLoading, interceptorRequestLoadingError)
  axiosInstanceICORLoading.interceptors.response.use(interceptorResponseLoading, interceptorResponseLoadingError)
  axiosInstanceICORLoading.interceptors.request.use(interceptorRequestAuth, interceptorRequestAuthError)

  let clients = {
    $http: {
      get () {
        return {
          axios: axios,
          jsonplaceholder: axiosInstanceJsonPlaceholder,
          groupKt: axiosInstanceGroupKt,
          icor: axiosInstanceICOR,
          icorLoading: axiosInstanceICORLoading
        }
      }
    }
  }

  Object.defineProperties(Vue.prototype, clients)
}
