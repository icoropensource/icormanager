import Vue from 'vue'
import Vuex from 'vuex'

import main from './main'
import userModule from './usermodule'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  modules: {
    main,
    userModule
  }
})

export default store
