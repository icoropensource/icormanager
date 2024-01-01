<template>
  <div>
      <q-toolbar inverted>
        <q-toolbar-title>
          Opcje i operacje
          <span slot="subtitle">
            dodatkowe opcje i pozostałe czynności
          </span>
        </q-toolbar-title>
      </q-toolbar>
  </div>
</template>

<script type="text/javascript">
import IQField from 'components/fields/iqField'
import IQFieldDate from 'components/fields/iqFieldDate'
import IQFieldEditor from 'components/fields/iqFieldEditor'
import IQFieldTextArea from 'components/fields/iqFieldTextArea'
import IQFieldSelect from 'components/fields/iqFieldSelect'

export default {
  name: 'CardOptions',
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
  data () {
    return {
    }
  },
  components: {
    IQField,
    IQFieldDate,
    IQFieldEditor,
    IQFieldTextArea,
    IQFieldSelect
  },
  created () {
    this.$root.$on('change-ICOR-tabs', this.changeICORTabs)
  },
  beforeDestroy () {
    this.$root.$off('change-ICOR-tabs', this.changeICORTabs)
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
</style>
