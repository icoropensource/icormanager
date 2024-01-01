<template>
  <div>
  <!--
  <card-in-tab>
    <template slot="content">
  -->
      <q-toolbar inverted>
        <q-toolbar-title>
          Pliki
          <span slot="subtitle">
            zarządzanie plikami
          </span>
        </q-toolbar-title>
        <q-btn flat dense icon="refresh" @click="dataLoad()">
          <q-tooltip>Odśwież listę plików</q-tooltip>
        </q-btn>
      </q-toolbar>
      <br>
      <q-uploader
        multiple
        ref="uploader"
        :url="getHTTPAttachmentsAddURL"
        @finish="finishUpload"
        :additionalFields="uploaderFields"
        auto-expand
        stack-label="Dodaj nowe pliki"
      />

      <br><br>
      <q-list separator multiline ref="files" v-dragula="dataItems" bag="httpattachments-bag" v-show="itemsExists">
        <q-item v-for="(item, index) in dataItems" :key="item._OID" :class="index">
          <q-item-side><q-chip color="primary" class="handle cursor-pointer" ><q-icon color="bg-primary" name="assignment" class="handle cursor-pointer" /></q-chip></q-item-side>
          <!--
          _OID, FileSize, LastModification,
          RefTable, RefOID, _datetime, _UID, _UserName,
          ItemWidth, ItemHeight, Status, , ItemPosition
          -->
          <q-item-main>
            <q-collapsible :label="item.FileName+item.FileExt" :sublabel="humanStorageSize(item.FileSize)+' - '+item._datetime+' - '+item._UserName+' ('+item.StatusKonwersji+')'">
              <i-q-field label="Nazwa" v-model="item.FileName" iscopy ispaste></i-q-field>
              <i-q-field label="Opis" v-model="item.Description" iscopy ispaste></i-q-field>
              <i-q-field label="Informacja Podmiot Udostepniający" v-model="item.InformacjaPodmiotUdostepniajacy" issearchable @search="searchInformacjaPodmiotUdostepniajacy" iscopy ispaste></i-q-field>
              <i-q-field label="Informacja Osoba Odpowiedzialna" v-model="item.InformacjaOsobaOdpowiedzialna" issearchable @search="searchInformacjaOsobaOdpowiedzialna" iscopy ispaste></i-q-field>
              <i-q-field-date label="Informacja Data Wytworzenia" v-model="item.InformacjaDataWytworzenia"></i-q-field-date>
              <i-q-field label="Informacja Opis Czynności" v-model="item.InformacjaOpisCzynnosci" issearchable @search="searchInformacjaOpisCzynnosci" iscopy ispaste></i-q-field>
              <i-q-field label="Kategoria" v-model="item.Category" issearchable @search="searchCategory" iscopy ispaste></i-q-field>
              <i-q-field label="Rodzaj" v-model="item.Kind" issearchable @search="searchKind" iscopy ispaste></i-q-field>
              <i-q-field label="Klucz" v-model="item.ItemKey" issearchable @search="searchItemKey" iscopy ispaste></i-q-field>
              <i-q-field label="Rel" v-model="item.ItemRel" issearchable @search="searchItemRel" iscopy ispaste></i-q-field>
              <i-q-field label="Tytuł" v-model="item.ItemTitle" issearchable @search="searchItemTitle" iscopy ispaste></i-q-field>
              <i-q-field label="Typ" v-model="item.ItemType" issearchable @search="searchItemType" iscopy ispaste></i-q-field>
              <i-q-field label="Status" v-model="item.ItemStatus" issearchable @search="searchItemStatus" iscopy ispaste></i-q-field>
              <!--
                PRZYCISKI
              -->
              <br>
              <q-btn icon="save" color="primary" small @click="httpattachmentSave(item._OID)">Zapamiętaj</q-btn>
              <q-btn ref="target" icon="file_download" color="primary" small @click="downloadHTTPAttachment(item)">Pobierz</q-btn>
              <q-btn ref="target" icon="content_copy" color="primary" small @click="selectedItem = item, modalURLClipboard = true" v-if="item.ExternalWWW">Skopiuj URL</q-btn>
              <q-btn icon="delete" color="negative" small outline @click="removeHTTPAttachment(item._OID)">Usuń</q-btn>
            </q-collapsible>
          </q-item-main>

          <q-item-side right>
            <q-item-tile v-if="(item.Status=='')||(item.Status=='A')||(item.Status=='N')">
              <q-chip  v-if="item.StatusKonwersji=='Z'" color="positive">{{item.Status}}</q-chip>
              <q-chip  v-else-if="item.StatusKonwersji=='G'" color="orange-8">{{item.Status}}</q-chip>
              <q-chip  v-else color="negative">{{item.Status}}</q-chip>
            </q-item-tile>
            <q-item-tile v-if="item.Status=='U'"><q-chip color="light">{{item.Status}}</q-chip></q-item-tile>
            <q-item-tile v-if="item.Status=='B'"><q-chip color="negative">{{item.Status}}</q-chip></q-item-tile>
            <q-item-tile v-if="item.Status=='D'"><q-chip color="faded">{{item.Status}}</q-chip></q-item-tile>
          </q-item-side>

        </q-item>
      </q-list>
  <!--
    </template>
  </card-in-tab>
  -->
    <q-modal v-model="modalURLClipboard" :content-css="{padding: '20px', minWidth: '90vw'}">
      <i-q-field label="Link relatywny do pliku" :value="getItemWWWUrl(false)" iscopy></i-q-field>
      <i-q-field label="Link absolutny do pliku" :value="getItemWWWUrl(true)" iscopy></i-q-field>
      <br>
      <q-btn
        class="float-right"
        color="primary"
        @click="modalURLClipboard = false"
        label="Zamknij"
      />
    </q-modal>
  </div>
</template>

<script type="text/javascript">
import {
  format,
  openURL
} from 'quasar'
// import FileUploader from '../../../lib/vue2-multi-uploader/Uploader'
import cardInTab from './cardInTab.vue'
import IQField from 'components/fields/iqField'
import IQFieldDate from 'components/fields/iqFieldDate'
import { mapGetters } from 'vuex'

export default {
  name: 'CardHTTPAttachments',
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
      dataItems: null,
      dataItemsByOID: null,
      uploaderFields: [],
      modalURLClipboard: false,
      selectedItem: {}
    }
  },
  components: {
    cardInTab,
    IQField,
    IQFieldDate
  },
  computed: {
    ...mapGetters(['getICORURL', 'getUser_UID']),

    getHTTPAttachmentsAddURL () {
      return this.getICORURL + '/icormanager/app/filemanager/httpattachmentsdata'
    },
    itemsExists () {
      if (!this.dataItems) {
        return false
      }
      return this.dataItems.length > 0
    }
  },
  created () {
    this.$root.$on('drop-httpattachments', this.dropHTTPAttachments)
    this.$root.$on('change-ICOR-tabs', this.changeICORTabs)
  },
  beforeDestroy () {
    this.$root.$off('drop-httpattachments', this.dropHTTPAttachments)
    this.$root.$off('change-ICOR-tabs', this.changeICORTabs)
  },
  methods: {
    humanStorageSize (v) {
      return format.humanStorageSize(parseInt(v))
    },
    async dataLoad () {
      this.dataItems = []
      this.dataItemsByOID = {}
      this.uploaderFields = []
      let [ttt, idata] = await this.$icor.main.httpattachmentsLoad(this.dbitem)
      if (ttt !== '') {
        this.uploaderFields.push({name: '_ttt', value: ttt})
        for (var i = 0; i < idata.length; i++) {
          var item = idata[i]
          this.dataItemsByOID[item._OID] = item
        }
        this.dataItems = idata
      }
      // Toast.create.negative('Wystąpił błąd podczas pobierania listy plików. Skontaktuj się z administratorem.')
    },
    async httpattachmentSave (aoid) {
      let [response] = await this.$icor.main.httpattachmentsSave(this.dbitem, this.dataItemsByOID[aoid])
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania danych pliku: ' + response.data.errors[0].title})
        return
      }
      if (response.data.status !== 'OK') {
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: ' ' + response.data.status})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Dane pliku zostały zapamiętane.'})
      this.dataLoad()
      // Toast.create.negative('Wystąpił błąd podczas zapamiętywania danych pliku. Skontaktuj się z administratorem.')
    },
    finishUpload () {
      // this.$refs.uploader.$data.files = []
      this.$refs.uploader.reset()
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Pliki zapamiętane.'})
      this.dataLoad() // $$ zmienic na event
    },
    async dropHTTPAttachments (event) {
      if (event.tab.id !== this.tabitem.id) {
        // console.log(`dropHTTPAttachment other event to: ${event.tab.id} tab: ${this.tabitem.id}`)
        return
      }
      var so = ''
      for (var i = 0; i < this.dataItems.length; i++) {
        so += this.dataItems[i]._OID + '|'
      }
      let [response] = await this.$icor.main.httpattachmentsSetPosition(this.dbitem, {lpos: so})
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania kolejności plikÓw: ' + response.data.errors[0].info})
        return
      }
      if (response.data.status !== 'OK') {
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: ' ' + response.data.status})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Kolejność plików została zmieniona.'})
      // Toast.create.negative('Wystąpił błąd podczas zapamiętywania kolejności pliku. Skontaktuj się z administratorem.')
    },
    downloadHTTPAttachment (item) {
      const url = this.getItemDownloadURL(item)
      openURL(url)
    },
    getItemWWWUrl (absolute) {
      let ret = ''
      if (absolute) {
        ret += this.selectedItem.ExternalWWW
      }
      ret += '/files' + '/' + this.selectedItem._OID + '/' + this.selectedItem.FileName + this.selectedItem.FileExt
      return ret
    },
    getItemDownloadURL (item) {
      return this.getICORURL + '/icormanager/appdata/' + item.ProjectPath + '/crm/FILES_DOWNLOAD_0.asp?foid=' + item._OID
    },
    async doRemoveHTTPAttachment (aoid) {
      let [response] = await this.$icor.main.httpattachmentsRemove(this.dbitem, {foid: aoid})
      var msg
      if (response.data.errors) {
        try {
          msg = 'Wystąpił błąd podczas usuwania pliku: ' + response.data.errors[0].info
        } catch (e) {
          msg = 'Wystąpił nieokreślony błąd podczas usuwania pliku. Skontaktuj się z administratorem.'
        }
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: msg})
        return
      }
      if (response.data.status !== 'OK') {
        try {
          msg = ' ' + response.data.status
        } catch (e) {
          msg = 'Wystąpił nieokreślony status podczas usuwania pliku. Skontaktuj się z administratorem.'
        }
        // console.log(msg)
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: msg})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Plik usunięty.'})
      this.dataLoad() // $$ zmienic na event
      // Toast.create.negative('Wystąpił błąd podczas usuwania pliku. Skontaktuj się z administratorem.')
    },
    async removeHTTPAttachment (aoid) {
      try {
        await this.$q.dialog({
          message: 'Czy chcesz usunąć ten plik?',
          ok: 'Tak',
          cancel: 'Nie'
        })
        this.doRemoveHTTPAttachment(aoid)
      } catch (e) {
      }
    },
    async searchField (field, terms, done) {
      this.$icor.main.httpattachmentsSearchField(this.dbitem, {field: field, value: terms}, done)
    },
    searchInformacjaPodmiotUdostepniajacy (terms, done) {
      this.searchField('InformacjaPodmiotUdostepniajacy', terms, done)
    },
    searchInformacjaOsobaOdpowiedzialna (terms, done) {
      this.searchField('InformacjaOsobaOdpowiedzialna', terms, done)
    },
    searchInformacjaOpisCzynnosci (terms, done) {
      this.searchField('InformacjaOpisCzynnosci', terms, done)
    },
    searchCategory (terms, done) {
      this.searchField('Category', terms, done)
    },
    searchKind (terms, done) {
      this.searchField('Kind', terms, done)
    },
    searchItemKey (terms, done) {
      this.searchField('ItemKey', terms, done)
    },
    searchItemTitle (terms, done) {
      this.searchField('ItemTitle', terms, done)
    },
    searchItemRel (terms, done) {
      this.searchField('ItemRel', terms, done)
    },
    searchItemType (terms, done) {
      this.searchField('ItemType', terms, done)
    },
    searchItemStatus (terms, done) {
      this.searchField('ItemStatus', terms, done)
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
        // console.log('dbitem.oid: ' + vnew + ':' + vold)
        this.dataItems = null
        this.dataItemsByOID = null
        this.uploaderFields = []
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.ss {
  color: #021416;
  color: #c6a2ff;
}
</style>
