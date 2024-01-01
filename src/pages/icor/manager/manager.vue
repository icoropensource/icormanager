<template>
    <div class="row no-wrap justify-between items-start content-stretch" v-if="getAppMode_ICOR">
      <div :class="classLeftRow">
          <q-tabs :refs="$refs" align="justify" no-pane-border class="fit" @select="repositoryTabSelect" v-model="tabs.selectedLeft">
            <q-tab default name="tab-1" slot="title" icon="device_hub" @click="repositoryTabClick">
              <q-tooltip>Serwisy i aplikacje</q-tooltip>
              <q-popover v-model="showHelp" :disable="!showHelp">
                <h3>Serwisy i aplikacje</h3>
                <p>Drzewo aplikacji, rozdziały i linki.</p>
                <p>Każdy użytkownik widzi tylko to, do czego ma uprawnienia</p>
              </q-popover>
            </q-tab>
            <q-tab name="tab-2" slot="title" icon="extension" @click="repositoryTabClick"><q-tooltip>Repozytorium</q-tooltip></q-tab>
            <q-tab name="tab-3" slot="title" icon="build" @click="repositoryTabClick"><q-tooltip>System</q-tooltip></q-tab>
            <q-tab name="tab-4" slot="title" icon="search" @click="repositoryTabClick"><q-tooltip>Wyszukiwanie</q-tooltip></q-tab>
            <q-tab name="tab-5" slot="title" icon="reorder" @click="repositoryTabClick"><q-tooltip>Zakładki</q-tooltip></q-tab>
            <q-tab-pane name="tab-1" keep-alive class="q-pa-none">
              <iframe id="tocpane" :src="urlIFrameTOC" class="myframe" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="auto"></iframe>
            </q-tab-pane>
            <q-tab-pane name="tab-2" keep-alive class="q-pa-none">
              <iframe id="Iframe1conf" :src="urlIFrameConf" class="myframe" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="auto"></iframe>
            </q-tab-pane>
            <q-tab-pane name="tab-3" keep-alive class="q-pa-none">
              <iframe id="Iframe1system" :src="urlIFrameSystem" class="myframe" frameborder="0" width="100%" marginheight="0" marginwidth="0" scrolling="auto"></iframe>
            </q-tab-pane>
            <q-tab-pane name="tab-4" keep-alive class="q-pa-none">
              <q-scroll-area class="myframe">
                <card-search-filter @fetch="fetchSearchData"></card-search-filter>
              </q-scroll-area>
            </q-tab-pane>
            <q-tab-pane name="tab-5" keep-alive class="q-pa-none">
              <card-favorite :tabs="tabs" class="myframe2"></card-favorite>
            </q-tab-pane>
          </q-tabs>
      </div>
      <div class="col">
          <q-tabs :refs="$refs" v-model="tabs.selected" align="left" no-pane-border>
            <q-tab v-for="item in tabs.items" :key="item.name" slot="title" :name="item.name">
              <div>
                <span v-html="item.label?decodeHTML(item.label):'Dane'"></span>
                <div class="accept_click row no-wrap inline items-center q-chip-floating q-chip-dense tab-chip" v-if="getShow_TabCloseButton">
                  <q-btn round dense class="z-max" size="xs" color="negative" icon="close" @click.stop="clickTabClose(item.name)" />
                </div>
              </div>
              <q-tooltip><span v-html="item.label"></span><div v-if="item.sublabel!==''"><br><span v-if="item.actionlabel">{{item.actionlabel}} - </span><span v-html="item.sublabel"></span></div></q-tooltip>
            </q-tab>
            <q-tab-pane v-for="item in tabs.items" :key="item.name" :name="item.name" keep-alive  class="q-pa-none">
              <tab-manager :tabitem="item" v-if="item.tabtype===''"></tab-manager>
              <stats :tabitem="item" v-if="item.tabtype==='/stats/'"></stats>
              <uzytkownikdane :tabitem="item" v-if="item.tabtype==='/user/settings/'"></uzytkownikdane>
              <administracjauzytkownicy :tabitem="item" v-if="item.tabtype==='/users/search/'"></administracjauzytkownicy>
              <card-settings :tabitem="item" v-if="item.tabtype==='/app/settings/'"></card-settings>
              <card-search :tabitem="item" v-if="item.tabtype==='/app/search/'"></card-search>
              <card-search-files :tabitem="item" v-if="item.tabtype==='/app/searchfiles/'"></card-search-files>
              <icor-object-edit :tabitem="item" v-if="item.tabtype==='objectedit'"></icor-object-edit>
              <icor-object-edit-form :tabitem="item" v-if="item.tabtype==='objecteditform'"></icor-object-edit-form>
            </q-tab-pane>
          </q-tabs>
      </div>
      <q-modal ref="modalfilemanager" class="maximized" :content-css="{padding: '50px'}" @open="notifyFMModal('open')" @escape-key="notifyFMModal('escape-key')" @close="notifyFMModal('close')">
        <!--<iframe :src="isrc" class="modal-iframe"></iframe>-->
        <button class="tertiary" @click="$refs.modalfilemanager.close()">Zamknij</button>
      </q-modal>
      <q-modal v-model="fileSelectModalOpened" @hide="onFileSelectHide" :content-css="{minWidth: '95vw', minHeight: '95vh'}">
        <card-search-files :asdialog="true" @submit="onFileSelectSubmit" @cancel="onFileSelectCancel"></card-search-files>
      </q-modal>
      <q-modal v-model="tableSelectModalOpened" @hide="onTableSelectHide" :content-css="{minWidth: '60vw', minHeight: '70vh'}">
        <card-search-tables :asdialog="true" ref="thisCardSearchTables" @submit="onTableSelectSubmit" @cancel="onTableSelectCancel"></card-search-tables>
      </q-modal>
    </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import cardFavorite from './cardFavorite.vue'
import cardSettings from './cardSettings.vue'
import cardSearch from './cardSearch.vue'
import cardSearchFiles from './cardSearchFiles.vue'
import cardSearchTables from './cardSearchTables.vue'
import cardSearchFilter from './CardSearchFilter'
import tabManager from './tabManager.vue'
import stats from '../stats/stats.vue'
import uzytkownikdane from './users/uzytkownikdane.vue'
import administracjauzytkownicy from './users/administracjauzytkownicy.vue'
import icorObjectEdit from './icorObjectEdit.vue'
import icorObjectEditForm from './icorObjectEditForm.vue'

import URI from 'urijs'

export default {
  name: 'ICORManager',
  data () {
    return {
      isrc: '',
      tabStates: {},
      tabs: {
        selectedLeft: 'tab-1',
        scroll: {
          'tab-1': {x: 0, y: 0},
          'tab-2': {x: 0, y: 0},
          'tab-3': {x: 0, y: 0}
        },
        selected: 'tab-b-1',
        cnt: 1,
        items: []
      },
      fileSelectModalOpened: false,
      fileSelectEvent: null,
      tableSelectModalOpened: false,
      tableSelectEvent: null
    }
  },
  components: {
    cardSettings,
    cardSearch,
    cardSearchFiles,
    cardSearchFilter,
    cardSearchTables,
    cardFavorite,
    tabManager,
    stats,
    uzytkownikdane,
    administracjauzytkownicy,
    icorObjectEdit,
    icorObjectEditForm
  },
  created () {
    this.$store.dispatch('initLocalParameters')
    this.$root.$on('open-filemanager', this.openFileManager)
    this.$root.$on('change-ICOR-URL', this.changeICORURL)
    this.$root.$on('logout', this.logout)
    this.$root.$on('click-LastVisitHistory', this.clickLastVisitHistory)
    this.$root.$on('click-CloseActiveTab', this.clickCloseActiveTab)
    this.$root.$on('click-AddNewTab', this.clickAddNewTab)
    this.$root.$on('click-RefreshActiveTab', this.clickRefreshActiveTab)
    this.$root.$on('set-manager-tab-info', this.setManagerTabInfo)
    this.$root.$on('remove-manager-tab', this.removeManagerTab)
    this.$root.$on('tab-setNewTabRoute', this.tabSetNewTabRoute)
    this.$root.$on('notify-message', this.notifyMessage)
    if (window.addEventListener) {
      window.addEventListener('message', this.listenWindowMessage, false)
    } else {
      window.attachEvent('onmessage', this.listenWindowMessage)
    }
    let dd = Vue.vueDragula.find('attachments-bag')
    if (typeof dd === 'undefined') {
      Vue.vueDragula.options('attachments-bag', {
        direction: 'vertical',
        moves: (el, source, handle, sibling) => {
          return handle.classList.contains('handle')
        }
      })
      Vue.vueDragula.options('httpattachments-bag', {
        direction: 'vertical',
        moves: (el, source, handle, sibling) => {
          return handle.classList.contains('handle')
        }
      })
      Vue.vueDragula.options('multimedia-bag', {
        direction: 'vertical',
        moves: (el, source, handle, sibling) => {
          return handle.classList.contains('handle')
        }
      })
      Vue.vueDragula.options('tabs-bag', {
        direction: 'vertical',
        moves: (el, source, handle, sibling) => {
          return handle.classList.contains('handle')
        }
      })
    }
  },
  beforeDestroy () {
    this.$root.$off('open-filemanager', this.openFileManager)
    this.$root.$off('change-ICOR-URL', this.changeICORURL)
    this.$root.$off('logout', this.logout)
    this.$root.$off('click-LastVisitHistory', this.clickLastVisitHistory)
    this.$root.$off('click-CloseActiveTab', this.clickCloseActiveTab)
    this.$root.$off('click-AddNewTab', this.clickAddNewTab)
    this.$root.$off('click-RefreshActiveTab', this.clickRefreshActiveTab)
    this.$root.$off('set-manager-tab-info', this.setManagerTabInfo)
    this.$root.$off('remove-manager-tab', this.removeManagerTab)
    this.$root.$off('tab-setNewTabRoute', this.tabSetNewTabRoute)
    this.$root.$off('notify-message', this.notifyMessage)
    if (window.addEventListener) {
      window.removeEventListener('message', this.listenWindowMessage, false)
    } else {
      window.detachEvent('onmessage', this.listenWindowMessage)
    }
  },
  mounted () {
    Vue.vueDragula.eventBus.$on(
      'drop',
      (args) => {
        // console.log('drop: ' + args[0])
        // console.log(this.objectAttachments)
      }
    )
    Vue.vueDragula.eventBus.$on(
      'dropModel',
      (args) => {
        let tab = this.getActiveTab(false)
        if (args[0] === 'attachments-bag') {
          this.$nextTick(function () {
            this.$root.$emit('drop-attachments', {
              tab: tab
            })
          })
          return
        }
        if (args[0] === 'httpattachments-bag') {
          this.$nextTick(function () {
            this.$root.$emit('drop-httpattachments', {
              tab: tab
            })
          })
          return
        }
        if (args[0] === 'multimedia-bag') {
          this.$nextTick(function () {
            this.$root.$emit('drop-multimedia', {
              tab: tab
            })
          })
        }
      }
    )
  },
  computed: {
    ...mapGetters(['getICORURL', 'getAppMode_ICOR', 'getUser_UserName', 'getLeftRows', 'getShow_Help', 'getShow_TabCloseButton', 'getShow_LinksInNewTab', 'getShow_LinksTabSelect', 'getNewInterface']),
    showHelp: {
      get: function () {
        return this.getShow_Help
      },
      set: function (newValue) {
        // console.log('setshowhelp: ' + newValue)
        this.setShow_Help(false)
      }
    },
    leftRows: {
      get: function () {
        return this.getLeftRows
      },
      set: function (newValue) {
        // console.log('setshowhelp: ' + newValue)
      }
    },
    classLeftRow () {
      let d = {}
      d['col-' + this.leftRows] = true
      return d
    },
    urlIFrameTOC () {
      if (this.getUser_UserName === '') {
        return ''
      }
      return `${this.getICORURL}/icormanager/contents20.asp`
    },
    urlIFrameConf () {
      if (this.getUser_UserName === '') {
        return ''
      }
      return `${this.getICORURL}/icormanager/contents20conf.asp`
    },
    urlIFrameSystem () {
      if (this.getUser_UserName === '') {
        return ''
      }
      return `${this.getICORURL}/icormanager/contents20system.asp`
    }
  },
  methods: {
    ...mapMutations(['setShow_Help', 'addNotifyMessages']),
    decodeHTML (value) {
      return this.$icor.data.decodeHTML(value)
    },
    openFileManager (event) {
      // this.fm_oidref = '' // event.oidref || ''
      // this.fm_poid = -1 // event.poid || -1
      // this.$refs.modalfilemanager.open()
      this.changeICORURL({
        url: this.getICORURL + '/icormanager/jslib/rich-filemanager/index.html?__nt=1' // ifm.html'
      })
    },
    repositoryTabSelect (newTab) {
      let iframe = null
      if (newTab === 'tab-1') {
        iframe = document.getElementById('tocpane')
      }
      if (newTab === 'tab-2') {
        iframe = document.getElementById('Iframe1conf')
      }
      if (newTab === 'tab-3') {
        iframe = document.getElementById('Iframe1system')
      }
      if ((iframe !== null) && (iframe !== undefined)) {
        setTimeout(() => {
          iframe.contentWindow.scrollTo(this.tabs.scroll[newTab].x, this.tabs.scroll[newTab].y)
        }, 10)
      }
    },
    repositoryTabClick (newTab) {
      let iframe = null
      if (this.tabs.selectedLeft === newTab) {
        return
      }
      if (this.tabs.selectedLeft === 'tab-1') {
        iframe = document.getElementById('tocpane')
      }
      if (this.tabs.selectedLeft === 'tab-2') {
        iframe = document.getElementById('Iframe1conf')
      }
      if (this.tabs.selectedLeft === 'tab-3') {
        iframe = document.getElementById('Iframe1system')
      }
      if ((iframe !== null) && (iframe !== undefined)) {
        this.tabs.scroll[this.tabs.selectedLeft].x = iframe.contentWindow.pageXOffset
        this.tabs.scroll[this.tabs.selectedLeft].y = iframe.contentWindow.pageYOffset
      }
    },
    notifyMessage (event) {
      this.addNotifyMessages(event)
      this.$q.notify(event)
    },
    onFileSelectHide () {
      // this.fileSelectModalOpened = false
    },
    onTableSelectHide () {
      // this.tableSelectModalOpened = false
    },
    onFileSelectSubmit (data) {
      this.fileSelectModalOpened = false
      let dp = {
        type: 'editorButtonClickSubmit',
        ownerTab: this.fileSelectEvent.data.ownerTab,
        ownerSheet: this.fileSelectEvent.data.ownerSheet,
        fieldname: this.fileSelectEvent.data.fieldname,
        fieldvalue: '<a href="#">hello file</a>'
      }
      this.fileSelectEvent.source.postMessage(dp, '*')
    },
    onTableSelectSubmit (data) {
      this.tableSelectModalOpened = false
      let dp = {
        type: 'editorButtonClickSubmit',
        ownerTab: this.tableSelectEvent.data.ownerTab,
        ownerSheet: this.tableSelectEvent.data.ownerSheet,
        fieldname: this.tableSelectEvent.data.fieldname,
        fieldvalue: `{{tabela:${data.oid}}}`
      }
      this.tableSelectEvent.source.postMessage(dp, '*')
    },
    onFileSelectCancel () {
      this.fileSelectModalOpened = false
    },
    onTableSelectCancel () {
      this.tableSelectModalOpened = false
    },
    listenWindowMessage (event) {
      let tab = this.getActiveTab(false)
      if (event.data.type === 'setIframeTextSrc') {
        this.$nextTick(function () {
          this.$root.$emit('change-ICOR-URL', {
            url: event.data.href
          })
        })
        return
      }
      if ((event.data.type === 'editorButtonClick') && (event.data.mode === 'file')) {
        this.$nextTick(function () {
          this.fileSelectEvent = event
          this.fileSelectModalOpened = true
        })
        return
      }
      if ((event.data.type === 'editorButtonClick') && (event.data.mode === 'table')) {
        this.$nextTick(function () {
          this.tableSelectEvent = event
          this.tableSelectModalOpened = true
          this.$refs.thisCardSearchTables.modalShow(event.data)
        })
        return
      }
      if (event.data.type === 'manageAttachments') {
        alert('manageAttachments: ' + event.data.oidref + ' - ' + event.data.poid)
        this.$root.$emit('open-filemanager', {
          oidref: event.data.oidref,
          poid: event.data.poid
        })
        return
      }
      if (event.data.type === 'manageHTTPAttachments') {
        alert('manageHTTPAttachments: ' + event.data.oidref + ' - ' + event.data.poid)
        this.$root.$emit('open-filemanager', {
          oidref: event.data.oidref,
          poid: event.data.poid
        })
        return
      }
      if ((event.data.type === 'setDBDataViewStart') && (tab !== null)) {
        if (event.data.ownerTab !== '') {
          let ntab = this.getTabByName(event.data.ownerTab)
          if (ntab !== null) {
            tab = ntab
          }
        }
        this.$nextTick(function () {
          this.$root.$emit('tab-setDBDataViewStart', {
            tab: tab,
            data: event.data
          })
        })
        return
      }
      if (event.data.type === 'setJobType') {
        if (event.data.ownerTab !== '') {
          let ntab = this.getTabByName(event.data.ownerTab)
          if (ntab !== null) {
            tab = ntab
          }
        }
        this.$nextTick(function () {
          const nevent = {
            tab: tab,
            data: event.data
          }
          // console.log('$emit tab-setJobTypeStart:', nevent)
          this.$root.$emit('tab-setJobTypeStart', nevent)
        })
        return
      }
      if (event.data.type === 'registerStateBadOK') {
        this.tabStates[event.data.aid] = event.data.aid
        this.$root.$emit('notify-message', {type: 'info', position: 'bottom-right', message: 'Rozpoczęło się przetwarzanie zlecenia o identyfikatorze ' + event.data.aid})
        setTimeout(this.eventStateChecker.bind(this), 2000)
      }
    },
    async eventStateChecker () {
      var astateid, w
      w = 0
      for (astateid in this.tabStates) {
        w = 1
        let [name, value] = await this.$icor.main.stateGet(astateid)
        if (value === 'OK') {
          try {
            delete this.tabStates[astateid]
          } catch (ex) {
          }
          this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Zlecenie zakończyło się sukcesem. Identyfikator: ' + astateid + '<br>' + name})
        }
        if (value === 'BAD') {
          try {
            delete this.tabStates[astateid]
          } catch (ex) {
          }
          this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Zlecenie zakończyło się niepowodzeniem. Identyfikator: ' + astateid + '<br>' + name})
        }
        if (value === 'DEL') {
          try {
            delete this.tabStates[astateid]
          } catch (ex) {
          }
          // this.$q.notify({type: 'warning', position: 'bottom-right', message: 'Zlecenie nie istnieje. Identyfikator: ' + astateid})
        }
      }
      if (w === 1) {
        setTimeout(this.eventStateChecker.bind(this), 4000)
      }
    },
    async logout () {
      let status = await this.$icor.main.logout()
      if (status === 0) {
        this.$store.dispatch('setUser', {})
        this.$router.push('/login')
      }
      // Toast.create.negative('Wystąpił błąd w komunikacji. Skontaktuj się z administratorem.')
    },
    notifyFMModal (mode) {
      if (mode === 'open') {
        this.isrc = this.getICORURL + '/icormanager/jslib/rich-filemanager/index.html' // ifm.html
      }
      if (mode === 'escape-key') {
      }
      if (mode === 'close') {
        this.isrc = ''
      }
    },
    removeTabByIndex (tabindex) {
      let changetab = this.tabs.items[tabindex].name === this.tabs.selected
      this.tabs.items.splice(tabindex, 1)
      if (changetab && (this.tabs.items.length > 0)) {
        this.$nextTick(function () {
          if (tabindex >= this.tabs.items.length) {
            tabindex--
          }
          this.tabs.selected = this.tabs.items[tabindex].name
        })
      }
    },
    removeTabByID (tabid) {
      for (var i in this.tabs.items) {
        if (this.tabs.items[i].id === tabid) {
          this.removeTabByIndex(i)
          break
        }
      }
    },
    removeTabByName (tabname) {
      for (var i in this.tabs.items) {
        if (this.tabs.items[i].name === tabname) {
          this.removeTabByIndex(i)
          break
        }
      }
    },
    addNewTab (url = '', aicon = '', tabtype = '', tabid = '', tabdata = {}) {
      if (url === '') {
        url = 'startpage20q.asp'
      } else {
        url = this.$icor.data.urlRemoveRandomQuery(url)
      }
      if (aicon === '') {
        aicon = 'description'
      }
      let ti = this.tabs.cnt
      this.tabs.cnt += 1
      let alabel = 'Zakładka nr ' + ti
      let asublabel = ''
      if (tabdata.title) {
        alabel = tabdata.title
      }
      if (tabdata.contentSubtitle) {
        asublabel = tabdata.contentSubtitle
      }
      let dt = {
        id: ti,
        name: 'ltab_' + ti,
        label: alabel,
        sublabel: asublabel,
        actionlabel: '',
        icon: aicon,
        url: '', // url
        tabtype: tabtype,
        tabid: tabid,
        tabdata: tabdata
      }
      // window.addEventListener
      this.tabs.items.push(dt)
      if (this.getShow_LinksTabSelect || (this.tabs.items.length === 1)) {
        this.tabs.selected = dt.name
        this.$nextTick(function () {
          window.dispatchEvent(new Event('resize'))
        })
      }
      return dt
    },
    getTabByName (tabname) {
      for (var i in this.tabs.items) {
        if (this.tabs.items[i].name === tabname) {
          return this.tabs.items[i]
        }
      }
      return null
    },
    getTabByURL (url) {
      url = this.$icor.data.urlRemoveRandomQuery(url)
      for (var i in this.tabs.items) {
        if (this.tabs.items[i].url === url) {
          return this.tabs.items[i]
        }
      }
      return null
    },
    getTabByData (data, aselect = true) {
      for (var i in this.tabs.items) {
        const ttab = this.tabs.items[i]
        const tdata = ttab.tabdata
        if ((tdata.jobtype === data.jobtype) && (tdata.CID === data.CID) && (tdata.OID === data.OID)) {
          if (aselect) {
            this.tabs.selected = ttab.name
          }
          return ttab
        }
      }
      return null
    },
    getActiveTab (anew = true, aurl = '', anoiframe = false) {
      let dt = null
      if (aurl !== '') {
        dt = this.getTabByURL(aurl)
        if (dt !== null) {
          this.tabs.selected = dt.name
        }
      }
      if (dt === null) {
        if (this.tabs.items.length > 0) {
          dt = this.getTabByName(this.tabs.selected)
        }
        if (anoiframe && (dt !== null) && dt.tabtype) {
          dt = this.addNewTab(aurl)
        }
        if ((dt === null) && anew) {
          dt = this.addNewTab(aurl)
        }
      }
      return dt
    },
    removeManagerTab (event) {
      for (var i in this.tabs.items) {
        if (this.tabs.items[i].id === event.tab.id) {
          this.tabs.items.splice(i, 1)
          if (this.tabs.items.length > 0) {
            if (i >= this.tabs.items.length) {
              i--
            }
            this.tabs.selected = this.tabs.items[i].name
          }
          break
        }
      }
    },
    setManagerTabInfo (event) {
      let tab = this.getTabByName(event.tab.name)
      if (tab === null) {
        return
      }
      if (event.label !== undefined) {
        this.$set(tab, 'label', event.label)
      }
      if (event.sublabel !== undefined) {
        this.$set(tab, 'sublabel', event.sublabel)
      }
      if (event.icon !== undefined) {
        this.$set(tab, 'icon', event.icon)
      }
      if (event.url !== undefined) {
        this.$set(tab, 'url', event.url)
      }
      if (event.actionlabel !== undefined) {
        this.$set(tab, 'actionlabel', event.actionlabel)
      }
    },
    async changeICORURL (event) {
      console.log('changeICORURL', event)
      // debugger
      if (event.removetab) {
        this.removeManagerTab({tab: {id: event.removetab}})
      }
      let newtab = event.url.search('__nt=1') >= 0
      let url = this.$icor.data.urlRemoveQuery(event.url, '__nt')
      let uri = URI.parse(url)
      if (uri.path.indexOf('icormain.asp') >= 0) {
        let query = URI.parseQuery(uri.query)
        if (event.url !== '') { // event.frommenu
          if (query.jobtype === 'menuitem') {
            let menuoid = query.OID
            let jurl = this.$icor.data.urlSetQuery(url, 'XMLData', 'json')
            let curl = this.$icor.data.urlSetQuery(jurl, 'checkaction', '1')
            const data = await this.$icor.main.ideICORMainAction(curl)
            console.log('FROMMENU:', curl, data)
            // nowa obsluga edycji obiektow ICOR - wylaczona na teraz
            if (data.data.action === 'ObjectEdit$$') {
              if (event.frommenu && event.fromtabid) {
                this.removeManagerTab({tab: {id: event.fromtabid}})
              }
              query.jobtype = 'objecteditform'
              query.CID = data.data.refCID.toString()
              query.OID = data.data.refOID.toString()
              query.url = this.$icor.data.urlSetQuery(jurl, '_jsonres', '1')
              query.fromurl = event.url
              query.fromtabid = event.fromtabid
              query.MenuOID = menuoid
              let dt = this.getTabByData(query)
              if (event.removetab && (dt !== null)) {
                this.removeManagerTab({tab: {id: dt.id}})
                dt = null
              }
              if (dt === null) {
                this.addNewTab('', '', query.jobtype, '', query)
              } else {
                this.$root.$emit('tab-refresh', {tab: {id: dt.id.id}})
              }
              return
            }
          }
        }
        if (query.jobtype === 'objectedit') {
          let dt = this.getTabByData(query)
          if (event.removetab && (dt !== null)) {
            this.removeManagerTab({tab: {id: dt.id}})
            dt = null
          }
          if (dt === null) {
            this.addNewTab('', '', query.jobtype, '', query)
          }
          return
        }
      }
      let tab = null
      if (newtab && this.getShow_LinksInNewTab) {
        tab = this.addNewTab(url)
      } else {
        tab = this.getActiveTab(true, url, true)
      }
      this.$nextTick(function () {
        this.$root.$emit('tab-setURL', {
          tab: tab,
          url: url
        })
      })
    },
    tabSetNewTabRoute (event) {
      this.addNewTab('', '', event.routetype, event.routeid, event.data)
    },
    clickLastVisitHistory () {
      this.changeICORURL({url: '/icormanager/icormain.asp?jobtype=lastvisithistory&id=searchform'})
      this.$q.notify({type: 'info', position: 'bottom-right', message: 'Powrót do ostatniej wyszukiwarki lub widoku rekordu.'})
    },
    clickCloseActiveTab (event) {
      let tab = this.getActiveTab(false)
      if (tab !== null) {
        this.removeTabByID(tab.id)
      }
    },
    clickAddNewTab () {
      let tab = this.addNewTab()
      this.$nextTick(function () {
        this.$root.$emit('tab-setURL', {
          tab: tab,
          url: tab.url
        })
      })
    },
    clickRefreshActiveTab () {
      let tab = this.getActiveTab(false)
      if (tab !== null) {
        this.$nextTick(function () {
          this.$root.$emit('tab-setURL', {
            tab: tab,
            url: tab.url
          })
        })
      }
    },
    clickTabClose (tabname) {
      let tab = this.getTabByName(tabname)
      if (tab !== null) {
        this.removeTabByID(tab.id)
      }
    },
    async fetchSearchData (searchData) {
      this.$root.$emit('tab-setNewTabRoute', {
        routetype: '/app/search/',
        routeid: '',
        data: {
          title: 'Szukaj',
          contentSubtitle: 'w serwisie i aplikacjach',
          searchInit: true,
          searchData: searchData,
          showFilters: false
        }
      })
    }
  }
}
</script>

<style scoped>
.x_content {
   overflow: auto;
   width: 100%;
   height: 80vh;
   margin: 0;
}

.myframe {
   overflow: hidden;
   height: calc(100vh - 106px);
   width: 100%;
}

.myframe2 {
   overflow: hidden;
   height: calc(100vh - 156px);
   width: 100%;
}

.modal-iframe {
  width: 100%;
  height: 100%;
}

.q-tab {
  text-transform: none !important;
}
.q-tabs-head {
  font-size: 0.72rem !important;
}

.accept_click {
  /*
  z-index: 10000 !important;
  user-select: all !important;
  */
  pointer-events: auto !important;
}

.tab-chip {
  top: 1px !important;
  right: 1px !important;
}
</style>
