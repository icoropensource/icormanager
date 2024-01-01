<template>
  <q-layout-drawer side="right" overlay v-model="drawerOpen">
    <q-scroll-area style="width: 100%; height: 100%">
      <q-list no-border link dense inset-separator v-if="getAppMode_ICOR">
        <q-collapsible icon="assignment" label="Zadania">
          <q-item link @click.native="setNewTabRoute('/stats/','9Working')"><q-item-side icon="assignment" /><q-item-main label="Lista zadań" sublabel="w trakcie pracy" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','9Ready')"><q-item-side icon="assignment" /><q-item-main label="Lista zadań" sublabel="oczekujące" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','9Processing')"><q-item-side icon="assignment" /><q-item-main label="Lista zadań" sublabel="przed uruchomieniem" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','9Deleted')"><q-item-side icon="assignment" /><q-item-main label="Lista zadań" sublabel="zakończone" /><q-item-side right icon="alarm" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','9')"><q-item-side icon="assignment" /><q-item-main label="Lista zadań" sublabel="wszystkie"/><q-item-side right icon="alarm" /></q-item>
        </q-collapsible>
        <q-collapsible icon="group" label="Sesje">
          <q-item link @click.native="setNewTabRoute('/stats/','10')"><q-item-side icon="group" /><q-item-main label="Aktywne sesje" sublabel="wszystkie" /></q-item>
        </q-collapsible>
        <q-collapsible icon="folder_open" label="Pliki">
          <q-item link @click.native="setNewTabRoute('/stats/','6')"><q-item-side icon="folder_open" /><q-item-main label="Czas i liczba zapisów" sublabel="" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','7')"><q-item-side icon="folder_open" /><q-item-main label="Czas i liczba zapisów" sublabel="plików skopiowanych" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','8')"><q-item-side icon="folder_open" /><q-item-main label="Czas i liczba generowań plików" sublabel="wg ścieżek" /><q-item-side right icon="alarm" /></q-item>
        </q-collapsible>
        <q-collapsible icon="content_copy" label="Rozdziały">
          <q-item link @click.native="setNewTabRoute('/stats/','1')"><q-item-side icon="content_copy" /><q-item-main label="Czas i liczba generowań" sublabel="na użytkownika" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','2')"><q-item-side icon="content_copy" /><q-item-main label="Czas i liczba generowań" sublabel="" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','3')"><q-item-side icon="content_copy" /><q-item-main label="Czas i liczba generowań" sublabel="z plikami" /><q-item-side right icon="alarm" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','4')"><q-item-side icon="content_copy" /><q-item-main label="Statusy rozdziałów" sublabel="" /><q-item-side right icon="alarm" /></q-item>
        </q-collapsible>
        <q-collapsible icon="cloud_download" label="Serwisy">
          <q-item link @click.native="setNewTabRoute('/stats/','5')"><q-item-side icon="cloud_download" /><q-item-main label="Czas i liczba" sublabel="" /></q-item>
        </q-collapsible>
        <q-collapsible icon="storage" label="Bazy danych">
          <q-item link @click.native="setNewTabRoute('/stats/','11')"><q-item-side icon="storage" /><q-item-main label="Lista aktywnych zadań" sublabel="" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','14')"><q-item-side icon="storage" /><q-item-main label="Rozmiar bazy danych" sublabel="" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','15')"><q-item-side icon="storage" /><q-item-main label="Statystyki IO dla tabel" sublabel="" /></q-item>
          <q-item link @click.native="setNewTabRoute('/stats/','16')"><q-item-side icon="storage" /><q-item-main label="Statystyki dla tabel" sublabel="" /></q-item>
        </q-collapsible>
        <q-collapsible icon="dns" label="System">
          <q-item link @click.native="setNewTabRoute('/stats/','12')"><q-item-side icon="dns" /><q-item-main label="Wolne miejsce na dyskach" sublabel="" /></q-item>
        </q-collapsible>
        <q-collapsible icon="contacts" label="Użytkownicy">
          <q-item link @click.native="usersSearch()"><q-item-side icon="contacts" /><q-item-main label="Wyszukiwarka użytkowników" sublabel="" /></q-item>
        </q-collapsible>
      </q-list>
    </q-scroll-area>
  </q-layout-drawer>

</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import statsMeta from '../../router/routerStats'

export default {
  data () {
    return {
      drawerOpen: false
    }
  },
  mounted () {
    this.$root.$on('right-drawer-toggle', this.drawerToggle)
  },
  beforeDestroy () {
    this.$root.$off('right-drawer-toggle', this.drawerToggle)
  },
  computed: {
    ...mapGetters(['getLayoutNeeded', 'getAppMode_ICOR'])
  },
  methods: {
    drawerToggle () {
      this.drawerOpen = !this.drawerOpen
    },
    setNewTabRoute (routetype, routeitem) {
      this.$root.$emit('tab-setNewTabRoute', {
        routetype: routetype,
        routeid: routeitem,
        data: statsMeta.meta[routeitem]
      })
    },
    usersSearch () {
      this.$root.$emit('tab-setNewTabRoute', {
        routetype: '/users/search/',
        routeid: '',
        data: {
          title: 'Użytkownicy',
          contentSubtitle: 'Wyszukiwarka użytkowników'
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
