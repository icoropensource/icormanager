<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title>
        Historia dostępu do rekordu
        <span slot="subtitle">
          lista użytkowników i daty
        </span>
      </q-toolbar-title>
    </q-toolbar>
    <q-table
      title=""
      :data="dataItems"
      :columns="columns"
      row-key="_OID"
      :pagination.sync="pagination"
      :rows-per-page-options="[5,10,20,50,100,0]"
      dense
      separator="cell"
      no-data-label="brak danych"
      no-results-label="brak wyników"
      loading-label="ładuję dane..."
      rows-per-page-label="rekordów na stronę"
      :selected-rows-label="(rowsNumber)=>`zaznaczono ${rowsNumber} pozycji`"
      :pagination-label="(start,end,total)=>`${start}-${end} z ${total}`"
    >
    </q-table>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'CardAccessHistory',
  props: {
    tabname: {
      type: String
    },
    tabitem: {
      type: Object
    },
    dbitem: {
      type: Object
    }
  },
  created () {
    this.$root.$on('change-ICOR-tabs', this.changeICORTabs)
  },
  beforeDestroy () {
    this.$root.$off('change-ICOR-tabs', this.changeICORTabs)
  },
  methods: {
    async dataLoad () {
      this.dataLoaded = true
      this.dataItems = await this.$icor.main.tablesDataAccessHistoryLoad(this.dbitem)
    },
    changeICORTabs (event) {
      if (event.tabitem.id !== this.tabitem.id) {
        return
      }
      if (event.tabname === this.tabname) {
        if (this.dataLoaded) {
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
        this.dataItems = []
        this.dataLoaded = false
      },
      deep: true
    }
  },
  data () {
    return {
      dataLoaded: false,
      dataItems: [],
      pagination: {
        sortBy: '', // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      columns: [
        {
          label: 'Data i czas',
          field: '_DateTime',
          name: '_DateTime',
          align: 'left',
          sortable: true
        },
        {
          label: 'Użytkownik',
          field: '_UserName',
          name: '_UserName',
          align: 'left',
          sortable: true
        },
        {
          label: 'Adres IP',
          field: 'RemoteAddr',
          name: 'RemoteAddr',
          align: 'left',
          sortable: true
        },
        {
          label: 'Przeglądarka',
          field: 'HttpUserAgent',
          name: 'HttpUserAgent',
          align: 'left',
          sortable: true
        }
      ]
    }
  }

}
</script>

<style scoped>
</style>
