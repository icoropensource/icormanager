<template>
  <q-toolbar>
    <q-ajax-bar color="#80cbc4" />
    <q-btn flat icon="arrow_back" @click="$router.push('/')" v-if="$router.currentRoute.meta.backButton"/>
    <q-btn flat icon="menu" class="hide-on-drawer-visible" @click="openLeftDrawer()" v-if="getAppMode_ICOR" />
    <q-toolbar-title v-if="getAppMode_ICOR">
      ICOR Manager
      <span slot="subtitle">{{getUser_User.firstname}} {{getUser_User.lastname}} ({{getUser_User.username}})</span>
    </q-toolbar-title>
    <!--
    <q-btn flat icon="help_outline" @click="toggleHelp()" v-if="getAppMode_ICOR && getShowPane_ICOR">
      <q-tooltip anchor="center right" self="center left">wyświetl pomoc</q-tooltip>
    </q-btn>
    -->
    <q-btn flat icon="keyboard_backspace" @click="clickLastVisitHistory()" v-if="getAppMode_ICOR && getShowPane_ICOR">
      <q-tooltip anchor="center right" self="center left">ostatnia wyszukiwarka</q-tooltip>
    </q-btn>
    <q-btn flat icon="refresh" @click="refresheActiveTab()" v-if="getAppMode_ICOR && getShowPane_ICOR">
      <q-tooltip anchor="center right" self="center left">odśwież aktywną zakładkę</q-tooltip>
    </q-btn>
    <q-btn flat icon="add" @click="addNewTab()" v-if="getAppMode_ICOR && getShowPane_ICOR">
      <q-tooltip anchor="center right" self="center left">dodaj nową zakładkę</q-tooltip>
    </q-btn>
    <q-btn flat icon="close" @click="closeActiveTab()" v-if="getAppMode_ICOR && getShowPane_ICOR">
      <q-tooltip anchor="center right" self="center left">zamknij aktywną zakładkę</q-tooltip>
    </q-btn>
    <q-btn flat icon="search" @click="doSearch()" v-if="getAppMode_ICOR && getShowPane_ICOR && getUser_groups_ApplicationDevelopers">
      <q-tooltip anchor="center right" self="center left">szukaj</q-tooltip>
    </q-btn>
    <q-btn flat icon="find_in_page" @click="doSearchFiles()" v-if="getAppMode_ICOR && getShowPane_ICOR">
      <q-tooltip anchor="center right" self="center left">szukaj wśród plików</q-tooltip>
    </q-btn>
    <q-btn flat icon="flag" v-if="getAppMode_ICOR && getShowPane_ICOR">
      <q-popover>
        <q-list separator>
          <q-item v-for="msg in getLastMessages" :key="msg.id">
            <q-item-side icon="done" color="positive" v-if="msg.type==='positive'"/>
            <q-item-side icon="error" color="negative" v-if="msg.type==='negative'"/>
            <q-item-side icon="warning" color="warning" v-if="msg.type==='warning'"/>
            <q-item-side icon="info" color="info" v-if="msg.type==='info'"/>
            <q-item-main>
              <q-item-tile label><small>{{msg.datetime}}</small></q-item-tile>
              <q-item-tile sublabel v-html="msg.message"></q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
    <q-btn flat icon="account_circle">
      <q-popover>
        <q-list>
          <q-item v-if="isLoggedIn">
            <q-item-side icon="person" color="primary" />
            <q-item-main>
              <q-item-tile label>{{getUser_User.firstname+' '+getUser_User.lastname}}</q-item-tile>
              <q-item-tile sublabel>{{getUser_User.username}}</q-item-tile>
            </q-item-main>
          </q-item>
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
          <q-item v-close-overlay link @click.native="doSettings" v-if="isLoggedIn">
            <q-item-side icon="settings" />
            <q-item-main label="ustawienia" />
          </q-item>
          <q-item v-close-overlay link @click.native="doUserSettings" v-if="isLoggedIn">
            <q-item-side icon="account_box" />
            <q-item-main label="moje konto" />
          </q-item>
          <q-item v-close-overlay link @click.native="doLogout" v-if="isLoggedIn">
            <q-item-side icon="exit_to_app" />
            <q-item-main label="wyloguj" />
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
    <q-btn flat icon="menu" @click="openRightDrawer()" v-if="getAppMode_ICOR" />
  </q-toolbar>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getAppMode_ICOR', 'getShowPane_ICOR', 'getUser_User', 'isLoggedIn', 'getShow_Help', 'getUser_groups_ApplicationDevelopers', 'getNotifyMessages']),
    getLastMessages () {
      return this.getNotifyMessages.slice(0, 15)
    }
  },
  methods: {
    ...mapMutations(['setShow_Help']),

    openLeftDrawer () {
      this.$root.$emit('left-drawer-toggle')
    },
    openRightDrawer () {
      this.$root.$emit('right-drawer-toggle')
    },
    clickLastVisitHistory () {
      this.$root.$emit('click-LastVisitHistory')
    },
    addNewTab () {
      this.$root.$emit('click-AddNewTab')
      this.$root.$emit('notify-message', {message: 'nowa zakładka', type: 'positive', position: 'bottom-right'})
    },
    doSearch () {
      this.$root.$emit('tab-setNewTabRoute', {
        routetype: '/app/search/',
        routeid: '',
        data: {
          title: 'Szukaj',
          contentSubtitle: 'w serwisie i aplikacjach'
        }
      })
    },
    doSearchFiles () {
      this.$root.$emit('tab-setNewTabRoute', {
        routetype: '/app/searchfiles/',
        routeid: '',
        data: {
          title: 'Szukaj plików',
          contentSubtitle: 'w serwisie i aplikacjach'
        }
      })
    },
    closeActiveTab () {
      this.$root.$emit('click-CloseActiveTab')
    },
    refresheActiveTab () {
      this.$root.$emit('click-RefreshActiveTab')
    },
    doLogout (event) {
      this.$root.$emit('logout')
    },
    doUserSettings (event) {
      this.$root.$emit('tab-setNewTabRoute', {
        routetype: '/user/settings/',
        routeid: '',
        data: {
          title: 'Dane użytkownika',
          contentSubtitle: 'informacje i zmiana ustawień'
        }
      })
    },
    doSettings (event) {
      this.$root.$emit('tab-setNewTabRoute', {
        routetype: '/app/settings/',
        routeid: '',
        data: {
          title: 'Ustawienia i operacje',
          contentSubtitle: 'zmiana ustawień aplikacji'
        }
      })
    },
    toggleHelp () {
      // this.setShow_Help(!this.getShow_Help)
      this.setShow_Help(true)
    }
  }
}
</script>

<style scoped>
/*
  .toolbar{
    min-height: 60px;
  }
  .right-items a{
    margin-right: 10px;
  }
*/
</style>
