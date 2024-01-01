<template>
  <q-page padding>
    <div class="row items-center justify-center" style="min-height: 60vh;">
      <q-card style="min-width: 30vw;">
        <q-card-title class="text-center" >
          <img src="statics/img/logo_icor_t.gif" v-if="getAppMode_ICOR">
        </q-card-title>
        <q-card-separator />
        <q-card-main>
          <i-q-field name="username" autofocus label="nazwa użytkownika" v-model="username" issearchable :minSearchCharacters="0" @search="searchUsername" @keyup.enter.native="doLogin"></i-q-field>
          <i-q-field name="password" label="hasło" type="password" v-model="password" @keyup.enter.native="doLogin"></i-q-field>
          <br>
          <q-btn color="primary" icon="person" @click="doLogin()">loguj</q-btn>
        </q-card-main>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import IQField from 'components/fields/iqField'

export default {
  name: 'Login',
  components: {
    IQField
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['getAppMode_ICOR', 'getStartPage']),
    logins: {
      get: function () {
        let ret = []
        let logins = {}
        if (this.$q.localStorage.has('logins')) {
          logins = this.$q.localStorage.get.item('logins')
        }
        for (var username in logins) {
          var d = {
            value: username,
            label: username,
            sublabel: 'ostatnie logowanie: ' + logins[username].lastdate,
            icon: 'person',
            stamp: 'logowania: ' + logins[username].cnt
          }
          ret.push(d)
        }
        ret.sort(function (a, b) {
          return a.value.localeCompare(b.value)
        })
        return ret
      },
      set: function (username) {
        let logins = {}
        if (this.$q.localStorage.has('logins')) {
          logins = this.$q.localStorage.get.item('logins')
        }
        let d = logins[username] || { cnt: 0 }
        d['username'] = username
        d['lastdate'] = this.$icor.data.getCurrentDateTimeAsStr()
        d['cnt'] = 1 + d['cnt']
        logins[username] = d
        this.$q.localStorage.set('logins', logins)
      }
    }
  },
  created () {
    this.$icor.main.appSessionCheck()
  },
  methods: {
    ...mapMutations(['setUser_UserName', 'setUser_FirstName', 'setUser_LastName', 'setUser_Description', 'setUser_UID', 'setUser_EMail', 'setUser_Avatar']),

    loginRedirect () {
      let url = this.$route.query.redirect || this.getStartPage
      // console.log('redirect:' + url)
      this.$router.replace(url)
      this.$nextTick(function () {
        this.$root.$emit('login')
      })
    },
    async doLogin () {
      let [status, info] = await this.$icor.main.login(this.username, this.password)
      if (status === 0) {
        this.logins = this.username
        return this.loginRedirect()
      } else {
        this.$q.notify({message: info, type: 'negative', position: 'bottom-right'})
      }
    },
    searchUsername (terms, done) {
      done(this.logins)
    }
  }
}
</script>

<style scoped>
.loginlogo {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-size:32pt;
}
</style>
