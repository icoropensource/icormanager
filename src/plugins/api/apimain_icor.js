export default (app, store, router, Vue) => {
  return {
    getParamsByMode (mode, dbitem, itemdata) {
      let params = {
        mode: mode,
        ioid: dbitem.oid,
        tid: dbitem.tid,
        poid: dbitem.poid,
        chapterid: dbitem.chapterid,
        ...itemdata
      }
      return params
    },
    normalizeICORURL (url) {
      if (url.indexOf('icormain.asp') === 0) {
        url = '/icormanager/' + url
      }
      return url
    },
    async appSessionCheck () {
      if (store.getters.getAppMode_ICOR) {
        return Vue.prototype.$http.icor.post('/icormanager/appsvc.asp', 'm=SessionCheck', {
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }
    },
    async stateGet (astateid) {
      let params = {
        aid: astateid
      }
      let response = await Vue.prototype.$http.icor.get('/icormanager/app/stateGet', {params: params})
      if (response.data.status === 'OK') {
        return [response.data.data.name, response.data.data.value]
      }
      return ['', '']
    },
    async statsGet (url) {
      let response = await Vue.prototype.$http.icorLoading.post(url, '')
      return [response]
    },
    async getExecutorMethodInfo (meid) {
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/stats/getExecutorMethodInfo', {meid})
      if (response.data.status === 0) {
        return response.data.data
      }
      return []
    },
    async getTimeToken (mode, dbitem) {
      let params = this.getParamsByMode(mode, dbitem)
      let response = await Vue.prototype.$http.icor.get('/icormanager/app/getTimeToken', {params: params})
      if (response.data.status === 'OK') {
        return [response.data.data._ttt, response.statusText, response]
      }
      return ['', response.statusText, response]
    },
    async attachmentsLoad (dbitem) {
      let [ttt] = await this.getTimeToken('uploadAttachment', dbitem)
      let params = this.getParamsByMode('list', dbitem)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/filemanager/attachments', {params: params})
      if (response.data.data) {
        return [ttt, response.data.data]
      }
      return [ttt, []]
    },
    async httpattachmentsLoad (dbitem) {
      let [ttt] = await this.getTimeToken('uploadHTTPAttachment', dbitem)
      let params = this.getParamsByMode('list', dbitem)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/filemanager/httpattachments', {params: params})
      if (response.data.data) {
        return [ttt, response.data.data]
      }
      return [ttt, []]
    },
    async attachmentsSave (dbitem, itemdata) {
      let params = this.getParamsByMode('update', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/filemanager/attachments', params)
      return [response]
    },
    async httpattachmentsSave (dbitem, itemdata) {
      let params = this.getParamsByMode('update', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/filemanager/httpattachments', params)
      return [response]
    },
    async attachmentsSetPosition (dbitem, itemdata) {
      let params = this.getParamsByMode('updateposition', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/filemanager/attachments', params)
      return [response]
    },
    async httpattachmentsSetPosition (dbitem, itemdata) {
      let params = this.getParamsByMode('updateposition', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/filemanager/httpattachments', params)
      return [response]
    },
    async attachmentsRemove (dbitem, itemdata) {
      let params = this.getParamsByMode('remove', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/filemanager/attachments', {params: params})
      return [response]
    },
    async httpattachmentsRemove (dbitem, itemdata) {
      let params = this.getParamsByMode('remove', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/filemanager/httpattachments', {params: params})
      return [response]
    },
    async attachmentsSearchField (dbitem, itemdata, done) {
      let params = this.getParamsByMode('autocomplete', dbitem, itemdata)
      let response = await Vue.prototype.$http.icor.get('/icormanager/app/filemanager/attachments', {params: params})
      if (response.data.data) {
        done(response.data.data)
        return
      }
      done([])
    },
    async httpattachmentsSearchField (dbitem, itemdata, done) {
      let params = this.getParamsByMode('autocomplete', dbitem, itemdata)
      let response = await Vue.prototype.$http.icor.get('/icormanager/app/filemanager/httpattachments', {params: params})
      if (response.data.data) {
        done(response.data.data)
        return
      }
      done([])
    },
    async multimediaLoad (dbitem) {
      let [ttt] = await this.getTimeToken('uploadMultimedia', dbitem)
      let params = this.getParamsByMode('list', dbitem)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/filemanager/multimedia', {params: params})
      if (response.data.data) {
        return [ttt, response.data.data]
      }
      return [ttt, []]
    },
    async multimediaSave (dbitem, itemdata) {
      let params = this.getParamsByMode('update', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/filemanager/multimedia', params)
      return [response]
    },
    async multimediaSetPosition (dbitem, itemdata) {
      let params = this.getParamsByMode('updateposition', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/filemanager/multimedia', params)
      return [response]
    },
    async multimediaRemove (dbitem, itemdata) {
      let params = this.getParamsByMode('remove', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/filemanager/multimedia', {params: params})
      return [response]
    },
    async multimediaSearchField (dbitem, itemdata, done) {
      let params = this.getParamsByMode('autocomplete', dbitem, itemdata)
      let response = await Vue.prototype.$http.icor.get('/icormanager/app/filemanager/multimedia', {params: params})
      if (response.data.data) {
        done(response.data.data)
        return
      }
      done([])
    },
    async tablesDataAccessHistoryLoad (dbitem) {
      let params = this.getParamsByMode('dataaccesshistory', dbitem)
      let response = await Vue.prototype.$http.icor.get('/icormanager/app/manager/tables', {params: params})
      if (response.data.data) {
        return response.data.data
      }
      return []
    },
    async tablesDataVersionHistoryLoad (dbitem) {
      let params = this.getParamsByMode('dataversionhistory', dbitem)
      let response = await Vue.prototype.$http.icor.get('/icormanager/app/manager/tables', {params: params})
      if (response.data.data) {
        return response.data.data
      }
      return []
    },
    async tablesGetCapabilities (dbitem) {
      let params = this.getParamsByMode('tablecapabilities', dbitem)
      let response = await Vue.prototype.$http.icor.get('/icormanager/app/manager/tables', {params: params})
      if (response.data.data) {
        return response.data.data
      }
      return {}
    },
    async abstraktLoad (dbitem) {
      let params = this.getParamsByMode('abstraktload', dbitem)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/manager/abstrakt', {params: params})
      if (response.data.data) {
        return response.data.data
      }
      return {}
    },
    async abstraktSave (dbitem, itemdata) {
      let params = this.getParamsByMode('abstraktsave', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/abstrakt', params)
      return response
    },
    async kalendariumLoad (dbitem) {
      let params = this.getParamsByMode('kalendariumload', dbitem)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/manager/kalendarium', {params: params})
      if (response.data.data) {
        return response.data.data
      }
      return {}
    },
    async kalendariumSave (dbitem, itemdata) {
      let params = this.getParamsByMode('kalendariumsave', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/kalendarium', params)
      return response
    },
    async geolokalizacjaLoad (dbitem) {
      let params = this.getParamsByMode('geolokalizacjaload', dbitem)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/manager/geolokalizacja', {params: params})
      if (response.data.data) {
        return response.data.data
      }
      return {}
    },
    async geolokalizacjaSave (dbitem, itemdata) {
      let params = this.getParamsByMode('geolokalizacjasave', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/geolokalizacja', params)
      return response
    },
    async geolokalizacjaDelete (dbitem, itemdata) {
      let params = this.getParamsByMode('geolokalizacjadelete', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/geolokalizacja', params)
      return response
    },
    async categoriesLoad (dbitem) {
      let params = this.getParamsByMode('categoriesload', dbitem)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/manager/categories', {params: params})
      if (response.data.data) {
        return response.data.data
      }
      return {}
    },
    async categoriesSave (dbitem, itemdata) {
      let params = this.getParamsByMode('categoriessave', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/categories', params)
      return response
    },
    async tablesLoad (dbitem) {
      let params = this.getParamsByMode('tablesload', dbitem)
      let response = await Vue.prototype.$http.icorLoading.get('/icormanager/app/manager/tablesassigned', {params: params})
      if (response.data.data) {
        return response.data.data
      }
      return {}
    },
    async tablesSave (dbitem, itemdata) {
      let params = this.getParamsByMode('tablessave', dbitem, itemdata)
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/tablesassigned', params)
      return response
    },
    async ideICORMainAction (url) {
      url = this.normalizeICORURL(url)
      let response = await Vue.prototype.$http.icorLoading.get(url)
      return response.data
    },
    async ideICORMainActionSubmit (url, data) {
      url = this.normalizeICORURL(url)
      let response = await Vue.prototype.$http.icorLoading.post(url, data)
      return response.data
    },
    async ideObjectEdit (jobtype, cid, oid, brcid, broid) {
      let params = { jobtype, cid, oid, brcid, broid }
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/ideObjectEdit', params)
      return response.data
    },
    async ideObjectEditSheet (jobtype, cid, oid, brcid, broid, sheetid) {
      let params = { jobtype, cid, oid, brcid, broid, sheetid }
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/ideObjectEditSheet', params)
      return response.data
    },
    async ideObjectEditFormSubmit (jobtype, menuoid, cid, oid, brcid, broid, data) {
      let params = { jobtype, menuoid, cid, oid, brcid, broid, data }
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/ideObjectEditFormSubmit', params)
      return response.data
    },
    async searchRepository (searchitem) {
      let params = {
        mode: 'repository',
        searchitem
      }
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/search', params)
      return response.data
    },
    async searchFiles (searchitem) {
      let params = {
        mode: 'files',
        searchitem
      }
      let response = await Vue.prototype.$http.icorLoading.post('/icormanager/app/manager/searchfiles', params)
      return response.data
    }
  }
}
