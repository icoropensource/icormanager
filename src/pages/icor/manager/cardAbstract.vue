<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title>
        Abstrakt
        <span slot="subtitle">
          tytuł i skrót/streszczenie treści
        </span>
      </q-toolbar-title>
    </q-toolbar>
      <i-q-field label="Tytuł" v-model="dataItem.tytul"></i-q-field>
      <i-q-field-text-area label="Treść" v-model="dataItem.tresc"></i-q-field-text-area>
      <br>
      <q-btn icon="save" color="primary" small @click="dataSave">&nbsp;Zapamiętaj</q-btn>
  </div>
</template>

<script type="text/javascript">
import IQField from 'components/fields/iqField'
import IQFieldDate from 'components/fields/iqFieldDate'
import IQFieldEditor from 'components/fields/iqFieldEditor'
import IQFieldTextArea from 'components/fields/iqFieldTextArea'
import IQFieldSelect from 'components/fields/iqFieldSelect'

export default {
  name: 'CardAbstract',
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
      dataItem: {
        tytul: '',
        tresc: ''
      },
      dataItems: null,
      dataItemsByOID: null
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
      this.dataItem = await this.$icor.main.abstraktLoad(this.dbitem)
    },
    async dataSave () {
      let response = await this.$icor.main.abstraktSave(this.dbitem, this.dataItem)
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania danych abstraktu: ' + response.data.errors[0].title})
        return
      }
      if (response.data.status !== 'OK') {
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: ' ' + response.data.status})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Dane abstraktu zostały zapamiętane.'})
      this.dataLoad()
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
        this.dataItem = {}
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
