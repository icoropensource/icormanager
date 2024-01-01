<template>
  <div>
      <div class="row">
        <div class="col-4" v-show="showFilters">
          <q-scroll-area style="width: 100%; height: calc(100vh - 106px);">
            <card-search-filter @fetch="fetchData" ref="cardSearchFilter"></card-search-filter>
          </q-scroll-area>
        </div>
        <div class="col">
          <q-scroll-area style="width: 100%; height: calc(100vh - 106px);">
            <q-table
              :title="tableTitle"
              :data="items"
              :columns="getColumns"
              row-key="_oid"
              :pagination.sync="pagination"
              :rows-per-page-options="rowsPerPage"
              separator="horizontal"
              :filter="tableFilter"
              dense
            >
              <template slot="top-left" slot-scope="props">
                <q-toggle v-model="showFilters" icon="input" />
              </template>
              <template slot="top-right" slot-scope="props">
                <q-search hide-underline class="col-6" color="secondary" placeholder="filtruj.." v-model="tableFilter" />
              </template>
              <q-td slot="body-cell-_cid" slot-scope="props" :props="props">
                <q-btn round dense icon="edit" color="primary" size="sm" @click="objectClick(props.row)">
                  <q-tooltip v-if="!$q.platform.is.mobile">przejdź do obiektu</q-tooltip>
                </q-btn>
              </q-td>
              <q-td slot="body-cell-_oid" slot-scope="props" :props="props">
                {{props.value}}
              </q-td>
            </q-table>
          </q-scroll-area>
        </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'
import cardSearchFilter from './CardSearchFilter'

export default {
  name: 'CardSearch',
  props: ['tabitem'],
  components: {
    cardSearchFilter
  },
  data () {
    return {
      showFilters: true,
      searchResult: {},
      tableTitle: '',
      tableSearchMode: 'table',
      searchColumns: {
        table: [
          {name: '_cid', field: '_cid', label: '', required: false, align: 'left', sortable: false},
          {name: '_oid', field: '_oid', label: 'oid', required: false, align: 'right', sortable: true},
          {name: 'tableName', field: 'tableName', label: 'nazwa', required: false, align: 'left', sortable: true},
          {name: 'tableGroup', field: 'tableGroup', label: 'grupa', required: false, align: 'left', sortable: true},
          {name: 'tableDescription', field: 'tableDescription', label: 'opis', required: false, align: 'left', sortable: true}
        ],
        xmldata: [
          {name: '_cid', field: '_cid', label: '', required: false, align: 'left', sortable: false},
          {name: '_oid', field: '_oid', label: 'oid', required: false, align: 'right', sortable: true},
          {name: 'xmlName', field: 'xmlName', label: 'nazwa', required: false, align: 'left', sortable: true},
          {name: 'xmlGroup', field: 'xmlGroup', label: 'grupa', required: false, align: 'left', sortable: true}
        ],
        chapter: [
          {name: '_cid', field: '_cid', label: '', required: false, align: 'left', sortable: false},
          {name: '_oid', field: '_oid', label: 'oid', required: false, align: 'right', sortable: true},
          {name: 'chapterName', field: 'chapterName', label: 'nazwa', required: false, align: 'left', sortable: true},
          {name: 'chapterNameMenu', field: 'chapterNameMenu', label: 'nagłówek w menu', required: false, align: 'left', sortable: true},
          {name: 'chapterDescription', field: 'chapterDescription', label: 'komentarz', required: false, align: 'left', sortable: true}
        ],
        event: [
          {name: '_cid', field: '_cid', label: '', required: false, align: 'left', sortable: false},
          {name: '_oid', field: '_oid', label: 'oid', required: false, align: 'right', sortable: true},
          {name: 'eventKind', field: 'eventKind', label: 'rodzaj', required: false, align: 'left', sortable: true},
          {name: 'eventKey', field: 'eventKey', label: 'klucz', required: false, align: 'left', sortable: true},
          {name: 'eventDescription', field: 'eventDescription', label: 'opis', required: false, align: 'left', sortable: true}
        ],
        html: [
          {name: '_cid', field: '_cid', label: '', required: false, align: 'left', sortable: false},
          {name: '_oid', field: '_oid', label: 'oid', required: false, align: 'right', sortable: true},
          {name: 'htmlName', field: 'htmlName', label: 'nazwa', required: false, align: 'left', sortable: true},
          {name: 'htmlDescription', field: 'htmlDescription', label: 'opis', required: false, align: 'left', sortable: true}
        ],
        sql: [
          {name: '_cid', field: '_cid', label: '', required: false, align: 'left', sortable: false},
          {name: '_oid', field: '_oid', label: 'oid', required: false, align: 'right', sortable: true},
          {name: 'sqlName', field: 'sqlName', label: 'nazwa', required: false, align: 'left', sortable: true},
          {name: 'sqlGroup', field: 'sqlGroup', label: 'grupa', required: false, align: 'left', sortable: true}
        ],
        template: [
          {name: '_cid', field: '_cid', label: '', required: false, align: 'left', sortable: false},
          {name: '_oid', field: '_oid', label: 'oid', required: false, align: 'right', sortable: true},
          {name: 'templateName', field: 'templateName', label: 'nazwa', required: false, align: 'left', sortable: true}
        ]
      },
      // pozostale dane
      items: [],
      tableFilter: '',
      pagination: {page: 1, rowsPerPage: 15, _sortBy: null, descending: false},
      rowsPerPage: [5, 10, 15, 25, 50, 100, 500],
      actions: [],
      actionsVisible: false,
      currentActions: [],
      currentRow: {},
      currentTitle: ''
    }
  },
  computed: {
    ...mapGetters([]),
    getColumns () {
      return this.searchColumns[this.tableSearchMode]
    }
  },
  mounted () {
    if (this.tabitem.tabdata.searchInit) {
      this.tabitem.tabdata.searchInit = false
      this.showFilters = false
      this.$nextTick(function () {
        this.$refs.cardSearchFilter.initSearch(this.tabitem.tabdata.searchData)
      })
    }
  },
  methods: {
    ...mapMutations([]),
    getDateAsStr (value) {
      return this.$icor.data.getDateAsStr(value)
    },
    getDateTimeAsStr (value) {
      return this.$icor.data.getDateTimeAsStr(value)
    },
    getNumAsMoney (value) {
      return this.$icor.data.getNumAsMoney(value)
    },
    toggleFilter () {
    },
    objectClick (value) {
      this.$nextTick(function () {
        // /icormanager/icormain.asp?jobtype=objectedit&CID=1747&OID=200000&brCID=-1&brOID=-1&__r=96642
        let nurl = this.getICORURL + '/icormanager/icormain.asp?jobtype=objectedit&CID=' + value._cid + '&OID=' + value._oid
        // console.log(nurl)
        this.$root.$emit('change-ICOR-URL', {url: nurl})
      })
    },
    async fetchData (searchData) {
      this.dataItemsByOID = {}
      this.items = []
      this.tableSearchMode = searchData.searchMode
      this.searchResult = await this.$icor.main.searchRepository(searchData)
      if (this.searchResult.data.cnt > 0) {
        this.items = this.searchResult.data.items
      }
    }
  }
}
</script>

<style scoped>
</style>
