<template>
  <div>
  <!--
  <card-in-tab>
    <template slot="content">
  -->
      <q-toolbar inverted>
        <q-toolbar-title>
          Załączniki
          <span slot="subtitle">
            zarządzanie załącznikami
          </span>
        </q-toolbar-title>
        <q-btn flat dense icon="refresh" @click="dataLoad()">
          <q-tooltip>Odśwież listę załączników</q-tooltip>
        </q-btn>
      </q-toolbar>
      <br>
      <q-uploader
        multiple
        ref="uploader"
        :url="getAttachmentsAddURL"
        @finish="finishUpload"
        :additionalFields="uploaderFields"
        auto-expand
        stack-label="Dodaj nowe załączniki"
      />

      <br><br>
      <q-list separator multiline ref="files" v-dragula="dataItems" bag="attachments-bag" v-show="itemsExists">
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
              <q-btn icon="save" color="primary" small @click="attachmentSave(item._OID)">Zapamiętaj</q-btn>
              <q-btn ref="target" icon="file_download" color="primary" small @click="downloadAttachment(item)">Pobierz</q-btn>
              <q-btn ref="target" icon="content_copy" color="primary" small @click="selectedItem = item, modalURLClipboard = true" v-if="item.ExternalWWW">Skopiuj URL</q-btn>
              <q-btn icon="delete" color="negative" small outline @click="removeAttachment(item._OID)">Usuń</q-btn>
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
      <i-q-field label="Link relatywny do załącznika" :value="getItemWWWUrl(false)" iscopy></i-q-field>
      <i-q-field label="Link absolutny do załącznika" :value="getItemWWWUrl(true)" iscopy></i-q-field>
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
  name: 'CardAttachments',
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

    getAttachmentsAddURL () {
      return this.getICORURL + '/icormanager/app/filemanager/attachmentsdata'
    },
    itemsExists () {
      if (!this.dataItems) {
        return false
      }
      return this.dataItems.length > 0
    }
  },
  created () {
    this.$root.$on('drop-attachments', this.dropAttachments)
    this.$root.$on('change-ICOR-tabs', this.changeICORTabs)
  },
  beforeDestroy () {
    this.$root.$off('drop-attachments', this.dropAttachments)
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
      let [ttt, idata] = await this.$icor.main.attachmentsLoad(this.dbitem)
      if (ttt !== '') {
        this.uploaderFields.push({name: '_ttt', value: ttt})
        for (var i = 0; i < idata.length; i++) {
          var item = idata[i]
          this.dataItemsByOID[item._OID] = item
        }
        this.dataItems = idata
      }
      // Toast.create.negative('Wystąpił błąd podczas pobierania listy załączników. Skontaktuj się z administratorem.')
    },
    async attachmentSave (aoid) {
      let [response] = await this.$icor.main.attachmentsSave(this.dbitem, this.dataItemsByOID[aoid])
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania danych załącznika: ' + response.data.errors[0].title})
        return
      }
      if (response.data.status !== 'OK') {
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: ' ' + response.data.status})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Dane załącznika zostały zapamiętane.'})
      this.dataLoad()
      // Toast.create.negative('Wystąpił błąd podczas zapamiętywania danych załącznika. Skontaktuj się z administratorem.')
    },
    finishUpload () {
      // this.$refs.uploader.$data.files = []
      this.$refs.uploader.reset()
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Załączniki zapamiętane.'})
      this.dataLoad() // $$ zmienic na event
    },
    async dropAttachments (event) {
      if (event.tab.id !== this.tabitem.id) {
        // console.log(`dropAttachment other event to: ${event.tab.id} tab: ${this.tabitem.id}`)
        return
      }
      var so = ''
      for (var i = 0; i < this.dataItems.length; i++) {
        so += this.dataItems[i]._OID + '|'
      }
      let [response] = await this.$icor.main.attachmentsSetPosition(this.dbitem, {lpos: so})
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania kolejności załączników: ' + response.data.errors[0].info})
        return
      }
      if (response.data.status !== 'OK') {
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: ' ' + response.data.status})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Kolejność załączników została zmieniona.'})
      // Toast.create.negative('Wystąpił błąd podczas zapamiętywania kolejności załącznika. Skontaktuj się z administratorem.')
    },
    downloadAttachment (item) {
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
    async doRemoveAttachment (aoid) {
      let [response] = await this.$icor.main.attachmentsRemove(this.dbitem, {foid: aoid})
      var msg
      if (response.data.errors) {
        try {
          msg = 'Wystąpił błąd podczas usuwania załącznika: ' + response.data.errors[0].info
        } catch (e) {
          msg = 'Wystąpił nieokreślony błąd podczas usuwania załącznika. Skontaktuj się z administratorem.'
        }
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: msg})
        return
      }
      if (response.data.status !== 'OK') {
        try {
          msg = ' ' + response.data.status
        } catch (e) {
          msg = 'Wystąpił nieokreślony status podczas usuwania załącznika. Skontaktuj się z administratorem.'
        }
        // console.log(msg)
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: msg})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Załącznik usunięty.'})
      this.dataLoad() // $$ zmienic na event
      // Toast.create.negative('Wystąpił błąd podczas usuwania załącznika. Skontaktuj się z administratorem.')
    },
    async removeAttachment (aoid) {
      try {
        await this.$q.dialog({
          message: 'Czy chcesz usunąć ten załącznik?',
          ok: 'Tak',
          cancel: 'Nie'
        })
        this.doRemoveAttachment(aoid)
      } catch (e) {
      }
    },
    async searchField (field, terms, done) {
      this.$icor.main.attachmentsSearchField(this.dbitem, {field: field, value: terms}, done)
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
