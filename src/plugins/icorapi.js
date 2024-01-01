import apimainUser from './api/apimain_user'
import apimainICOR from './api/apimain_icor'
import apidata from './api/apidata'

const API = {}

export default ({ app, store, router, Vue }) => {
  API['$icor'] = {
    get () {
      return {
        main: {...apimainUser(app, store, router, Vue), ...apimainICOR(app, store, router, Vue)},
        data: apidata(app, store, router, Vue)
      }
    }
  }
  Object.defineProperties(Vue.prototype, API)
}

export { API }
