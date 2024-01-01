<template>
  <div>
    <keep-alive>
      <div v-if="status>0">
        <h3>{{info}}</h3>
      </div>
      <q-tabs swipeable two-lines inverted no-pane-border v-model="tabselected" align="left" v-if="sheetids">
        <q-tab v-for="(sheetid,index) in sheetids" :key="sheetid" slot="title" no-caps :name="sheets[sheetid].name" :label="sheets[sheetid].name" :default="index===0" v-if="sheets[sheetid].wwwdisabled!==1">
        </q-tab>
        <q-tab name="tab-b-5" slot="title" icon="info_outline"><q-tooltip>Informacje</q-tooltip></q-tab>
        <q-tab-pane v-for="(sheetid) in sheetids" :key="sheetid" :name="sheets[sheetid].name" ref="mypanes" keep-alive class="q-pa-none modal-iframe" v-if="sheets[sheetid].wwwdisabled!==1">
          <icorObjectEditSheet :sheetid="sheetid" :tabitem="tabitem" :sheet="sheets[sheetid]" :menus="menus" :wwwdescription="wwwdescription" :imgsrc="imgsrc">
          </icorObjectEditSheet>
        </q-tab-pane>
        <q-tab-pane name="tab-b-5" keep-alive class="q-pa-none modal-iframe">
          <card-info tabname="tab-b-5" mode="job" :tabitem="this.tabitem" :jobitem="this.tabitem.tabdata" class="q-pa-none"></card-info>
        </q-tab-pane>
      </q-tabs>
    </keep-alive>
  </div>
</template>

<script type="text/javascript">
import helperActions from './helperActions.js'
import icorObjectEditSheet from './icorObjectEditSheet.vue'
import cardInfo from './cardInfo.vue'

export default {
  name: 'ICORObjectEdit',
  props: {
    tabitem: {
      type: Object
    }
  },
  components: {
    icorObjectEditSheet,
    cardInfo
  },
  data () {
    return {
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
      tabselected: '',
      sheets: {},
      sheetids: [],
      fields: {},
      menus: [],
      status: 0,
      info: '',
      wwwdescription: '',
      imgsrc: ''
    }
  },
  mounted () {
    this.$root.$on('tab-refresh', this.onTabRefresh)
    this.fetchData()
  },
  beforeDestroy () {
    this.$root.$off('tab-refresh', this.onTabRefresh)
  },
  methods: {
    initVars () {
      this.tabselected = ''
      this.fields = {}
      this.menus = []
      this.sheets = {}
      this.sheetids = []
      this.wwwdescription = ''
      this.imgsrc = ''
    },
    async onTabRefresh (event) {
      console.log(event)
      if (event.tab.id !== this.tabitem.id) {
        return
      }
      console.log('refresh..')
      await this.fetchData()
    },
    async fetchData () {
      // debugger
      this.initVars()
      let ret = await this.$icor.main.ideObjectEdit(this.tabitem.tabdata.jobtype, this.tabitem.tabdata.CID, this.tabitem.tabdata.OID, this.tabitem.tabdata.brCID, this.tabitem.tabdata.brOID)
      // console.log('ideObjectEdit:', ret)
      // console.log('ideObjectEdit tabitem:', this.tabitem)
      this.status = ret.status
      this.info = ret.info
      // helperActions
      if (ret.status === 0) {
        this.sheets = ret.data.sheets
        this.sheetids = ret.data.sheetids
        this.menus = ret.data.menus
        this.wwwdescription = ret.data.wwwdescription
        this.imgsrc = ret.data.imgsrc

        let sublabel = helperActions.getActionLabelByJob('', this.tabitem.tabdata.jobtype)
        if (this.tabitem.tabdata.OID >= 0) {
          sublabel += ' [' + this.tabitem.tabdata.OID + ']'
        }
        const event = {
          tab: this.tabitem,
          label: this.wwwdescription,
          sublabel: sublabel
        }
        // console.log('fetchData 1:', event)
        this.$root.$emit('set-manager-tab-info', event)
      }
    }
  }
}
</script>

<style scoped>
.q-tab {
  text-transform: none !important;
  font-size: 0.70rem !important;
}
.q-tabs-head {
  font-size: 0.70rem !important;
}

.modal-iframe {
  width: 100%;
  height: calc(100vh - 148px);
  overflow: auto;
}
</style>
