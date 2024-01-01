<template>
  <div>
      <q-toolbar inverted>
        <q-toolbar-title>
          Użytkownicy
          <span slot="subtitle">
            lista, wyszukiwanie, operacje
          </span>
        </q-toolbar-title>
        <q-btn flat dense color="primary" @click="fetchData" icon="refresh" v-if="getUser_groups_UserManager"><q-tooltip>odśwież listę</q-tooltip></q-btn>
        <!--
        <q-btn flat dense color="primary" @click="newUser" icon="person_add" v-if="getUser_groups_UserManager"><q-tooltip>nowy użytkownik</q-tooltip></q-btn>
        -->
      </q-toolbar>
      <q-table
        title=""
        :data="items"
        :columns="columns"
        row-key="_oid"
        :pagination.sync="pagination"
        :rows-per-page-options="rowsPerPage"
        :filter="tableFilter"
        dense
        separator="cell"
        no-data-label="brak danych"
        no-results-label="brak wyników"
        loading-label="ładuję dane..."
        rows-per-page-label="rekordów na stronę"
        :selected-rows-label="(rowsNumber)=>`zaznaczono ${rowsNumber} pozycji`"
        :pagination-label="(start,end,total)=>`${start}-${end} z ${total}`"
        v-if="getUser_groups_UserManager"
      >
        <q-tr slot="header" slot-scope="props" :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props" class="q-title bg-indigo-1 text-weight-bolder">
            {{ col.label }}
          </q-th>
        </q-tr>
        <template slot="top-right" slot-scope="props">
          <q-search hide-underline class="col-6" color="secondary" placeholder="szukaj.." clearable v-model="tableFilter" />
        </template>
        <q-td slot="body-cell-created" slot-scope="props" :props="props">
          <small>{{getDateAsStr(props.value)}}</small>
        </q-td>
        <q-td slot="body-cell-UserName" slot-scope="props" :props="props">
          <strong>{{props.value}}</strong>
        </q-td>
        <q-td slot="body-cell-Description" slot-scope="props" :props="props">
          <small>{{props.value}}</small>
        </q-td>
        <q-td slot="body-cell-VCFEMail" slot-scope="props" :props="props">
          <small>{{props.value}}</small>
        </q-td>
        <q-td slot="body-cell-VCFPhone" slot-scope="props" :props="props">
          {{props.value}}
        </q-td>
        <q-td slot="body-cell-AccountDisabled" slot-scope="props" :props="props">
          <q-icon name="vpn_key" color="red" size="12pt" v-if="props.row.AccountDisabled"></q-icon>
          <q-icon name="vpn_key" color="green" size="12pt" v-else></q-icon>
          <q-icon name="public" color="red" size="12pt" v-if="props.row.WWWDisabled"></q-icon>
          <q-icon name="public" color="green" size="12pt" v-else></q-icon>
        </q-td>
        <q-td slot="body-cell-status" slot-scope="props" :props="props">
          <q-chip dense class="on-right" color="positive" v-if="props.value==='Z'">zatwierdzony</q-chip>
          <q-chip dense class="on-right" color="negative" v-else-if="props.value==='B'">zablokowany</q-chip>
          <q-chip dense class="on-right" color="faded" v-else-if="props.value==='U'">usunięty</q-chip>
          <q-chip dense class="on-right" color="blue-1" v-else-if="props.value==='N'">nowy</q-chip>
          <q-chip dense class="on-right" color="blue-2" v-else-if="props.value==='N1'">dane rejestracyjne</q-chip>
          <q-chip dense class="on-right" color="blue-3" v-else-if="props.value==='N2'">do potwierdzenia</q-chip>
          <q-chip dense class="on-right" color="blue-4" v-else-if="props.value==='N3'">wysłana aktywacja</q-chip>
          <q-chip dense class="on-right" color="blue-5" v-else-if="props.value==='N4'">wyrażone zgody</q-chip>
          <q-chip dense class="on-right" color="red-5" v-else-if="props.value==='E1'">błąd w rejestracji</q-chip>
          <q-chip dense class="on-right" color="red-5" v-else-if="props.value==='E2'">błąd wysyłania linku rejestracyjnego przez email</q-chip>
          <q-chip dense class="on-right" color="red-5" v-else-if="props.value==='E3'">błąd wysyłania hasła przez SMS</q-chip>
          <q-chip dense class="on-right" color="orange-8" v-else>{{props.value}}</q-chip>
        </q-td>
        <q-td slot="body-cell-_oid" slot-scope="props" :props="props">
          <q-btn-dropdown @click="itemAction(props.row,false)" size="xs" rounded no-wrap color="indigo-7">
            <q-list link>
              <q-list-header inset>{{currentTitle}}</q-list-header>
              <q-item v-for="action in currentActions" :key="action.label" v-close-overlay @click.native="action.handler">
                <q-item-side :icon="action.icon" inverted :color="action.color" />
                <q-item-main>
                  <q-item-tile label>{{action.label}}</q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </q-table>
      <q-action-sheet
        v-model="actionsVisible"
        :title="currentTitle"
        :actions="currentActions"
      />
      <userAddUpdate ref="thisUserAddUpdate" :mode="mode"></userAddUpdate>
      <userPasswordChange ref="thisUserPasswordChange" :mode="mode"></userPasswordChange>
      <userSendSMS ref="thisUserSendSMS" :mode="mode"></userSendSMS>
      <userSendEmail ref="thisUserSendEmail" :mode="mode"></userSendEmail>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import userAddUpdate from 'components/user/userAddUpdate'
import userPasswordChange from 'components/user/userPasswordChange'
import userSendSMS from 'components/user/userSendSMS'
import userSendEmail from 'components/user/userSendEmail'

const CLASSES_System_User = 309

export default {
  name: 'TableUsers',
  props: {
    id: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'user' // user, admin
    }
  },
  components: {
    userAddUpdate,
    userPasswordChange,
    userSendSMS,
    userSendEmail
  },
  data () {
    return {
      items: [],
      tableFilter: '',
      pagination: {page: 1, rowsPerPage: 15, _sortBy: null, descending: false},
      rowsPerPage: [5, 10, 15, 20, 25, 50, 100],
      columns: [
        // '_oid','vcfid','groups',
        // user
        // classes, styles - from: https://github.com/quasarframework/quasar/issues/2248
        {name: 'AccountDisabled', field: 'AccountDisabled', label: '', required: false, align: 'left', sortable: false},
        // {name: 'WWWDisabled', field: 'WWWDisabled', label: 'dostęp wyłączony', required: false, align: 'left', sortable: false},
        {name: 'UserName', field: 'UserName', label: 'użytkownik', required: false, align: 'left', sortable: true},
        {name: 'VCFLastName', field: 'VCFLastName', label: 'nazwisko', required: false, align: 'left', sortable: true},
        {name: 'VCFFirstName', field: 'VCFFirstName', label: 'imię', required: false, align: 'left', sortable: true},
        {name: 'VCFEMail', field: 'VCFEMail', label: 'email', required: false, align: 'left', sortable: true},
        {name: 'VCFPhone', field: 'VCFPhone', label: 'telefon', required: false, align: 'left', sortable: true},
        {name: 'Description', field: 'Description', label: 'opis', required: false, align: 'left', sortable: true},
        {name: '_oid', field: '_oid', label: '', required: false, align: 'left', sortable: false}
      ],
      actions: [
        {
          label: 'wyślij email',
          icon: 'email',
          color: 'primary',
          vif: this.vifEMail,
          handler: this.userEMail
        },
        {
          label: 'wyślij SMS',
          icon: 'phone_android',
          color: 'primary',
          vif: this.vifPhone,
          handler: this.userPhone
        },
        {
          label: 'edycja danych użytkownika',
          icon: 'edit',
          color: 'primary',
          handler: this.userEdit
        },
        {
          label: 'zmiana hasła użytkownika',
          icon: 'lock',
          color: 'primary',
          handler: this.userPassword
        },
        {
          label: 'parametry użytkownika',
          icon: 'person',
          color: 'primary',
          handler: this.userParameters
        } // ,
        /*
        {
          label: 'zablokuj użytkownika',
          icon: 'block',
          color: 'warning',
          vif: [this.vifOperatorAdminMPAdmin, this.vifBlockAllowed],
          handler: this.userBlock
        },
        {
          label: 'odblokuj użytkownika',
          icon: 'lock_open',
          color: 'positive',
          vif: [this.vifOperatorAdminMPAdmin, this.vifUnBlockAllowed],
          handler: this.userUnBlock
        }
        */
      ],
      actionsVisible: false,
      currentActions: [],
      currentRow: {},
      currentTitle: ''
    }
  },
  computed: {
    ...mapGetters([
      'getUser_User', 'getUser_groups_UserManager'
    ])
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getDateAsStr (value) {
      return this.$icor.data.getDateAsStr(value)
    },
    getNumAsMoney (value) {
      return this.$icor.data.getNumAsMoney(value)
    },
    vifEMail (item) {
      if (item.VCFEMail && (item.VCFEMail.length > 5)) {
        return true
      }
      return false
    },
    vifPhone (item) {
      if (item.VCFPhone && (item.VCFPhone.length > 8)) {
        return true
      }
      return false
    },
    vifBlockAllowed (item) {
      if (item.AccountDisabled === true) {
        return true
      }
      return false
    },
    vifUnBlockAllowed (item) {
      if (item.AccountDisabled === false) {
        return true
      }
      return false
    },
    vifNone (item) {
      return false
    },
    vgetItemActionTitle (item) {
      let ret = item.UserName
      if (item.VCFLastName) {
        ret += ' (' + item.VCFFirstName + ' ' + item.VCFLastName + ')'
      } else if (item.Description) {
        ret += ' (' + item.Description + ')'
      }
      return ret
    },
    itemAction (item, showActions) {
      this.currentRow = item
      this.currentTitle = this.vgetItemActionTitle(item)
      this.currentActions = this.actions.filter(action => {
        if (!action.vif) {
          return true
        }
        if (typeof action.vif === 'function') {
          return action.vif(item)
        }
        for (var vif of action.vif) {
          if (!vif(item)) {
            return false
          }
        }
        return true
      })
      if (showActions) {
        if (this.currentActions.length > 0) {
          this.actionsVisible = true
        }
      }
    },
    async fetchData () {
      this.items = await this.$icor.main.getUsersByAdmin()
    },
    async newUser () {
      console.log('newUser:', this.getUser_User)
      this.$refs.thisUserAddUpdate.modalShow('new', {})
    },
    async userEdit () {
      await this.$refs.thisUserAddUpdate.modalShow('update', this.currentRow, true)
    },
    async userPassword () {
      await this.$refs.thisUserPasswordChange.modalShow('admin', this.currentRow, false)
    },
    async userEMail () {
      await this.$refs.thisUserSendEmail.modalShow('admin', this.currentRow, false)
    },
    objectClick (value) {
      this.$nextTick(function () {
        let nurl = this.getICORURL + '/icormanager/icormain.asp?jobtype=objectedit&CID=' + CLASSES_System_User + '&OID=' + value._oid
        console.log(nurl)
        this.$root.$emit('change-ICOR-URL', {url: nurl})
      })
    },
    userParameters () {
      this.objectClick(this.currentRow)
    },
    userBlock () {
      this.currentRow.status = 'B'
      this.$q.notify({message: 'zablokowanie użytkownika', type: 'positive', position: 'bottom-right'})
    },
    userUnBlock () {
      this.currentRow.status = 'Z'
      this.$q.notify({message: 'odblokowanie użytkownika', type: 'positive', position: 'bottom-right'})
    },
    userRemove () {
      this.$q.notify({message: 'usuwanie użytkownika', type: 'positive', position: 'bottom-right'})
    },
    userPhone () {
      this.$refs.thisUserSendSMS.modalShow('', this.currentRow)
    }
  }
}
</script>

<style scoped>
</style>
