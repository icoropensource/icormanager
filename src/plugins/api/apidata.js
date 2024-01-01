import {
  date
} from 'quasar'

import URI from 'urijs'

export default (app, store, router, Vue) => {
  return {
    'name': 'data',
    async init () {
      return 'x_data'
    },
    getDateAsStr (value) {
      if (value) {
        // return date.formatDate(new Date(value), 'YYYY-MM-DD').replace(/-/g, '&#8209;')
        return date.formatDate(new Date(value), 'YYYY-MM-DD').replace(/-/g, '-')
      }
      return ''
    },
    getDateTimeAsStr (value) {
      if (value) {
        // return date.formatDate(new Date(value), 'YYYY-MM-DD').replace(/-/g, '&#8209;')
        return date.formatDate(new Date(value), 'YYYY-MM-DD HH:mm:ss').replace(/-/g, '-')
      }
      return ''
    },
    getCurrentDateTimeAsStr () {
      return date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss').replace(/-/g, '-')
    },
    getTupleAsDateTimeStr (value) {
      let adate
      if (value.length === 3) {
        adate = date.buildDate({year: value[0], month: value[1], date: value[2]})
        return date.formatDate(adate, 'YYYY-MM-DD').replace(/-/g, '-')
      } else if ((value.length === 7) && (value[3] === 0) && (value[4] === 0) && (value[5] === 0)) {
        adate = date.buildDate({year: value[0], month: value[1], date: value[2]})
        return date.formatDate(adate, 'YYYY-MM-DD').replace(/-/g, '-')
      } else if (value.length === 7) {
        adate = date.buildDate({year: value[0], month: value[1], date: value[2], hours: value[3], minutes: value[4], seconds: value[5]})
        return date.formatDate(adate, 'YYYY-MM-DD HH:mm:ss').replace(/-/g, '-')
      }
      return ''
    },
    getNumAsMoney (value) {
      if (value) {
        return value.toLocaleString('pl-PL', {style: 'currency', currency: 'PLN'})
      }
      return '0.00'.toLocaleString('pl-PL', {style: 'currency', currency: 'PLN'})
    },
    async wait (milliseconds = 2500) {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    },
    urlSetRandomQuery (url, aparam = '__r', avalue = '') {
      if (avalue === '') {
        avalue = Math.floor(Math.random() * 100000)
      }
      return URI(url).setQuery(aparam, avalue).toString()
    },
    urlSetQuery (url, aparam, avalue) {
      return URI(url).setQuery(aparam, avalue).toString()
    },
    urlRemoveRandomQuery (url, aparam = '__r') {
      return URI(url).removeQuery(aparam).toString()
    },
    urlRemoveQuery (url, aparam) {
      return URI(url).removeQuery(aparam).toString()
    },
    decodeHTML (html) {
      var txt = document.createElement('textarea')
      txt.innerHTML = html
      var ret = txt.value
      return ret
    }
  }
}
