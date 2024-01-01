<template>
  <div></div>
</template>

<script type="text/javascript">
import {
  Platform,
  // QDataTable,
  clone
} from 'quasar'

export default {
  name: 'baseTable',
  props: {
    title: {
      type: String
    },
    dbitem: {
      type: Object
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    table: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    // QDataTable
  },
  computed: {
    dataAvailable () {
      if (this.table && this.table.length) {
        return true
      }
      return false
    }
  },
  methods: {
    doChangeURL (cell) {
      this.$root.$emit('change-ICOR-URL', {
        url: cell.data
      })
    },
    changeMessage (props) {
      props.rows.forEach(row => {
        row.data.message = 'Quasar Framework rocks!'
      })
      this.$q.notify({type: 'info', position: 'bottom-right', message: 'Changed "Message" field for selected row(s).'})
    },
    deleteRow (props) {
      props.rows.forEach(row => {
        this.table.splice(row.index, 1)
      })
    },
    refresh (done) {
      this.timeout = setTimeout(() => {
        done()
      }, 5000)
    }
  },
  beforeDestroy () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },
  data () {
    return {
      config: {
        title: this.title,
        refresh: false,
        columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 0,
        bodyStyle: {
          maxHeight: Platform.is.mobile ? '50vh' : '500px'
        },
        noHeader: false,
        rowHeight: '50px',
        responsive: false,
        pagination: {
          rowsPerPage: 10,
          options: [5, 10, 15, 30, 50, 500]
        },
        columns: this.columns,
        selection: '',
        messages: {
          noData: '<i>warning</i> brak danych.',
          noDataAfterFiltering: '<i>warning</i> Brak wyników wyszukiwania.'
        },
        labels: {
          columns: 'kolumny',
          allCols: 'wszystkie kolumny',
          rows: 'wiersze',
          selected: {
            singular: 'pozycja wybrana.',
            plural: 'pozycje wybrane.'
          },
          clear: 'wyczyść',
          search: 'Szukaj',
          all: 'Wszystkie'
        }
      },
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'maxHeight',
      bodyHeight: 500
    }
  },
  watch: {
    pagination (value) {
      if (!value) {
        this.oldPagination = clone(this.config.pagination)
        this.config.pagination = false
        return
      }
      this.config.pagination = this.oldPagination
    },
    rowHeight (value) {
      this.config.rowHeight = value + 'px'
    },
    bodyHeight (value) {
      let style = {}
      if (this.bodyHeightProp !== 'auto') {
        style[this.bodyHeightProp] = value + 'px'
      }
      this.config.bodyStyle = style
    },
    bodyHeightProp (value) {
      let style = {}
      if (value !== 'auto') {
        style[value] = this.bodyHeight + 'px'
      }
      this.config.bodyStyle = style
    }
  }

}
</script>

<style>
.q-data-table table td, .q-data-table table th {
  white-space: pre-wrap !important;
}
</style>
