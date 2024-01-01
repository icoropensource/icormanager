<template>
  <div>
    <q-toolbar inverted>
      <q-toolbar-title>
        Tabele
        <span slot="subtitle">
          wybór przypisanych do materiału tabel/wyszukiwarek
        </span>
      </q-toolbar-title>
    </q-toolbar>

    <q-list v-show="dataItems.length>0">
      <q-item v-for="item in dataItems" :key="item.oid">
        <q-item-side>
          <q-toggle v-model="item.checked" @input="tableChange(item)"/>
        </q-item-side>
        <q-item-main :label="item.name" :sublabel="item.table">
        </q-item-main>
      </q-item>
    </q-list>

  </div>
</template>

<script type="text/javascript">

export default {
  name: 'CardTables',
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
      dataLoaded: false,
      dataItems: []
    }
  },
  created () {
    this.$root.$on('change-ICOR-tabs', this.changeICORTabs)
  },
  beforeDestroy () {
    this.$root.$off('change-ICOR-tabs', this.changeICORTabs)
  },
  methods: {
    async dataLoad () {
      console.log('loading tables:', this.dbitem)
      this.dataItems = await this.$icor.main.tablesLoad(this.dbitem)
      this.dataLoaded = true
    },
    async tableChange (item) {
      let response = await this.$icor.main.tablesSave(this.dbitem, item)
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania tabeli: ' + response.data.errors[0].info})
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
        this.dataLoaded = false
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
