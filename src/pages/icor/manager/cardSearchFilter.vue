<template>
  <div>
      <q-list separator>
        <q-item>
          <q-item-main label="czy rozróżniać małe i duże litery">
          </q-item-main>
          <q-item-side right>
            <q-toggle v-model="searchData.isCaseSensitive" />
          </q-item-side>
        </q-item>
        <q-item>
          <q-item-main label="czy wyszukiwać wg regexp">
          </q-item-main>
          <q-item-side right>
            <q-toggle v-model="searchData.isRegexp" />
          </q-item-side>
        </q-item>

        <q-collapsible v-if="getUser_groups_ApplicationDevelopers">
          <template slot="header">
            <q-item-side><img src="/icormanager/images/icons/silk/icons/database_table.png"/></q-item-side>
            <q-item-main label="Tabele" />
          </template>
          <i-q-field label="nazwa" v-model="searchData.tableName" ispaste iscopy></i-q-field>
          <i-q-field label="grupa" v-model="searchData.tableGroup" ispaste iscopy></i-q-field>
          <i-q-field label="opis" v-model="searchData.tableDescription" ispaste iscopy></i-q-field>
          <i-q-field label="treść SQL" v-model="searchData.tableSQL" ispaste iscopy></i-q-field>
          <i-q-field label="szablon XSL - obiekt" v-model="searchData.tableXSL" ispaste iscopy></i-q-field>
          <i-q-field label="szablon XSL - tabela" v-model="searchData.tableXSLTable" ispaste iscopy></i-q-field>
          <q-field>
            <div class="row no-wrap">
              <q-input class="col" v-model="searchData.tableOIDFrom" float-label="OID od" />
              <q-input class="col" v-model="searchData.tableOIDTo" float-label="OID do" />
            </div>
          </q-field>
          <q-item-separator inset />
          <q-item>
            <q-item-main>
              <q-btn icon="search" color="primary" dense size="md" class="q-mr-sm" @click="doSearchTable" label="szukaj" />
              <q-btn icon="clear" color="negative" dense size="md" outline @click="doResetTable" label="wyczyść" />
            </q-item-main>
          </q-item>
        </q-collapsible>

        <q-collapsible v-if="getUser_groups_ApplicationDevelopers">
          <template slot="header">
            <q-item-side><img src="/icormanager/images/icons/silk/icons/page_white_code_red.png"/></q-item-side>
            <q-item-main label="Wyszukiwarki i formularze XML" />
          </template>
          <i-q-field label="nazwa" v-model="searchData.xmlName" ispaste iscopy></i-q-field>
          <i-q-field label="grupa" v-model="searchData.xmlGroup" ispaste iscopy></i-q-field>
          <i-q-field label="treść XML" v-model="searchData.xmlSource" ispaste iscopy></i-q-field>
          <q-field>
            <div class="row no-wrap">
              <q-input class="col" v-model="searchData.xmlOIDFrom" float-label="OID od" />
              <q-input class="col" v-model="searchData.xmlOIDTo" float-label="OID do" />
            </div>
          </q-field>
          <q-item-separator inset />
          <q-item>
            <q-item-main>
              <q-btn icon="search" color="primary" dense size="md" class="q-mr-sm" @click="doSearchXML" label="szukaj" />
              <q-btn icon="clear" color="negative" dense size="md" outline @click="doResetXML" label="wyczyść" />
            </q-item-main>
          </q-item>
        </q-collapsible>

        <q-collapsible v-if="getUser_groups_ApplicationDevelopers">
          <template slot="header">
            <q-item-side><img src="/icormanager/images/icons/silk/icons/book.png"/></q-item-side>
            <q-item-main label="Rozdziały" />
          </template>
          <i-q-field label="nagłówek" v-model="searchData.chapterName" ispaste iscopy></i-q-field>
          <i-q-field label="nagłówek w menu" v-model="searchData.chapterNameMenu" ispaste iscopy></i-q-field>
          <i-q-field label="href" v-model="searchData.chapterHRef" ispaste iscopy></i-q-field>
          <i-q-field label="href w menu" v-model="searchData.chapterHRefMenu" ispaste iscopy></i-q-field>
          <i-q-field label="opis" v-model="searchData.chapterDescription" ispaste iscopy></i-q-field>
          <q-field>
            <div class="row no-wrap">
              <q-input class="col" v-model="searchData.chapterOIDFrom" float-label="OID od" />
              <q-input class="col" v-model="searchData.chapterOIDTo" float-label="OID do" />
            </div>
          </q-field>
          <q-item-separator inset />
          <q-item>
            <q-item-main>
              <q-btn icon="search" color="primary" dense size="md" class="q-mr-sm" @click="doSearchChapter" label="szukaj" />
              <q-btn icon="clear" color="negative" dense size="md" outline @click="doResetChapter" label="wyczyść" />
            </q-item-main>
          </q-item>
        </q-collapsible>

        <q-collapsible v-if="getUser_groups_ApplicationDevelopers">
          <template slot="header">
            <q-item-side><img src="/icormanager/images/icons/silk/icons/script_lightning.png"/></q-item-side>
            <q-item-main label="Zdarzenia" />
          </template>
          <i-q-field-select label="źródło zdarzeń" v-model="searchData.eventOwner" :options="optionsEventOwner"></i-q-field-select>
          <i-q-field-select label="rodzaj zdarzenia" v-model="searchData.eventKind" :options="optionsEventKind"></i-q-field-select>
          <i-q-field label="klucz" v-model="searchData.eventKey" ispaste iscopy></i-q-field>
          <i-q-field label="opis" v-model="searchData.eventDescription" ispaste iscopy></i-q-field>
          <i-q-field label="treść" v-model="searchData.eventSource" ispaste iscopy></i-q-field>
          <q-field>
            <div class="row no-wrap">
              <q-input class="col" v-model="searchData.eventOIDFrom" float-label="OID od" />
              <q-input class="col" v-model="searchData.eventOIDTo" float-label="OID do" />
            </div>
          </q-field>
          <q-item-separator inset />
          <q-item>
            <q-item-main>
              <q-btn icon="search" color="primary" dense size="md" class="q-mr-sm" @click="doSearchEvent" label="szukaj" />
              <q-btn icon="clear" color="negative" dense size="md" outline @click="doResetEvent" label="wyczyść" />
            </q-item-main>
          </q-item>
        </q-collapsible>

        <q-collapsible v-if="getUser_groups_ApplicationDevelopers">
          <template slot="header">
            <q-item-side><img src="/icormanager/images/icons/silk/icons/html.png"/></q-item-side>
            <q-item-main label="HTML Użytkownika" />
          </template>
          <i-q-field label="nazwa" v-model="searchData.htmlName" ispaste iscopy></i-q-field>
          <i-q-field label="opis" v-model="searchData.htmlDescription" ispaste iscopy></i-q-field>
          <i-q-field label="treść HTML" v-model="searchData.htmlSource" ispaste iscopy></i-q-field>
          <q-field>
            <div class="row no-wrap">
              <q-input class="col" v-model="searchData.htmlOIDFrom" float-label="OID od" />
              <q-input class="col" v-model="searchData.htmlOIDTo" float-label="OID do" />
            </div>
          </q-field>
          <q-item-separator inset />
          <q-item>
            <q-item-main>
              <q-btn icon="search" color="primary" dense size="md" class="q-mr-sm" @click="doSearchHTML" label="szukaj" />
              <q-btn icon="clear" color="negative" dense size="md" outline @click="doResetHTML" label="wyczyść" />
            </q-item-main>
          </q-item>
        </q-collapsible>

        <q-collapsible v-if="getUser_groups_ApplicationDevelopers">
          <template slot="header">
            <q-item-side><img src="/icormanager/images/icons/silk/icons/script.png"/></q-item-side>
            <q-item-main label="SQL Użytkownika" />
          </template>
          <i-q-field label="nazwa SQL" v-model="searchData.sqlName" ispaste iscopy></i-q-field>
          <i-q-field label="grupa" v-model="searchData.sqlGroup" ispaste iscopy></i-q-field>
          <i-q-field label="treść SQL" v-model="searchData.sqlSource" ispaste iscopy></i-q-field>
          <q-field>
            <div class="row no-wrap">
              <q-input class="col" v-model="searchData.sqlOIDFrom" float-label="OID od" />
              <q-input class="col" v-model="searchData.sqlOIDTo" float-label="OID do" />
            </div>
          </q-field>
          <q-item-separator inset />
          <q-item>
            <q-item-main>
              <q-btn icon="search" color="primary" dense size="md" class="q-mr-sm" @click="doSearchSQL" label="szukaj" />
              <q-btn icon="clear" color="negative" dense size="md" outline @click="doResetSQL" label="wyczyść" />
            </q-item-main>
          </q-item>
        </q-collapsible>

        <q-collapsible v-if="getUser_groups_ApplicationDevelopers">
          <template slot="header">
            <q-item-side><img src="/icormanager/images/icons/silk/icons/layout.png"/></q-item-side>
            <q-item-main label="Wzorce stron" />
          </template>
          <i-q-field label="nazwa wzorca" v-model="searchData.templateName" ispaste iscopy></i-q-field>
          <i-q-field label="treść" v-model="searchData.templateSource" ispaste iscopy></i-q-field>
          <i-q-field label="zmienne XML" v-model="searchData.templateXML" ispaste iscopy></i-q-field>
          <i-q-field label="XSL - końcowy" v-model="searchData.templateXSLAtEnd" ispaste iscopy></i-q-field>
          <i-q-field label="XSL - główny obiekt" v-model="searchData.templateXSLMainObjectAtEnd" ispaste iscopy></i-q-field>
          <q-field>
            <div class="row no-wrap">
              <q-input class="col" v-model="searchData.templateOIDFrom" float-label="OID od" />
              <q-input class="col" v-model="searchData.templateOIDTo" float-label="OID do" />
            </div>
          </q-field>
          <q-item-separator inset />
          <q-item>
            <q-item-main>
              <q-btn icon="search" color="primary" dense size="md" class="q-mr-sm" @click="doSearchTemplate" label="szukaj" />
              <q-btn icon="clear" color="negative" dense size="md" outline @click="doResetTemplate" label="wyczyść" />
            </q-item-main>
          </q-item>
        </q-collapsible>

      </q-list>

  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'
import { extend } from 'quasar'
import IQField from 'components/fields/iqField'
import IQFieldDate from 'components/fields/iqFieldDate'
import IQFieldEditor from 'components/fields/iqFieldEditor'
import IQFieldTextArea from 'components/fields/iqFieldTextArea'
import IQFieldSelect from 'components/fields/iqFieldSelect'
import {optionsEventOwner, optionsEventKind} from './data/cardSearchData'

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
        tableName: '',
        tableGroup: '',
        tableDescription: '',
        tableSQL: '',
        tableXSL: '',
        tableXSLTable: '',
        tableOIDFrom: '',
        tableOIDTo: '',
        htmlName: '',
        htmlDescription: '',
        htmlSource: '',
        htmlOIDFrom: '',
        htmlOIDTo: '',
        xmlName: '',
        xmlGroup: '',
        xmlSource: '',
        xmlOIDFrom: '',
        xmlOIDTo: '',
        chapterName: '',
        chapterNameMenu: '',
        chapterHRef: '',
        chapterHRefMenu: '',
        chapterDescription: '',
        chapterOIDFrom: '',
        chapterOIDTo: '',
        eventOwner: 'Plugin',
        eventKind: '',
        eventKey: '',
        eventDescription: '',
        eventSource: '',
        eventOIDFrom: '',
        eventOIDTo: '',
        sqlName: '',
        sqlGroup: '',
        sqlSource: '',
        sqlOIDFrom: '',
        sqlOIDTo: '',
        templateName: '',
        templateSource: '',
        templateXML: '',
        templateXSLAtEnd: '',
        templateXSLMainObjectAtEnd: '',
        templateOIDFrom: '',
        templateOIDTo: '',
        _: ''
      },
      searchResult: {},
      optionsEventOwner: optionsEventOwner,
      optionsEventKind: optionsEventKind
    }
  },
  computed: {
    ...mapGetters(['getUser_groups_ApplicationDevelopers'])
  },
  methods: {
    ...mapMutations([]),
    async initSearch (searchData) {
      this.searchData = extend(this.searchData, searchData)
      this.fetchData()
    },
    async fetchData () {
      this.$emit('fetch', this.searchData)
    },
    doSearchTable () {
      this.tableTitle = 'wyszukiwanie w tabelach'
      this.searchData.searchMode = 'table'
      this.fetchData()
    },
    doResetTable () {
      this.searchData.tableName = ''
      this.searchData.tableGroup = ''
      this.searchData.tableDescription = ''
      this.searchData.tableSQL = ''
      this.searchData.tableXSL = ''
      this.searchData.tableXSLTable = ''
      this.searchData.tableOIDFrom = ''
      this.searchData.tableOIDTo = ''
    },
    doSearchXML () {
      this.tableTitle = 'wyszukiwanie w XML'
      this.searchData.searchMode = 'xmldata'
      this.fetchData()
    },
    doResetXML () {
      this.searchData.xmlName = ''
      this.searchData.xmlGroup = ''
      this.searchData.xmlSource = ''
      this.xmlOIDFrom = ''
      this.xmlOIDTo = ''
    },
    doSearchChapter () {
      this.tableTitle = 'wyszukiwanie w rozdziałach'
      this.searchData.searchMode = 'chapter'
      this.fetchData()
    },
    doResetChapter () {
      this.searchData.chapterName = ''
      this.searchData.chapterNameMenu = ''
      this.searchData.chapterHRef = ''
      this.searchData.chapterHRefMenu = ''
      this.searchData.chapterDescription = ''
      this.searchData.chapterOIDFrom = ''
      this.searchData.chapterOIDTo = ''
    },
    doSearchEvent () {
      this.tableTitle = 'wyszukiwanie w zdarzeniach'
      this.searchData.searchMode = 'event'
      this.fetchData()
    },
    doResetEvent () {
      this.searchData.eventOwner = 'Plugin'
      this.searchData.eventKind = ''
      this.searchData.eventKey = ''
      this.searchData.eventDescription = ''
      this.searchData.eventSource = ''
      this.eventOIDFrom = ''
      this.eventOIDTo = ''
    },
    doSearchHTML () {
      this.tableTitle = 'wyszukiwanie w HTML'
      this.searchData.searchMode = 'html'
      this.fetchData()
    },
    doResetHTML () {
      this.searchData.htmlName = ''
      this.searchData.htmlDescription = ''
      this.searchData.htmlSource = ''
      this.htmlOIDFrom = ''
      this.htmlOIDTo = ''
    },
    doSearchSQL () {
      this.tableTitle = 'wyszukiwanie w SQL'
      this.searchData.searchMode = 'sql'
      this.fetchData()
    },
    doResetSQL () {
      this.searchData.sqlName = ''
      this.searchData.sqlGroup = ''
      this.searchData.sqlSource = ''
      this.sqlOIDFrom = ''
      this.sqlOIDTo = ''
    },
    doSearchTemplate () {
      this.tableTitle = 'wyszukiwanie we wzorcach'
      this.searchData.searchMode = 'template'
      this.fetchData()
    },
    doResetTemplate () {
      this.searchData.templateName = ''
      this.searchData.templateSource = ''
      this.searchData.templateXML = ''
      this.searchData.templateXSLAtEnd = ''
      this.searchData.templateXSLMainObjectAtEnd = ''
      this.templateOIDFrom = ''
      this.templateOIDTo = ''
    }
  }
}
</script>

<style scoped>
</style>
