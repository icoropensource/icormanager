<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title>
        Kategorie
        <span slot="subtitle">
          wybór przypisanych do materiału kategorii
        </span>
      </q-toolbar-title>
    </q-toolbar>
    <q-list v-show="dataItems.length>0" v-for="kategoria in thisCategories" :key="kategoria">
      <q-list-header>{{kategoria}}</q-list-header>
      <q-item v-for="item in thisGroups(kategoria)" :key="item._oid">
        <q-item-side>
          <q-toggle v-model="item.kchecked" :true-value="1" :false-value="0" @input="categoryChange(item)"/>
        </q-item-side>
        <q-item-main :label="item.grupa" :sublabel="item.rola">
        <!-- {{item.kategoria}} {{item.rola}} {{item.grupa}} {{item.koid}} -->
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script type="text/javascript">
import IQField from 'components/fields/iqField'
import IQFieldDate from 'components/fields/iqFieldDate'
import IQFieldEditor from 'components/fields/iqFieldEditor'
import IQFieldTextArea from 'components/fields/iqFieldTextArea'
import IQFieldSelect from 'components/fields/iqFieldSelect'

export default {
  name: 'CardCategories',
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
      categories: {
        nazwa: ''
      },
      dataLoaded: false,
      dataItems: [],
      dataItemsByOID: {}
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
  computed: {
    thisCategories () {
      let d = {}
      for (var i = 0; i < this.dataItems.length; i++) {
        d[this.dataItems[i].kategoria] = 1
      }
      let l = Object.keys(d).sort()
      return l
    }
  },
  methods: {
    async dataLoad () {
      this.dataItemsByOID = {}
      this.dataItems = await this.$icor.main.categoriesLoad(this.dbitem)
      this.dataLoaded = true
    },
    dataSave () {
      // console.log('categories save')
    },
    thisGroups (kategoria) {
      let l = []
      for (var i = 0; i < this.dataItems.length; i++) {
        if (this.dataItems[i].kategoria === kategoria) {
          l.push(this.dataItems[i])
        }
      }
      return l
    },
    async categoryChange (item) {
      let response = await this.$icor.main.categoriesSave(this.dbitem, item)
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania kategorii: ' + response.data.errors[0].info})
      }
    },
    changeICORTabs (event) {
      if (event.tabitem.id !== this.tabitem.id) {
        return
      }
      if (event.tabname === this.tabname) {
        if (this.dataLoaded) {
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
        this.dataItems = []
        this.dataItemsByOID = {}
        this.dataLoaded = false
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
