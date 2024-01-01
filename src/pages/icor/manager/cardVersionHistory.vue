<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title>
        Historia wersji
        <span slot="subtitle">
          lista zmian rekordu
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
  name: 'CardVersionHistory',
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
      this.dataItems = await this.$icor.main.tablesDataVersionHistoryLoad(this.dbitem)
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
      dataItems: [],
      dataLoaded: false,
      pagination: {
        sortBy: '', // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      columns: [
        {
          label: 'Data i czas',
          field: '_datetime',
          name: '_datetime',
          align: 'left',
          sortable: true
        },
        {
          label: 'Akcja',
          field: 'Akcja',
          name: 'Akcja',
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
          label: 'Podmiot udostępniający',
          field: 'InformacjaPodmiotUdostepniajacy',
          name: 'InformacjaPodmiotUdostepniajacy',
          align: 'left',
          sortable: true
        },
        {
          label: 'Osoba odpowiedzialna',
          field: 'InformacjaOsobaOdpowiedzialna',
          name: 'InformacjaOsobaOdpowiedzialna',
          align: 'left',
          sortable: true
        },
        {
          label: 'Data wytworzenia',
          field: 'InformacjaDataWytworzenia',
          name: 'InformacjaDataWytworzenia',
          align: 'left',
          sortable: true
        },
        {
          label: 'Opis czynności',
          field: 'InformacjaOpisCzynnosci',
          name: 'InformacjaOpisCzynnosci',
          align: 'left',
          sortable: true
        }
      ],
      columns2: [
        {
          label: '...',
          field: '_URL',
          width: '100px'
        },
        {
          label: 'Akcja',
          field: 'Akcja',
          format (value) {
            if (value === 'Zaktualizowano wpis') {
              return '<i class="text-positive">done</i>'
            }
            if (value === 'Dodano wpis') {
              return '<i class="text-info">note_add</i>'
            }
            if (value === 'Skasowano wpis') {
              return '<i class="text-negative">delete_forever</i>'
            }
            if (value === 'Inna akcja') {
              return '<i class="text-warning">done_all</i>'
            }
            return value
          },
          width: '60px'
        }
      ]
    }
  }

}
</script>

<style scoped>
</style>
