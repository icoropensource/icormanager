<template>
  <q-modal ref="thisModal" v-model="modalOpened" :content-css="{minWidth: '96vw', minHeight: '96vh'}">
    <div style="width:100%;height:90vh;">
      <tui-image-editor ref="tuiImageEditor" :include-ui="tuiUseDefaultUI" :options="tuiOptions"></tui-image-editor>
    </div>
  </q-modal>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
// <link rel="stylesheet" href="./lib/tui-image-editor.css">
// Load Style Code
import 'tui-image-editor/dist/svg/icon-a.svg'
import 'tui-image-editor/dist/svg/icon-b.svg'
import 'tui-image-editor/dist/svg/icon-c.svg'
import 'tui-image-editor/dist/svg/icon-d.svg'
import 'tui-image-editor/dist/tui-image-editor.css'
import {ImageEditor} from '@toast-ui/vue-image-editor'

var locale_pl_PL = {
  'Crop': 'przytnij',
  'Delete-all': 'skasuj wszystko',
  'Load': 'wgraj',
  'Download': 'pobierz',
  '_': '_'
}

export default {
  name: 'IQImageEditor',
  props: [
    'mode' // operator, admin, manager
  ],
  components: {
    'tui-image-editor': ImageEditor
  },
  data () {
    let dv = {
      modalOpened: false,
      action: '', // new, update
      url: '',
      tuiUseDefaultUI: true,
      tuiOptions: {
        usageStatistics: false,
        // cssMaxWidth: 800,
        // cssMaxHeight: 600,
        includeUI: {
          initMenu: 'filter',
          locale: locale_pl_PL,
          uiSize: {
            width: '100%',
            height: '100%'
          },
          menuBarPosition: 'bottom'
        }
      }
    }
    return dv
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
  },
  methods: {
    modalShow (action, url) {
      this.action = action
      this.url = url
      this.modalOpened = true
      // this.$refs.tuiImageEditor.invoke('loadImageFromURL', url, 'Obrazek..')
    },
    cancelData () {
      this.modalOpened = false
    }
  }
}
</script>

<style scoped>
</style>
