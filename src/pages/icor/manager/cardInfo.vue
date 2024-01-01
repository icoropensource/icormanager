<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title>
        Informacje
        <span slot="subtitle">
          informacje uzupełniające, parametry i czynności
        </span>
      </q-toolbar-title>
    </q-toolbar>
    <q-list no-border>
      <q-list-header>Parametry strony:</q-list-header>
      <q-item>
        <!--
        <q-item-side icon="build" color="primary" />
        -->
        <q-item-main>
          <div class="q-table-container">
            <table class="q-table">
              <tbody>
                <tr><td class="paramname">tryb zakładki:</td><td class="paramvalue">{{mode}}</td></tr>
              </tbody>
            </table>
          </div>
       </q-item-main>
        <!--
        <q-item-side right :icon="mode===''?'code':'done'" color="primary" />
        -->
      </q-item>

      <q-item-separator v-if="showDBItem"/>
      <q-list-header v-if="showDBItem">Parametry DB:</q-list-header>
      <q-item v-if="showDBItem">
        <!--
        <q-item-side icon="assignment" color="primary" />
        -->
        <q-item-main>
          <div class="q-table-container">
            <table class="q-table">
              <tbody>
                <tr><td class="paramname">filetype:</td><td class="paramvalue">{{dbitem.filetype}}</td></tr>
                <tr><td class="paramname">type:</td><td class="paramvalue">{{dbitem.type}}</td></tr>
                <tr><td class="paramname">oid:</td><td class="paramvalue">{{dbitem.oid}}</td></tr>
                <tr><td class="paramname">tid:</td><td class="paramvalue">{{dbitem.tid}}</td></tr>
                <tr><td class="paramname">chapterid:</td><td class="paramvalue">{{dbitem.chapterid}}</td></tr>
                <tr><td class="paramname">cmsid:</td><td class="paramvalue">{{dbitem.cmsid}}</td></tr>
                <tr><td class="paramname">poid:</td><td class="paramvalue">{{dbitem.poid}}</td></tr>
                <tr><td class="paramname">thisPageAction:</td><td class="paramvalue">{{dbitem.thisPageAction}}</td></tr>
                <tr><td class="paramname">thisPageTitle:</td><td class="paramvalue" v-html="dbitem.thisPageTitle"></td></tr>
                <tr><td class="paramname">thisPageSubTitle:</td><td class="paramvalue" v-html="dbitem.thisPageSubTitle"></td></tr>
                <tr><td class="paramname">thisPageDescription:</td><td class="paramvalue" v-html="dbitem.thisPageDescription"></td></tr>
                <tr><td class="paramname">documentURL:</td><td class="paramvalue">{{dbitem.documentURL}}</td></tr>
              </tbody>
            </table>
          </div>
        </q-item-main>
      </q-item>

      <q-item-separator v-if="showJobItem"/>
      <q-list-header v-if="showJobItem">Parametry ICOR:</q-list-header>
      <q-item v-if="showJobItem">
        <!--
        <q-item-side icon="description" color="primary" />
        -->
        <q-item-main>
          <div class="q-table-container">
            <table class="q-table">
              <tbody>
                <tr><td class="paramname">jobtype:</td><td class="paramvalue">{{jobitem.jobtype}}</td></tr>
                <tr><td class="paramname">CID:</td><td class="paramvalue">{{jobitem.CID}}</td></tr>
                <tr><td class="paramname">OID:</td><td class="paramvalue">{{jobitem.OID}}</td></tr>
                <tr><td class="paramname">brCID:</td><td class="paramvalue">{{jobitem.brCID}}</td></tr>
                <tr><td class="paramname">brOID:</td><td class="paramvalue">{{jobitem.brOID}}</td></tr>
                <tr><td class="paramname">thisPageTitle:</td><td class="paramvalue" v-html="jobitem.thisPageTitle"></td></tr>
                <tr><td class="paramname">thisPageSubTitle:</td><td class="paramvalue" v-html="jobitem.thisPageSubTitle"></td></tr>
                <tr><td class="paramname">thisPageDescription:</td><td class="paramvalue" v-html="jobitem.thisPageDescription"></td></tr>
                <tr><td class="paramname">thisPageAction:</td><td class="paramvalue">{{jobitem.thisPageAction}}</td></tr>
                <tr><td class="paramname">actionLabel:</td><td class="paramvalue" v-html="jobitem.actionLabel"></td></tr>
              </tbody>
            </table>
          </div>
        </q-item-main>
      </q-item>

      <q-item-separator />
      <q-list-header>Parametry zakładki:</q-list-header>
      <q-item>
        <!--
        <q-item-side icon="more" color="primary" />
        -->
        <q-item-main>
          <div class="q-table-container">
            <table class="q-table">
              <tbody>
                <tr><td class="paramname">id:</td><td class="paramvalue">{{tabitem.id}}</td></tr>
                <tr><td class="paramname">name:</td><td class="paramvalue">{{tabitem.name}}</td></tr>
                <tr><td class="paramname">label:</td><td class="paramvalue" v-html="tabitem.label"></td></tr>
                <tr><td class="paramname">sublabel:</td><td class="paramvalue" v-html="tabitem.sublabel"></td></tr>
                <tr><td class="paramname">actionlabel:</td><td class="paramvalue" v-html="tabitem.actionlabel"></td></tr>
                <tr><td class="paramname">url:</td><td class="paramvalue">{{tabitem.url}}</td></tr>
                <tr><td class="paramname">jurl:</td><td class="paramvalue">{{tabitem.tabdata.url}}</td></tr>
                <tr><td class="paramname">jfromurl:</td><td class="paramvalue">{{tabitem.tabdata.fromurl}}</td></tr>
              </tbody>
            </table>
          </div>
        </q-item-main>
        <!--
        <q-item-side right :icon="tabitem.icon" color="primary" v-if="tabitem.icon"/>
        -->
      </q-item>

    </q-list>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'CardInfo',
  props: {
    mode: {
      type: String,
      default: ''
    },
    tabname: {
      type: String
    },
    tabitem: {
      type: Object
    },
    dbitem: {
      type: Object
    },
    jobitem: {
      type: Object
    }
  },
  data () {
    return {
      dataItems: null,
      dataItemsByOID: null
    }
  },
  created () {
    this.$root.$on('change-ICOR-tabs', this.changeICORTabs)
  },
  beforeDestroy () {
    this.$root.$off('change-ICOR-tabs', this.changeICORTabs)
  },
  computed: {
    showDBItem () {
      return (this.mode === 'db') || (this.mode === '')
    },
    showJobItem () {
      return (this.mode === 'job') || (this.mode === '')
    }
  },
  methods: {
    async dataLoad () {
      this.dataItems = []
      this.dataItemsByOID = {}
    },
    changeICORTabs (event) {
      if (event.tabitem.id !== this.tabitem.id) {
        return
      }
      if (event.tabname === this.tabname) {
        if (this.dataItems !== null) {
          return
        }
        if ((this.dbitem.oid === '') || (this.dbitem.tid === '') || (this.dbitem.poid === '')) {
          return
        }
        this.dataLoad()
      }
    }
  },
  watch: {
    'dbitem.oid': {
      handler: function (vnew, vold) {
        this.dataItems = null
        this.dataItemsByOID = null
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.q-table {
  width: 100%;
}

.q-table tbody td.paramname {
  text-align: right;
  font-weight: 600;
  width: 40%;
  white-space: normal;
  word-break: break-all;
}

.q-table tbody td.paramvalue {
  text-align: left;
  white-space: normal;
  word-break: break-all;
}
</style>
