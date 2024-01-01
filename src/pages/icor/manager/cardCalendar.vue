<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title>
        Kalendarium
        <span slot="subtitle">
          ustawienie zakresu dat i stanu wyświetlania
        </span>
      </q-toolbar-title>
    </q-toolbar>
      <i-q-field label="Tytuł" v-model="dataItem.nazwa"></i-q-field>
      <i-q-field-date label="Data rozpoczęcia" v-model="dataItem.dataRozpoczecia"></i-q-field-date>
      <i-q-field-date label="Data Zakończenia" v-model="dataItem.dataZakonczenia"></i-q-field-date>
      <i-q-field-date label="Wyświetlaj aktualności od" v-model="dataItem.wyswietlajAktualnosciOd"></i-q-field-date>
      <i-q-field-date label="Wyświetlaj aktualności do" v-model="dataItem.wyswietlajAktualnosciDo"></i-q-field-date>
      <i-q-field-editor label="Opis" v-model="dataItem.opis"></i-q-field-editor>
      <i-q-field-text-area label="Uwagi" v-model="dataItem.uwagi"></i-q-field-text-area>
      <i-q-field-select label="Priorytet wyświetlania" v-model="dataItem.priorytetWyswietlania" :options="optionsPriorytetWyswietlania"></i-q-field-select>
      <i-q-field-select label="Priorytet aktualności" v-model="dataItem.priorytetAktualnosci" :options="optionsPriorytetAktualnosci"></i-q-field-select>
      <i-q-field-select label="Status zatwierdzenia" v-model="dataItem.statusZatwierdzenia" :options="optionsStatusZatwierdzenia"></i-q-field-select>
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
  name: 'CardCalendar',
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
        nazwa: '',
        dataRozpoczecia: '',
        dataZakonczenia: '',
        wyswietlajAktualnosciOd: '',
        wyswietlajAktualnosciDo: '',
        opis: '',
        uwagi: '',
        priorytetWyswietlania: '',
        priorytetAktualnosci: '',
        statusZatwierdzenia: ''
      },
      optionsPriorytetWyswietlania: [
        {value: 'N1', label: 'Normalny - poziom 1'},
        {value: 'N0', label: 'Normalny - poziom 0'},
        {value: 'N2', label: 'Normalny - poziom 2'},
        {value: 'A0', label: 'Przypięty - poziom 0'},
        {value: 'A1', label: 'Przypięty - poziom 1'},
        {value: 'A2', label: 'Przypięty - poziom 2'}
      ],
      optionsPriorytetAktualnosci: [
        {value: '03', label: 'Normalny'},
        {value: '01', label: 'Niski'},
        {value: '05', label: 'Wysoki'},
        {value: '00', label: 'Ignorowany'}
      ],
      optionsStatusZatwierdzenia: [
        {value: 'T1', label: 'W trakcie pracy'},
        {value: 'S1', label: 'Do sprawdzenia'},
        {value: 'P1', label: 'Do poprawki'},
        {value: 'X1', label: 'Odrzucony'},
        {value: 'Z1', label: 'Zatwierdzony do publikacji'}
      ],
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
      this.dataItem = await this.$icor.main.kalendariumLoad(this.dbitem)
    },
    async dataSave () {
      let response = await this.$icor.main.kalendariumSave(this.dbitem, this.dataItem)
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania danych kalendarium: ' + response.data.errors[0].title})
        return
      }
      if (response.data.status !== 'OK') {
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: ' ' + response.data.status})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Dane kalendarium zostały zapamiętane.'})
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
