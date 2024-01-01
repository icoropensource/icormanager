<template>
  <!--
  <card-in-tab>
    <template slot="content">
  -->
  <div>
      <q-toolbar inverted>
        <q-toolbar-title>
          Multimedia
          <span slot="subtitle">
            zarządzanie plikami multimedialnymi
          </span>
        </q-toolbar-title>
        <q-btn flat dense icon="photo_library" @click="showGallery()">
          <q-tooltip>Wyświetl galerię</q-tooltip>
        </q-btn>
        <q-btn flat dense icon="refresh" @click="dataLoad()">
          <q-tooltip>Odśwież listę multimediów</q-tooltip>
        </q-btn>
      </q-toolbar>
      <br>
      <q-uploader
        multiple
        ref="uploader"
        :url="getMultimediaAddURL"
        @finish="finishUpload"
        :additionalFields="uploaderFields"
        auto-expand
        stack-label="Dodaj nowe pliki multimedialne"
      />
      <br><br>
      <q-list separator multiline dense ref="files" v-dragula="dataItems" bag="multimedia-bag" v-show="itemsExists">
        <q-item v-for="(item, index) in dataItems" :key="item._OID" :class="index">
          <q-item-side>
            <img :src="getItemThumbURL(item)" class="q-item-image handle cursor-pointer">
          </q-item-side>
          <!--
          _OID, FileSize, LastModification,
          RefTable, RefOID, _datetime, _UID, _UserName,
          ItemWidth, ItemHeight, Status, , ItemPosition
          -->
          <q-item-main>
            <q-collapsible :label="item.FileName+item.FileExt" :sublabel="humanStorageSize(item.FileSize)+' - '+item._datetime+' - '+item._UserName">
              <i-q-field label="Opis" v-model="item.Description" iscopy ispaste></i-q-field>
              <i-q-field label="Informacja Podmiot Udostepniający" v-model="item.InformacjaPodmiotUdostepniajacy" issearchable @search="searchInformacjaPodmiotUdostepniajacy" iscopy ispaste></i-q-field>
              <i-q-field label="Informacja Osoba Odpowiedzialna" v-model="item.InformacjaOsobaOdpowiedzialna" issearchable @search="searchInformacjaOsobaOdpowiedzialna" iscopy ispaste></i-q-field>
              <i-q-field-date label="Informacja Data Wytworzenia" v-model="item.InformacjaDataWytworzenia"></i-q-field-date>
              <i-q-field label="Informacja Opis Czynności" v-model="item.InformacjaOpisCzynnosci" issearchable @search="searchInformacjaOpisCzynnosci" iscopy ispaste></i-q-field>
              <i-q-field label="Kategoria" v-model="item.Category" issearchable @search="searchCategory" iscopy ispaste></i-q-field>
              <i-q-field label="Rodzaj" v-model="item.Kind" issearchable @search="searchKind" iscopy ispaste></i-q-field>
              <i-q-field label="Grupa" v-model="item.ItemGroup" issearchable @search="searchGroup" iscopy ispaste></i-q-field>
              <i-q-field label="Klucz" v-model="item.ItemKey" issearchable @search="searchItemKey" iscopy ispaste></i-q-field>
              <i-q-field label="Rel" v-model="item.ItemRel" issearchable @search="searchItemRel" iscopy ispaste></i-q-field>
              <i-q-field label="Tytuł" v-model="item.ItemTitle" issearchable @search="searchItemTitle" iscopy ispaste></i-q-field>
              <i-q-field label="Typ" v-model="item.ItemType" issearchable @search="searchItemType" iscopy ispaste></i-q-field>
              <i-q-field label="Status" v-model="item.ItemStatus" issearchable @search="searchItemStatus" iscopy ispaste></i-q-field>
              <!--
                 PRZYCISKI
              -->
              <br>
              <q-btn icon="save" color="primary" small @click="multimediaSave(item._OID)">Zapamiętaj</q-btn>
              <q-btn ref="target" icon="file_download" icon-right="expand_more" color="primary" small>Pobierz
                <q-popover ref="popoverDownload" fit>
                  <q-list separator link>
                    <q-item v-close-overlay @click.native="downloadMultimedia(item)"><q-item-main>Multimedium</q-item-main></q-item>
                    <q-item v-close-overlay @click.native="downloadMultimediaThumbnail(item)"><q-item-main>Miniaturę</q-item-main></q-item>
                    <q-item v-close-overlay @click.native="downloadMultimediaOriginal(item)"><q-item-main>Oryginał</q-item-main></q-item>
                    <q-item v-close-overlay @click.native="imageEditorMultimedia(item)"><q-item-main>Edycja multimedium</q-item-main></q-item>
                    <!--
                    -->
                  </q-list>
                </q-popover>
              </q-btn>
              <q-btn ref="target" icon="content_copy" color="primary" small @click="selectedItem = item, modalURLClipboard = true" v-if="item.Status === 'Z1'">Skopiuj URL</q-btn>
              <q-btn icon="delete" icon-right="expand_more" color="negative" small outline>Usuń
                <q-popover ref="popoverRemoveMultimedia" fit>
                  <q-list separator link>
                    <q-item v-close-overlay @click.native="removeMultimedia(item._OID)"><q-item-main>Multimedium</q-item-main></q-item>
                    <q-item v-close-overlay @click.native="removeMultimediaThumbnail(item._OID)"><q-item-main>Miniatury</q-item-main></q-item>
                  </q-list>
                </q-popover>
              </q-btn>
            </q-collapsible>
          </q-item-main>

          <q-item-side right>
            <q-item-tile v-if="item.Status==''"><q-chip color="warning">N1</q-chip></q-item-tile>
            <q-item-tile v-if="item.Status=='N1'"><q-chip color="warning">{{item.Status}}</q-chip></q-item-tile>
            <q-item-tile v-if="item.Status=='P1'"><q-chip color="info">{{item.Status}}</q-chip></q-item-tile>
            <q-item-tile v-if="item.Status=='B1'"><q-chip color="negative">{{item.Status}}</q-chip></q-item-tile>
            <q-item-tile v-if="item.Status=='Z1'"><q-chip color="positive">{{item.Status}}</q-chip></q-item-tile>
            <q-item-tile v-if="item.Status=='U1'"><q-chip color="faded">{{item.Status}}</q-chip></q-item-tile>
          </q-item-side>

        </q-item>
      </q-list>
      <br><br>
      <!--
      <div class="images" v-show="false" v-viewer="{ 'inline': false, 'button': true, 'navbar': true, 'title': true, 'toobar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }">
      </div>
      <viewer :images="dataItems">
        <img v-for="item in dataItems" :key="item._OID" :src="getItemThumbURL(item)" :data-source="getItemImageURL(item)" :alt="item.Description">
      </viewer>
      -->
      <viewer :options="options" :images="dataItems" @inited="inited" class="viewer" ref="viewer">
        <img v-for="item in dataItems" :key="item._OID" :src="getItemThumbURL(item)" :data-source="getItemImageURL(item)" :alt="item.Description" v-show="false">
      </viewer>

  <!--
    </template>
  </card-in-tab>
  -->
    <q-modal v-model="modalURLClipboard" :content-css="{padding: '20px', minWidth: '90vw'}">
      <i-q-field label="Link relatywny do multimedium" :value="getItemImageWWWUrl(false)" iscopy></i-q-field>
      <i-q-field label="Link absolutny do multimedium" :value="getItemImageWWWUrl(true)" iscopy></i-q-field>
      <i-q-field label="Link relatywny do miniatury" :value="getItemThumbWWWUrl(false)" iscopy></i-q-field>
      <i-q-field label="Link absolutny do miniatury" :value="getItemThumbWWWUrl(true)" iscopy></i-q-field>
      <i-q-field label="Link relatywny do oryginału" :value="getItemWWWUrl(false)" iscopy></i-q-field>
      <i-q-field label="Link absolutny do oryginału" :value="getItemWWWUrl(true)" iscopy></i-q-field>
      <br>
      <q-btn
        class="float-right"
        color="primary"
        @click="modalURLClipboard = false"
        label="Zamknij"
      />
    </q-modal>
    <i-q-image-editor ref="thisImageEditor" mode="multimedia"></i-q-image-editor>
  </div>
</template>

<script type="text/javascript">
import {
  openURL,
  format
} from 'quasar'
// import FileUploader from '../../../lib/vue2-multi-uploader/Uploader'
import IQField from 'components/fields/iqField'
import IQFieldDate from 'components/fields/iqFieldDate'
import IQImageEditor from 'components/fields/iqImageEditor'
import { mapGetters } from 'vuex'

export default {
  name: 'CardMultimedia',
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
      selectedItem: {},
      modalURLClipboard: false,
      options: { 'inline': false, 'button': true, 'navbar': true, 'title': true, 'toobar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
    }
  },
  components: {
    IQField,
    IQFieldDate,
    IQImageEditor
  },
  computed: {
    ...mapGetters(['getICORURL', 'getUser_UID']),

    getMultimediaAddURL () {
      return this.getICORURL + '/icormanager/app/filemanager/multimediadata'
    },
    itemsExists () {
      if (!this.dataItems) {
        return false
      }
      return this.dataItems.length > 0
    }
  },
  created () {
    this.$root.$on('drop-multimedia', this.dropMultimedia)
    this.$root.$on('change-ICOR-tabs', this.changeICORTabs)
  },
  beforeDestroy () {
    this.$root.$off('drop-multimedia', this.dropMultimedia)
    this.$root.$off('change-ICOR-tabs', this.changeICORTabs)
  },
  methods: {
    getItemThumbURL (item) {
      if (item.Status === 'Z1') {
        return this.getICORURL + '/' + item.ProjectPath + 'Files' + '/' + item.FileTypePath + '/_multimedia/' + item._OID + '/thumb_1_' + item.FileName + '.jpg'
      }
      return 'statics/icons/icon-512x512.png'
    },
    getItemImageURL (item) {
      if (item.Status === 'Z1') {
        return this.getICORURL + '/' + item.ProjectPath + 'Files' + '/' + item.FileTypePath + '/_multimedia/' + item._OID + '/image_' + item.FileName + '.jpg'
      }
      return 'statics/icons/icon-512x512.png'
    },
    getItemOriginalURL (item) {
      if (item.Status === 'Z1') {
        return this.getICORURL + '/' + item.ProjectPath + 'Files' + '/' + item.FileTypePath + '/_multimedia/' + item._OID + '/' + item.FileName + item.FileExt
      }
      return 'statics/icons/icon-512x512.png'
    },
    getItemThumbWWWUrl (absolute) {
      let ret = ''
      if (absolute) {
        ret += this.selectedItem.ExternalWWW
      }
      ret += '/' + this.selectedItem.ProjectPath + 'Files' + '/' + this.selectedItem.FileTypePath + '/_multimedia/' + this.selectedItem._OID + '/thumb_1_' + this.selectedItem.FileName + '.jpg'
      return ret
    },
    getItemImageWWWUrl (absolute) {
      let ret = ''
      if (absolute) {
        ret += this.selectedItem.ExternalWWW
      }
      ret += '/' + this.selectedItem.ProjectPath + 'Files' + '/' + this.selectedItem.FileTypePath + '/_multimedia/' + this.selectedItem._OID + '/image_' + this.selectedItem.FileName + '.jpg'
      return ret
    },
    getItemWWWUrl (absolute) {
      let ret = ''
      if (absolute) {
        ret += this.selectedItem.ExternalWWW
      }
      ret += '/' + this.selectedItem.ProjectPath + 'Files' + '/' + this.selectedItem.FileTypePath + '/_multimedia/' + this.selectedItem._OID + '/' + this.selectedItem.FileName + this.selectedItem.FileExt
      return ret
    },
    humanStorageSize (v) {
      return format.humanStorageSize(parseInt(v))
    },
    async dataLoad () {
      this.dataItems = []
      this.dataItemsByOID = {}
      this.uploaderFields = []
      let [ttt, idata] = await this.$icor.main.multimediaLoad(this.dbitem)
      if (ttt !== '') {
        this.uploaderFields.push({name: '_ttt', value: ttt})
        for (var i = 0; i < idata.length; i++) {
          var item = idata[i]
          this.dataItemsByOID[item._OID] = item
        }
        this.dataItems = idata
      }
      // Toast.create.negative('Wystąpił błąd podczas pobierania listy multimediów. Skontaktuj się z administratorem.')
    },
    async multimediaSave (aoid) {
      let [response] = await this.$icor.main.multimediaSave(this.dbitem, this.dataItemsByOID[aoid])
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania danych multimedium: ' + response.data.errors[0].title})
        return
      }
      if (response.data.status !== 'OK') {
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: ' ' + response.data.status})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Dane multimedium zostały zapamiętane.'})
      this.dataLoad()
    },
    finishUpload () {
      this.$refs.uploader.reset()
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Multimedia zapamiętane.'})
      this.dataLoad() // $$ zmienic na event
    },
    async dropMultimedia (event) {
      if (event.tab.id !== this.tabitem.id) {
        // console.log(`dropMultimedia other event to: ${event.tab.id} tab: ${this.tabitem.id}`)
        return
      }
      var so = ''
      for (var i = 0; i < this.dataItems.length; i++) {
        so += this.dataItems[i]._OID + '|'
      }
      let [response] = await this.$icor.main.multimediaSetPosition(this.dbitem, {lpos: so})
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania kolejności multimediów: ' + response.data.errors[0].info})
        return
      }
      if (response.data.status !== 'OK') {
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: ' ' + response.data.status})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Kolejność multimediów została zmieniona.'})
      // Toast.create.negative('Wystąpił błąd podczas zapamiętywania kolejności multimediów. Skontaktuj się z administratorem.')
    },
    downloadMultimedia (item) {
      let url = this.getItemImageURL(item)
      openURL(url)
    },
    downloadMultimediaThumbnail (item) {
      let url = this.getItemThumbURL(item)
      openURL(url)
    },
    downloadMultimediaOriginal (item) {
      let url = this.getItemOriginalURL(item)
      openURL(url)
    },
    imageEditorMultimedia (item) {
      let url = this.getItemImageURL(item)
      this.$refs.thisImageEditor.modalShow('crop', url)
    },
    copyLinkMultimedia (aoid) {
      // $$
    },
    copyLinkMultimediaThumbnail (aoid) {
      // $$
    },
    copyLinkMultimediaU2U (aoid) {
      // $$
    },
    async doRemoveMultimedia (aoid) {
      let [response] = await this.$icor.main.multimediaRemove(this.dbitem, {foid: aoid})
      var msg
      if (response.data.errors) {
        try {
          msg = 'Wystąpił błąd podczas usuwania multimedium: ' + response.data.errors[0].info
        } catch (e) {
          msg = 'Wystąpił nieokreślony błąd podczas usuwania multimedium. Skontaktuj się z administratorem.'
        }
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: msg})
        return
      }
      if (response.data.status !== 'OK') {
        try {
          msg = ' ' + response.data.status
        } catch (e) {
          msg = 'Wystąpił nieokreślony status podczas usuwania multimedium. Skontaktuj się z administratorem.'
        }
        // console.log(msg)
        this.$root.$emit('notify-message', {type: 'warning', position: 'bottom-right', message: msg})
        return
      }
      this.$root.$emit('notify-message', {type: 'positive', position: 'bottom-right', message: 'Multimedium usunięte.'})
      this.dataLoad() // $$ zmienic na event
      // Toast.create.negative('Wystąpił błąd podczas usuwania multimedium. Skontaktuj się z administratorem.')
    },
    async removeMultimedia (aoid) {
      try {
        await this.$q.dialog({
          message: 'Czy chcesz usunąć ten plik multimedialny?',
          ok: 'Tak',
          cancel: 'Nie'
        })
        this.doRemoveMultimedia(aoid)
      } catch (e) {
      }
    },
    removeMultimediaThumbnail (aoid) {
      // $$
    },
    searchField (field, terms, done) {
      this.$icor.main.multimediaSearchField(this.dbitem, {field: field, value: terms}, done)
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
    searchGroup (terms, done) {
      this.searchField('ItemGroup', terms, done)
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
    inited (viewer) {
      this.$viewer = viewer
    },
    showGallery () {
      this.$viewer.show()
      /*
      const viewer = this.$el.querySelector('.images').$viewer
      viewer.show()
      */
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
        this.uploaderFields = []
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
