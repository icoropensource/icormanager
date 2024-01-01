<template>
  <div>
    <keep-alive>
    <q-tabs two-lines inverted no-pane-border v-model="tabs.selected" @select="tabsChange" align="left">
      <q-tab
        v-for="(item,index) in tabs.items"
        :key="item.name"
        slot="title"
        :name="item.name"
        :label="(item.actionLabel?item.actionLabel+' - ':'')+item.label?item.label:'Dane'"
        :hidden="item.hidden"
        :default="index===0"
        >
        <q-tooltip v-if="item.label">{{item.label}}<div v-if="item.sublabel!==''"><br><span v-if="item.actionLabel">{{item.actionLabel}} - </span>{{item.sublabel}}</div></q-tooltip>
      </q-tab>
      <q-tab name="tab-b-2" slot="title" :hidden="tabHiddenAttachments" icon="attach_file"><q-tooltip>Załączniki</q-tooltip></q-tab>
      <q-tab name="tab-b-3" slot="title" :hidden="tabHiddenMultimedia" icon="local_movies"><q-tooltip>Multimedia</q-tooltip></q-tab>
      <q-tab name="tab-b-12" slot="title" :hidden="tabHiddenHTTPAttachments" icon="file_copy"><q-tooltip>Pliki</q-tooltip></q-tab>
      <q-tab name="tab-b-4" slot="title" :hidden="tabHiddenGeo" icon="place"><q-tooltip>Geolokalizacja</q-tooltip></q-tab>
      <q-tab name="tab-b-6" slot="title" :hidden="tabHiddenCalendar" icon="date_range"><q-tooltip>Kalendarium</q-tooltip></q-tab>
      <q-tab name="tab-b-10" slot="title" :hidden="tabHiddenAbstract" icon="bookmark_border"><q-tooltip>Abstrakt</q-tooltip></q-tab>
      <q-tab name="tab-b-11" slot="title" :hidden="tabHiddenCategories" icon="list"><q-tooltip>Kategorie</q-tooltip></q-tab>
      <q-tab name="tab-b-14" slot="title" :hidden="tabHiddenTables" icon="view_list"><q-tooltip>Tabele</q-tooltip></q-tab>
      <q-tab name="tab-b-7" slot="title" :hidden="tabHiddenVersions" icon="done_all"><q-tooltip>Poprzednie wersje</q-tooltip></q-tab>
      <q-tab name="tab-b-8" slot="title" :hidden="tabHiddenAccess" icon="visibility"><q-tooltip>Historia dostępu</q-tooltip></q-tab>
      <q-tab name="tab-b-9" slot="title" :hidden="tabHiddenOptions" icon="widgets"><q-tooltip>Opcje</q-tooltip></q-tab>
      <q-tab name="tab-b-5" slot="title" :hidden="tabHiddenInfo" icon="info_outline"><q-tooltip>Informacje</q-tooltip></q-tab>
      <q-tab-pane
        v-for="(item,index) in tabs.items"
        :key="item.name"
        :name="item.name"
        ref="mypanes"
        keep-alive
        class="q-pa-none modal-iframe"
        >
        <card-i-frame :url="item.frameurl" :tabitem="item" :ownertab="tabitem.name" :index="index" class="q-pa-none">
        </card-i-frame>
      </q-tab-pane>
      <q-tab-pane name="tab-b-2" keep-alive class="q-pa-none modal-iframe">
        <card-attachments tabname="tab-b-2" :tabitem="this.tabitem" :dbitem="this.dbitem" class="q-pa-none"></card-attachments>
      </q-tab-pane>
      <q-tab-pane name="tab-b-3" keep-alive class="q-pa-none modal-iframe">
        <card-multimedia tabname="tab-b-3" :tabitem="this.tabitem" :dbitem="this.dbitem" class="q-pa-none"></card-multimedia>
      </q-tab-pane>
      <q-tab-pane name="tab-b-12" keep-alive class="q-pa-none modal-iframe">
        <cardHTTPAttachments tabname="tab-b-12" :tabitem="this.tabitem" :dbitem="this.dbitem" class="q-pa-none"></cardHTTPAttachments>
      </q-tab-pane>
      <q-tab-pane name="tab-b-4" keep-alive class="q-pa-none modal-iframe">
        <card-geo tabname="tab-b-4" :tabitem="this.tabitem" :dbitem="this.dbitem" :defaultlat="getDefaultLat" :defaultlon="getDefaultLon" class="q-pa-none"></card-geo>
      </q-tab-pane>
      <q-tab-pane name="tab-b-6" keep-alive class="q-pa-none modal-iframe">
        <card-calendar tabname="tab-b-6" :tabitem="this.tabitem" :dbitem="this.dbitem" class="q-pa-none"></card-calendar>
      </q-tab-pane>
      <q-tab-pane name="tab-b-10" keep-alive class="q-pa-none modal-iframe">
        <card-abstract tabname="tab-b-10" :tabitem="this.tabitem" :dbitem="this.dbitem" class="q-pa-none"></card-abstract>
      </q-tab-pane>
      <q-tab-pane name="tab-b-11" keep-alive class="q-pa-none modal-iframe">
        <card-categories tabname="tab-b-11" :tabitem="this.tabitem" :dbitem="this.dbitem" class="q-pa-none"></card-categories>
      </q-tab-pane>
      <q-tab-pane name="tab-b-14" keep-alive class="q-pa-none modal-iframe">
        <card-tables tabname="tab-b-14" :tabitem="this.tabitem" :dbitem="this.dbitem" class="q-pa-none"></card-tables>
      </q-tab-pane>
      <q-tab-pane name="tab-b-7" keep-alive class="q-pa-none modal-iframe">
        <card-version-history tabname="tab-b-7" :tabitem="this.tabitem" :dbitem="dbitem" class="q-pa-none"></card-version-history>
      </q-tab-pane>
      <q-tab-pane name="tab-b-8" keep-alive class="q-pa-none modal-iframe">
        <card-access-history tabname="tab-b-8" :tabitem="this.tabitem" :dbitem="dbitem" class="q-pa-none"></card-access-history>
      </q-tab-pane>
      <q-tab-pane name="tab-b-9" keep-alive class="q-pa-none modal-iframe">
        <card-options tabname="tab-b-9" :tabitem="this.tabitem" :dbitem="this.dbitem" class="q-pa-none"></card-options>
      </q-tab-pane>
      <q-tab-pane name="tab-b-5" keep-alive class="q-pa-none modal-iframe">
        <card-info tabname="tab-b-5" :mode="tabs.mode" :tabitem="this.tabitem" :dbitem="dbitem" :jobitem="jobitem" class="q-pa-none"></card-info>
      </q-tab-pane>
    </q-tabs>
    </keep-alive>
  </div>
</template>

<script type="text/javascript">
// import Vue from 'vue'
import { mapGetters } from 'vuex'
import cardAttachments from './cardAttachments.vue'
import cardHTTPAttachments from './cardHTTPAttachments.vue'
import cardInfo from './cardInfo.vue'
import cardOptions from './cardOptions.vue'
import cardMultimedia from './cardMultimedia.vue'
import cardGeo from './cardGeo.vue'
import cardCalendar from './cardCalendar.vue'
import cardAbstract from './cardAbstract.vue'
import cardCategories from './cardCategories.vue'
import cardTables from './cardTables.vue'
import cardAccessHistory from './cardAccessHistory.vue'
import cardVersionHistory from './cardVersionHistory.vue'
import cardFavorite from './cardFavorite.vue'
import cardSettings from './cardSettings.vue'
import cardIFrame from './cardIFrame.vue'
import helperActions from './helperActions.js'

export default {
  name: 'TabICORManager',
  props: {
    tabitem: {
      type: Object
    }
  },
  data () {
    return {
      dbitem: {
        oid: '',
        poid: '',
        chapterid: '',
        tid: '',
        cmsid: '',
        documentURL: '',
        filetype: '',
        thisPageAction: '',
        thisPageDescription: '',
        thisPageSubTitle: '',
        thisPageTitle: '',
        type: ''
      },
      jobitem: {
        jobtype: '',
        CID: -1,
        OID: -1,
        brCID: -1,
        brOID: -1,
        thisPageTitle: '',
        thisPageSubTitle: '',
        thisPageAction: '',
        thisPageDescription: '',
        actionLabel: ''
      },
      capabilities: {
        Abstrakty_Max_TextLength: 500,
        Geolokalizacja_Default_Lat: '53.25405559277634',
        Geolokalizacja_Default_Lon: '14.49160459625907',
        aAbstrakty: 0,
        aCategories: 0,
        aTables: 0,
        aGeolokalizacja: 0,
        aKalendarium: 0,
        aMultimedia: 0,
        aTableOID_Abstrakty: -1,
        aTableOID_Categories: -1,
        aTableOID_CategoriesAssigned: -1,
        aTableOID_TablesAssigned: -1,
        aTableOID_Geolokalizacja: -1,
        aTableOID_Kalendarium: -1,
        aTableOID_Multimedia: -1,
        aTableOIDs_Allowed_Abstrakty: [],
        aTableOIDs_Allowed_Categories: [],
        aTableOIDs_Allowed_Tables: [],
        aTableOIDs_Allowed_Geolokalizacja: [],
        aTableOIDs_Allowed_Kalendarium: [],
        aTableOIDs_Allowed_Multimedia: []
      },

      fromStart: true,

      tabHiddenAttachments: true,
      tabHiddenMultimedia: true,
      tabHiddenHTTPAttachments: true,
      tabHiddenGeo: true,
      tabHiddenCalendar: true,
      tabHiddenAbstract: true,
      tabHiddenCategories: true,
      tabHiddenTables: true,
      tabHiddenInfo: false,
      tabHiddenOptions: true,
      tabHiddenVersions: true,
      tabHiddenAccess: true,

      tabs: {
        mode: '',
        selected: '',
        cnt: 0,
        items: []
      }
    }
  },
  components: {
    cardAttachments,
    cardHTTPAttachments,
    cardInfo,
    cardOptions,
    cardMultimedia,
    cardGeo,
    cardCalendar,
    cardAbstract,
    cardCategories,
    cardTables,
    cardAccessHistory,
    cardVersionHistory,
    cardSettings,
    cardFavorite,
    cardIFrame
  },
  mounted () {
    this.$root.$on('tab-setURL', this.onSetURL)
    this.$root.$on('tab-setDBDataViewStart', this.setDBDataViewStart)
    this.$root.$on('tab-setJobTypeStart', this.setJobTypeStart)
  },
  beforeDestroy () {
    this.$root.$off('tab-setURL', this.onSetURL)
    this.$root.$off('tab-setDBDataViewStart', this.setDBDataViewStart)
    this.$root.$off('tab-setJobTypeStart', this.setJobTypeStart)
  },
  computed: {
    ...mapGetters(['getICORURL', 'getAppMode_ICOR', 'getUser_UserName']),
    getDefaultLat () {
      let v = parseFloat(this.capabilities.Geolokalizacja_Default_Lat)
      if (isNaN(v)) {
        v = 0.0
      }
      return v
    },
    getDefaultLon () {
      let v = parseFloat(this.capabilities.Geolokalizacja_Default_Lon)
      if (isNaN(v)) {
        v = 0.0
      }
      return v
    }
  },
  methods: {
    addNewTab (url = '', alabel = '', asublabel = '', aselect = true) {
      // console.log(`addNewTab: ${url} - ${alabel} - ${asublabel} - ${aselect}`)
      if (url === '') {
        url = 'startpage20q.asp'
      }
      if (alabel === '') {
        alabel = ''
      }
      if ((url.search('http:') !== 0) && (url.search('https:') !== 0)) {
        url = `${this.getICORURL}/icormanager/${url}`
      }
      url = this.$icor.data.urlRemoveRandomQuery(url)
      let aframeurl = this.$icor.data.urlSetRandomQuery(url)
      let ti = this.tabs.cnt
      this.tabs.cnt += 1
      let dt = {
        id: ti,
        name: 'sheet_' + ti,
        label: alabel,
        sublabel: asublabel,
        url: url,
        frameurl: aframeurl,
        hidden: false
      }
      this.tabs.items.push(dt)
      // console.log('addnewtab 0')
      // console.log(dt)
      this.$nextTick(() => {
        // console.log('add new tab - tick: ' + dt.name)
        if (aselect) {
          // console.log('add new tab - selected: ' + dt.name)
          this.tabs.selected = dt.name
        }
        window.dispatchEvent(new Event('resize'))
      })
      // console.log('addnewtab 1')
      return dt
    },
    getTabByName (tabname) {
      for (var i = 0; i < this.tabs.items.length; i++) {
        if (this.tabs.items[i].name === tabname) {
          return [i, this.tabs.items[i]]
        }
      }
      return null
    },
    onSetURL (event) {
      if (event.tab.id !== this.tabitem.id) {
        return
      }
      let url = this.$icor.data.urlRemoveRandomQuery(event.url)
      this.$root.$emit('set-manager-tab-info', {
        tab: event.tab,
        url: url
      })
      // console.log(`tab setURL id ${event.tab.id} to ${this.tabitem.url}`)
      // this.clearTabsData('', true)
      this.clearTabsData()
      this.$nextTick(() => {
        this.addNewTab(url, '', '', true)
      })
    },
    setDBItemData (event, seturl = true, setdata = true, setlabel = true) {
      this.tabs.mode = 'db'
      if (seturl) {
        let documenturl = this.$icor.data.urlRemoveRandomQuery(event.data.documentURL)
        this.$root.$emit('set-manager-tab-info', {
          tab: event.tab,
          url: documenturl
        })
      }
      if (setdata) {
        this.$set(this.dbitem, 'oid', event.data.ioid)
        this.$set(this.dbitem, 'poid', event.data.poid)
        this.$set(this.dbitem, 'chapterid', event.data.chapterid)
        this.$set(this.dbitem, 'tid', event.data.tid)
        this.$set(this.dbitem, 'cmsid', event.data.cmsid)
        this.$set(this.dbitem, 'documentURL', event.data.documentURL)
        this.$set(this.dbitem, 'filetype', event.data.filetype)
        this.$set(this.dbitem, 'thisPageAction', event.data.thisPageAction)
        this.$set(this.dbitem, 'thisPageDescription', event.data.thisPageDescription)
        this.$set(this.dbitem, 'thisPageSubTitle', event.data.thisPageSubTitle)
        this.$set(this.dbitem, 'thisPageTitle', event.data.thisPageTitle)
        this.$set(this.dbitem, 'type', event.data.type)
      }
      if (setlabel) {
        let label = ''
        if (event.data.thisPageTitle !== '') {
          label = event.data.thisPageTitle
        }
        let sublabel = ''
        if (event.data.thisPageSubTitle !== '') {
          sublabel = event.data.thisPageSubTitle
        }
        if (event.data.filetype !== '') {
          if (sublabel !== '') {
            sublabel += ' - '
          }
          sublabel += event.data.filetype
        }
        if (event.data.chapterid !== '') {
          if (sublabel !== '') {
            sublabel += ' / '
          }
          sublabel += event.data.chapterid
        }
        if (event.data.ioid !== '') {
          if (sublabel !== '') {
            sublabel += ' / '
          }
          sublabel += event.data.ioid
        }
        this.$root.$emit('set-manager-tab-info', {
          tab: event.tab,
          label: label,
          sublabel: sublabel,
          actionlabel: this.dbitem.thisPageAction
        })
      }
    },
    setDBDataViewStart (event) {
      var ltab, i
      if (event.tab.id !== this.tabitem.id) {
        return
      }
      // console.log(`set DBDataViewStart: ${this.tabitem.id} - ${event.data.ioid}`)
      // console.log(event)
      if (event.data.filetype === 'so') {
        this.clearTabsData()
        this.$nextTick(async () => {
          this.setDBItemData(event, true, true, true)
          for (i = 0; i < event.data.tabs.length; i++) {
            ltab = event.data.tabs[i]
            this.addNewTab(ltab[1], ltab[0], '', i === 0)
          }
          let capabilities = await this.$icor.main.tablesGetCapabilities(this.dbitem)
          this.capabilities = capabilities
          this.hideTabs(false, capabilities)
        })
        return
      }
      if (event.data.filetype === 'sot') {
        this.setDBItemData(event, false, false, true)
        return
      }
      if (event.data.filetype !== '') {
        this.clearTabsData(event.data.ownerSheet)
        this.$nextTick(() => {
          this.setDBItemData(event, true, true, true)
        })
      }
    },
    setJobItemData (event, seturl = true, setdata = true, setlabel = true) {
      this.tabs.mode = 'job'
      if (seturl) {
        let documenturl = this.$icor.data.urlRemoveRandomQuery(event.data.documentURL)
        this.$root.$emit('set-manager-tab-info', {
          tab: event.tab,
          url: documenturl
        })
      }
      if (setdata) {
        this.$set(this.jobitem, 'jobtype', event.data.jobtype)
        this.$set(this.jobitem, 'CID', event.data.CID)
        this.$set(this.jobitem, 'OID', event.data.OID)
        this.$set(this.jobitem, 'brCID', event.data.brCID)
        this.$set(this.jobitem, 'brOID', event.data.brOID)
        this.$set(this.jobitem, 'thisPageTitle', event.data.thisPageTitle)
        this.$set(this.jobitem, 'thisPageSubTitle', event.data.thisPageSubTitle)
        this.$set(this.jobitem, 'thisPageAction', event.data.thisPageAction)
        this.$set(this.jobitem, 'thisPageDescription', event.data.thisPageDescription)
        let actionlabel = helperActions.getActionLabelByJob(event.data.thisPageAction, event.data.jobtype)
        this.$set(this.jobitem, 'actionLabel', actionlabel)
      }
      if (setlabel) {
        this.$set(this.jobitem, 'thisPageTitle', event.data.thisPageTitle)
        this.$set(this.jobitem, 'thisPageSubTitle', event.data.thisPageSubTitle)
        let label = ''
        if (event.data.thisPageTitle !== '') {
          label = event.data.thisPageTitle
        }
        let sublabel = ''
        if (event.data.thisPageSubTitle !== '') {
          sublabel = event.data.thisPageSubTitle
        }
        if (event.data.OID >= 0) {
          sublabel += ' [' + event.data.OID + ']'
        }
        this.$root.$emit('set-manager-tab-info', {
          tab: event.tab,
          label: label,
          sublabel: sublabel,
          actionlabel: this.jobitem.actionLabel
        })
      }
    },
    setJobTypeStart (event) {
      var ltab, i
      if (event.tab.id !== this.tabitem.id) {
        return
      }
      // console.log(`set JobTypeStart: ${this.tabitem.id} - jobtype: ${event.data.jobtype}`)
      // console.log(event)
      if (event.data.jobtype === 'objectedit') {
        this.clearTabsData()
        this.$nextTick(() => {
          this.setJobItemData(event, true, true, true)
          for (i = 0; i < event.data.tabs.length; i++) {
            ltab = event.data.tabs[i]
            this.addNewTab(ltab[1], ltab[0], '', i === 0)
          }
        })
        return
      }
      if (event.data.jobtype === 'sheetget') {
        this.setJobItemData(event, false, false, true)
        return
      }
      if (event.data.jobtype !== '') {
        this.clearTabsData(event.data.ownerSheet)
        this.$nextTick(() => {
          this.setJobItemData(event, true, true, true)
        })
        return
      }
      if (this.fromStart) {
        // return
      }
    },
    hideTabs (ahide = true, capabilities = null) {
      this.tabHiddenAttachments = ahide
      this.tabHiddenHTTPAttachments = ahide
      // this.tabHiddenInfo = ahide
      this.tabHiddenOptions = ahide
      this.tabHiddenVersions = ahide
      this.tabHiddenAccess = ahide
      if (ahide) {
        this.tabHiddenMultimedia = ahide
        this.tabHiddenGeo = ahide
        this.tabHiddenCalendar = ahide
        this.tabHiddenAbstract = ahide
        this.tabHiddenCategories = ahide
        this.tabHiddenTables = ahide
      } else {
        if (capabilities !== null) {
          this.tabHiddenMultimedia = !(capabilities.aMultimedia === 1)
          this.tabHiddenGeo = !(capabilities.aGeolokalizacja === 1)
          this.tabHiddenCalendar = !(capabilities.aKalendarium === 1)
          this.tabHiddenAbstract = !(capabilities.aAbstrakty === 1)
          this.tabHiddenCategories = !(capabilities.aCategories === 1)
          this.tabHiddenTables = !(capabilities.aTables === 1)
        }
      }
    },
    clearTabsData (askiptab = '', aclear = false) {
      // console.log('clearTabsData 0 ' + askiptab)
      // this.tabs.selected = 'tab-b-1'
      var i
      this.hideTabs(true)

      if (askiptab === '') {
        if (aclear) {
          // this.tabs.items = []
          this.$set(this.tabs, 'items', [])
        } else {
          for (i = this.tabs.items.length - 1; i >= 0; i--) {
            // this.$delete(this.tabs.items, i)
            this.tabs.items[i].hidden = true
          }
        }
      } else {
        for (i = this.tabs.items.length - 1; i >= 0; i--) {
          if (this.tabs.items[i].name !== askiptab) {
            this.tabs.items[i].hidden = true
          } else {
            this.tabs.items[i].label = ''
            this.tabs.items[i].sublabel = ''
            this.tabs.items[i].url = ''
            this.tabs.items[i].frameurl = ''
          }
        }
        this.tabs.selected = askiptab
      }
      this.capabilities = {}
      this.tabs.mode = ''
      this.$set(this.dbitem, 'oid', '')
      this.$set(this.dbitem, 'poid', '')
      this.$set(this.dbitem, 'chapterid', '')
      this.$set(this.dbitem, 'tid', '')
      this.$set(this.dbitem, 'cmsid', '')
      this.$set(this.dbitem, 'documentURL', '')
      this.$set(this.dbitem, 'filetype', '')
      this.$set(this.dbitem, 'thisPageAction', '')
      this.$set(this.dbitem, 'thisPageDescription', '')
      this.$set(this.dbitem, 'thisPageSubTitle', '')
      this.$set(this.dbitem, 'thisPageTitle', '')
      this.$set(this.dbitem, 'type', '')
      this.$set(this.jobitem, 'jobtype', '')
      this.$set(this.jobitem, 'CID', -1)
      this.$set(this.jobitem, 'OID', -1)
      this.$set(this.jobitem, 'brCID', -1)
      this.$set(this.jobitem, 'brOID', -1)
      this.$set(this.jobitem, 'thisPageTitle', '')
      this.$set(this.jobitem, 'thisPageSubTitle', '')
      this.$set(this.jobitem, 'thisPageAction', '')
      this.$set(this.jobitem, 'thisPageDescription', '')
      this.$set(this.jobitem, 'actionLabel', '')
    },

    tabsChange (tabname) {
      // console.log('tabsChange: ' + tabname)
      this.$nextTick(() => {
        this.$root.$emit('change-ICOR-tabs', {
          tabitem: this.tabitem,
          tabname: tabname
        })
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

.modal-iframe {
  width: 100%;
  height: calc(100vh - 148px);
  overflow: auto;
}

.q-tab {
  text-transform: none !important;
  font-size: 0.70rem !important;
}
.q-tabs-head {
  font-size: 0.70rem !important;
}
</style>
