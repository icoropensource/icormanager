<template>
  <q-layout ref="layout" view="lhr LpR lfr">
    <q-layout-header>
      <toolbar></toolbar>
    </q-layout-header>
    <drawer ref="leftDrawer"></drawer>
    <drawer-right ref="rightDrawer"></drawer-right>
    <q-page-container>
      <q-page v-if="getShowPane_ICOR">
        <manager></manager>
      </q-page>
      <!--
      <q-page v-if="getShowPane_Content">
        <keep-alive>
          <router-view />
        </keep-alive>
      </q-page>
      -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapGetters } from 'vuex'
import toolbar from './components/toolbar.vue'
import drawer from './components/drawer.vue'
import drawerRight from './components/drawerRight.vue'
import manager from '../pages/icor/manager/manager.vue'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: false,
      title: 'ICOR'
    }
  },
  meta () {
    return {
      title: this.title
    }
  },
  components: {
    toolbar,
    drawer,
    drawerRight,
    manager
  },
  computed: {
    ...mapGetters(['getMobileMode', 'getShowPane_ICOR', 'getShowPane_Content', 'isLoggedIn', 'getUser_UserName'])
  },
  async mounted () {
    let isloggedin = await this.$icor.main.checkSession()
    this.setTitle()
    if (!isloggedin) {
      this.$router.push('/login')
    } else {
      this.$root.$emit('default-init')
    }
  },
  updated () {
    this.setTitle()
    if (!this.isLoggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    openURL,
    setTitle () {
      if (this.isLoggedIn) {
        this.title = 'ICOR [' + this.getUser_UserName + ']'
      } else {
        this.title = 'ICOR'
      }
    }
  }
}
</script>

<style>
</style>
