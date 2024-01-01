<template>
  <q-toolbar color="indigo-2" text-color="dark">
    <q-toolbar-title>
      <img :src="imgsrc" v-if="imgsrc!==''" />
      {{wwwdescription}}
      <!-- <span slot="subtitle">
        informacje uzupełniające, parametry i czynności
      </span> -->
    </q-toolbar-title>
    <q-btn flat label="Edycja" v-if="menusEdit.length>0">
      <q-popover>
        <q-list link>
          <q-item v-for="menu in menusEdit" :key="menu.cnt" v-close-overlay @click.native="menuClick(menu)">
            <q-item-side inverted color="primary"><img :src="getICORURL+menu.image"></q-item-side>
            <q-item-main>
              <q-item-tile label>{{menu.label}}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
    <q-btn flat label="Nowe" v-if="menusNew.length>0">
      <q-popover>
        <q-list link>
          <q-item v-for="menu in menusNew" :key="menu.cnt" v-close-overlay @click.native="menuClick(menu)">
            <q-item-side inverted color="primary"><img :src="getICORURL+menu.image"></q-item-side>
            <q-item-main>
              <q-item-tile label>{{menu.label}}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
    <q-btn flat label="Usuń" v-if="menusDelete.length>0">
      <q-popover>
        <q-list link>
          <q-item v-for="menu in menusDelete" :key="menu.cnt" v-close-overlay @click.native="menuClick(menu)">
            <q-item-side inverted color="primary"><img :src="getICORURL+menu.image"></q-item-side>
            <q-item-main>
              <q-item-tile label>{{menu.label}}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
    <q-btn flat label="Akcje" v-if="menusAction.length>0">
      <q-popover>
        <q-list link>
          <q-item v-for="menu in menusAction" :key="menu.cnt" v-close-overlay @click.native="menuClick(menu)">
            <q-item-side inverted color="primary"><img :src="getICORURL+menu.image"></q-item-side>
            <q-item-main>
              <q-item-tile label>{{menu.label}}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
    <q-btn flat dense icon="refresh" @click="$emit('refresh')" />
  </q-toolbar>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'

const pattEdit = new RegExp('^edy', 'i')
const pattNew = new RegExp('^now|^doda', 'i')
const pattDelete = new RegExp('^usu|^skas', 'i')
const pattAction = new RegExp('^now|^doda|^edy|^usu|^skas', 'i')

export default {
  name: 'ICORObjectEditSheetToolbar',
  props: {
    tabitem: {
      type: Object
    },
    sheetinfo: {
      type: Object
    },
    menus: {
      type: Array
    },
    wwwdescription: {
      type: String
    },
    imgsrc: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getICORURL']),
    menusEdit () {
      return this.menus.filter(({label}) => label.match(pattEdit))
    },
    menusNew () {
      return this.menus.filter(({label}) => label.match(pattNew))
    },
    menusDelete () {
      return this.menus.filter(({label}) => label.match(pattDelete))
    },
    menusAction () {
      return this.menus.filter(({label}) => !label.match(pattAction))
    }
  },
  methods: {
    menuExecute (menu) {
      this.$nextTick(function () {
        // let nurl = this.getICORURL + '/icormanager/' + menu.link
        let nurl = '/icormanager/' + menu.link
        // console.log(nurl)
        this.$root.$emit('change-ICOR-URL', {url: nurl, frommenu: true, fromtabid: this.tabitem.id})
      })
    },
    menuClick (menu) {
      if (menu.confirm) {
        this.$q.dialog({
          title: 'Potwierdzenie',
          message: 'Czy na pewno wykonać operację "' + menu.label + '"?',
          ok: 'Tak',
          cancel: 'Nie'
        }).then(() => {
          this.menuExecute(menu)
        }).catch(() => {
        })
      } else {
        this.menuExecute(menu)
      }
    }
  }
}
</script>

<style scoped>
</style>
