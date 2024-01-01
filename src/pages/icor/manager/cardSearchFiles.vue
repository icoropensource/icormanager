<template>
  <div>
      <div class="row">
        <div class="col-4" v-show="showFilters">
          <q-scroll-area style="width: 100%; height: calc(100vh - 106px);">
            <card-search-filter-files @fetch="fetchData" ref="cardSearchFilterFiles" @changeproject="changeProject" @changepath="changePath"></card-search-filter-files>
          </q-scroll-area>
        </div>
        <div class="col">
          <q-scroll-area style="width: 100%; height: calc(100vh - 106px);">
            <q-breadcrumbs>
              <q-breadcrumbs-el icon="home" color="secondary" @click.native="breadcrumbClick({path:''})" class="cursor-pointer" />
              <q-breadcrumbs-el v-for="item in bradcrumbPath" :key="item.path" :label="item.folder" color="secondary" @click.native="breadcrumbClick(item)" class="cursor-pointer" />
            </q-breadcrumbs>
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
                <q-btn-group class="q-ml-md" rounded>
                  <q-btn rounded color="primary" icon="attach_file" label="wybierz" v-if="asdialog" @click="onAttach" />
                  <q-btn rounded color="primary" icon="upload_file" label="wgraj"  @click="onUpload" />
                  <q-btn rounded color="primary" icon="create_new_folder" label="dodaj folder"  @click="onNewFolder" />
                  <q-btn rounded color="info" icon="close" label="zamknij" v-if="asdialog"  @click="onClose" />
                </q-btn-group>
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
import cardSearchFilterFiles from './CardSearchFilterFiles'

export default {
  name: 'CardSearchFiles',
  props: {
    tabitem: {
      type: Object,
      default () {
        return {}
      }
    },
    asdialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    cardSearchFilterFiles
  },
  data () {
    return {
      showFilters: true,
      searchResult: {},
      tableTitle: '',
      tableSearchMode: 'table',
      searchColumns: {
        httpfiles: [
          {name: '_cid', field: '_cid', label: '', required: false, align: 'left', sortable: false},
          {name: '_oid', field: 'OID', label: 'oid', required: false, align: 'right', sortable: true},
          {name: 'FileName', field: 'FileName', label: 'Nazwa', required: false, align: 'left', sortable: true},
          {name: 'Description', field: 'Description', label: 'Opis', required: false, align: 'left', sortable: true},
          {name: 'InformacjaPodmiotUdostepniajacy', field: 'InformacjaPodmiotUdostepniajacy', label: 'Informacja Podmiot Udostepniający', required: false, align: 'left', sortable: true},
          {name: 'InformacjaOsobaOdpowiedzialna', field: 'InformacjaOsobaOdpowiedzialna', label: 'Informacja Osoba Odpowiedzialna', required: false, align: 'left', sortable: true},
          {name: 'InformacjaOpisCzynnosci', field: 'InformacjaOpisCzynnosci', label: 'Informacja Opis Czynności', required: false, align: 'left', sortable: true},
          {name: 'InformacjaDataWytworzenia', field: 'InformacjaDataWytworzenia', label: 'Informacja Data Wytworzenia', required: false, align: 'left', sortable: true},
          {name: 'Category', field: 'Category', label: 'Kategoria', required: false, align: 'left', sortable: true},
          {name: 'Kind', field: 'Kind', label: 'Rodzaj', required: false, align: 'left', sortable: true},
          {name: 'ItemKey', field: 'ItemKey', label: 'Klucz', required: false, align: 'left', sortable: true},
          {name: 'Rel', field: 'Rel', label: 'ItemRel', required: false, align: 'left', sortable: true},
          {name: 'ItemTitle', field: 'ItemTitle', label: 'Tytuł', required: false, align: 'left', sortable: true},
          {name: 'ItemType', field: 'ItemType', label: 'Typ', required: false, align: 'left', sortable: true},
          {name: 'ItemStatus', field: 'ItemStatus', label: 'Status', required: false, align: 'left', sortable: true}
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
      currentFolder: '',
      bradcrumbPath: []
    }
  },
  computed: {
    ...mapGetters([]),
    getColumns () {
      return this.searchColumns['httpfiles']
    }
  },
  mounted () {
    this.setBreadcrumb('')
    if (this.tabitem && this.tabitem.tabdata && this.tabitem.tabdata.filesSearchInit) {
      this.tabitem.tabdata.filesSearchInit = false
      this.showFilters = false
      this.$nextTick(function () {
        this.$refs.cardSearchFilterFiles.initSearch(this.tabitem.tabdata.searchFilesData)
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
        // let nurl = this.getICORURL + '/icormanager/icormain.asp?jobtype=objectedit&CID=' + value._cid + '&OID=' + value._oid
        // this.$root.$emit('change-ICOR-URL', {url: nurl})
      })
    },
    breadcrumbClick (item) {
      console.log('breadcrumbClick', item)
    },
    setBreadcrumb (path) {
      this.currentFolder = path
      let s = path
      if (s === '/') {
        s = ''
      }
      let cpath = ''
      let res = []
      for (let folder of s.split('/')) {
        cpath = cpath + '/' + folder
        let d = {
          folder: folder,
          path: cpath
        }
        res.push(d)
      }
      console.log('setBreadcrumb:', path, res)
      this.bradcrumbPath = res
    },
    changeProject (data) {
      console.log(data)
    },
    changePath (data) {
      this.setBreadcrumb(data.value)
      console.log('changePath:', data)
    },
    async fetchData (searchData) {
      this.dataItemsByOID = {}
      this.items = []
      this.tableSearchMode = searchData.searchMode
      this.setBreadcrumb(searchData.Path)
      this.searchResult = await this.$icor.main.searchFiles(searchData)
      if (this.searchResult.data.cnt > 0) {
        this.items = this.searchResult.data.items
      }
    },
    onAttach () {
      this.$emit('submit', {})
    },
    onUpload () {
    },
    onNewFolder () {
    },
    onClose () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
</style>
