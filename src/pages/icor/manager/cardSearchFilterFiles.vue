<template>
  <div>
    <q-list separator class="q-pa-xs">
      <i-q-field-select label="Projekt" v-model="searchData.poid" :options="optionsProjects" :radio="false" @input="changeProject"></i-q-field-select>
      <i-q-field-select label="Katalog" v-model="searchData.Path" :options="optionsPath" :radio="false" @input="changePath"></i-q-field-select>
      <i-q-field label="Nazwa" v-model="searchData.FileName" iscopy ispaste></i-q-field>
      <i-q-field label="Opis" v-model="searchData.Description" iscopy ispaste></i-q-field>
      <i-q-field label="Informacja Podmiot Udostepniający" v-model="searchData.InformacjaPodmiotUdostepniajacy" iscopy ispaste></i-q-field>
      <i-q-field label="Informacja Osoba Odpowiedzialna" v-model="searchData.InformacjaOsobaOdpowiedzialna" iscopy ispaste></i-q-field>
      <i-q-field label="Informacja Opis Czynności" v-model="searchData.InformacjaOpisCzynnosci" iscopy ispaste></i-q-field>
      <i-q-field-date label="Informacja Data Wytworzenia OD" v-model="searchData.InformacjaDataWytworzeniaOD" :clearable="true" clearvalue=""></i-q-field-date>
      <i-q-field-date label="Informacja Data Wytworzenia DO" v-model="searchData.InformacjaDataWytworzeniaDO" :clearable="true" clearvalue=""></i-q-field-date>
      <i-q-field label="Kategoria" v-model="searchData.Category" iscopy ispaste></i-q-field>
      <i-q-field label="Rodzaj" v-model="searchData.Kind" iscopy ispaste></i-q-field>
      <i-q-field label="Klucz" v-model="searchData.ItemKey" iscopy ispaste></i-q-field>
      <i-q-field label="Rel" v-model="searchData.ItemRel" iscopy ispaste></i-q-field>
      <i-q-field label="Tytuł" v-model="searchData.ItemTitle" iscopy ispaste></i-q-field>
      <i-q-field label="Typ" v-model="searchData.ItemType" iscopy ispaste></i-q-field>
      <i-q-field label="Status" v-model="searchData.ItemStatus" iscopy ispaste></i-q-field>
      <i-q-field label="OID" v-model="searchData.OID" iscopy ispaste></i-q-field>
      <q-item-separator inset />
      <q-item>
        <q-item-main>
          <q-btn icon="search" color="primary" dense size="md" class="q-mr-sm" @click="doSearchItems" label="szukaj" />
          <q-btn icon="clear" color="negative" dense size="md" outline @click="doResetItems" label="wyczyść" />
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script type="text/javascript">
import { extend } from 'quasar'
import IQField from 'components/fields/iqField'
import IQFieldDate from 'components/fields/iqFieldDate'
import IQFieldEditor from 'components/fields/iqFieldEditor'
import IQFieldTextArea from 'components/fields/iqFieldTextArea'
import IQFieldSelect from 'components/fields/iqFieldSelect'

export default {
  name: 'CardSearchFilter',
  components: {
    IQField,
    IQFieldDate,
    IQFieldEditor,
    IQFieldTextArea,
    IQFieldSelect
  },
  data () {
    return {
      searchData: {
        isCaseSensitive: false,
        isRegexp: false,
        searchMode: '',
        poid: '2',
        Path: '/',
        FileName: '',
        Description: '',
        InformacjaPodmiotUdostepniajacy: '',
        InformacjaOsobaOdpowiedzialna: '',
        InformacjaOpisCzynnosci: '',
        Category: '',
        Kind: '',
        ItemKey: '',
        ItemRel: '',
        ItemTitle: '',
        ItemType: '',
        ItemStatus: '',
        InformacjaDataWytworzeniaOD: '',
        InformacjaDataWytworzeniaDO: '',
        OID: '',
        _: ''
      },
      searchResult: {},
      optionsProjects: [
        { label: 'Project', value: '2' }
      ],
      optionsPath: [
        { label: '/', value: '/' },
        { label: '*** wszystkie ***', value: '' }
      ]
    }
  },
  computed: {
  },
  methods: {
    async initSearch (searchData) {
      this.searchData = extend(this.searchData, searchData)
      this.fetchData()
    },
    async fetchData () {
      this.$emit('fetch', this.searchData)
    },
    changeProject (value) {
      this.$emit('changeproject', {value})
    },
    changePath (value) {
      this.$emit('changepath', {value})
    },
    doSearchItems () {
      this.searchData.searchMode = 'searchfiles'
      this.fetchData()
    },
    doResetItems () {
      this.searchData.Path = '/'
      this.searchData.FileName = ''
      this.searchData.Description = ''
      this.searchData.InformacjaPodmiotUdostepniajacy = ''
      this.searchData.InformacjaOsobaOdpowiedzialna = ''
      this.searchData.InformacjaOpisCzynnosci = ''
      this.searchData.Category = ''
      this.searchData.Kind = ''
      this.searchData.ItemKey = ''
      this.searchData.ItemRel = ''
      this.searchData.ItemTitle = ''
      this.searchData.ItemType = ''
      this.searchData.ItemStatus = ''
      this.searchData.InformacjaDataWytworzeniaOD = ''
      this.searchData.InformacjaDataWytworzeniaDO = ''
      this.searchData.OID = ''
    }
  }
}
</script>

<style scoped>
</style>
