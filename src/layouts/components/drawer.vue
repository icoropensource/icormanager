<template>
   <q-layout-drawer side="left" v-model="drawerOpen" overlay no-swipe-open>
     <q-scroll-area style="width: 100%; height: 100%">
        <q-list no-border inset-separator v-if="getAppMode_ICOR">
          <!--<q-list-header><span class="loginlogo">ICOR</span></q-list-header>-->
          <q-collapsible icon="person" :label="getUser_User.firstname+' '+getUser_User.lastname" :sublabel="getUser_User.username" v-if="isLoggedIn">
            <!--
              <q-item multiline v-if="isLoggedIn">
              <q-item-side icon="person" color="primary" />
              <q-item-main inset>
                <q-item-tile label>{{getUser_User.firstname}} {{getUser_User.lastname}}<br></q-item-tile>
                <q-item-tile sublabel>{{getUser_User.username}}</q-item-tile>
              </q-item-main>
            </q-item>
            -->
            <q-item v-if="isLoggedIn && getUser_User.phone">
              <q-item-side icon="phone" color="primary" />
              <q-item-main>
                <q-item-tile label>{{getUser_User.phone}}</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item v-if="isLoggedIn && getUser_User.email">
              <q-item-side icon="mail" color="primary" />
              <q-item-main>
                <q-item-tile label>{{getUser_User.email}}</q-item-tile>
              </q-item-main>
            </q-item>
          </q-collapsible>
          <q-item-separator inset  v-if="isLoggedIn"/>
          <q-item link @click.native="$router.push('/icor')" v-if="isLoggedIn">
            <q-item-side icon="device_hub" />
            <q-item-main label="Panel operatora" sublabel="wprowadzanie danych, zarządzanie" />
          </q-item>
          <q-item link @click.native="$router.push('/login')" v-if="!isLoggedIn">
            <q-item-side icon="input" />
            <q-item-main label="Zaloguj" sublabel="Rozpocznij pracę" />
          </q-item>
          <q-item link @click.native="doLogout" v-if="isLoggedIn">
            <q-item-side icon="exit_to_app" />
            <q-item-main label="Wyloguj" sublabel="zakończ bieżącą sesję i przejdź do strony logowania" />
          </q-item>
        </q-list>

     </q-scroll-area>
   </q-layout-drawer>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import { openURL } from 'quasar'

export default {
  data () {
    return {
      drawerOpen: false
    }
  },
  mounted () {
    this.$root.$on('left-drawer-toggle', this.drawerToggle)
  },
  beforeDestroy () {
    this.$root.$off('left-drawer-toggle', this.drawerToggle)
  },
  computed: {
    ...mapGetters(['getAppMode_Demo', 'getAppMode_ICOR', 'getUser_User', 'isLoggedIn'])
  },
  methods: {
    openURL,
    drawerToggle () {
      this.drawerOpen = !this.drawerOpen
    },
    doICOROperator (event) {
      this.$store.dispatch('showPaneICOR')
    },
    doFilesManager (event) {
      this.$root.$emit('open-filemanager')
    },
    doLogout (event) {
      this.$root.$emit('logout')
    }
  }
}
</script>

<style scoped>
.loginlogo {
  font-family: 'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size:32pt;
}
</style>
