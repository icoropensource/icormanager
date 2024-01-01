<template>
  <div>
      <q-toolbar inverted>
        <q-toolbar-title>
          Ustawienia i operacje
          <!--
          <span slot="subtitle">
            lista odnośników do wykorzystania
          </span>
          -->
        </q-toolbar-title>
      </q-toolbar>
      <q-field label="Szerokość lewego panelu">
        <q-slider v-model="leftRows" :step="1" :min="2" :max="9" snap markers />
      </q-field>
      <br>
      <q-field label="Czy wyświetlać przycisk zamykania na zakładkach">
        <q-toggle class="q-ma-xs" v-model="showTabCloseButton" />
      </q-field>
      <br>
      <q-field label="Czy wyświetlać linki w nowych zakładkach">
        <q-toggle class="q-ma-xs" v-model="showLinksInNewTab" />
      </q-field>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CardSettings',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getLeftRows', 'getShow_TabCloseButton', 'getShow_LinksInNewTab', 'getShow_LinksTabSelect']),
    leftRows: {
      get: function () {
        return this.getLeftRows
      },
      set: function (newValue) {
        this.setLeftRows(newValue)
      }
    },
    showTabCloseButton: {
      get: function () {
        return this.getShow_TabCloseButton
      },
      set: function (newValue) {
        this.setShow_TabCloseButton(newValue)
      }
    },
    showLinksInNewTab: {
      get: function () {
        return this.getShow_LinksInNewTab
      },
      set: function (newValue) {
        this.setShow_LinksInNewTab(newValue)
      }
    },
    showLinksTabSelect: {
      get: function () {
        return this.getShow_LinksTabSelect
      },
      set: function (newValue) {
        this.setShow_LinksTabSelect(newValue)
      }
    }
  },
  methods: {
    ...mapMutations(['setLeftRows', 'setShow_TabCloseButton', 'setShow_LinksInNewTab', 'setShow_LinksTabSelect'])
  }
}
</script>

<style scoped>
</style>
