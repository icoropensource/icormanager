<template>
   <div>
      <q-btn-group rounded>
        <q-btn color="primary" rounded @click="fetchData"><q-icon name="refresh" /> odśwież listę</q-btn>
      </q-btn-group>
      <q-table
        title=""
        :data="items"
        :columns="columns"
        row-key="ooid"
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
      >
        <template slot="top-right" slot-scope="props">
          <q-search hide-underline class="col-6" color="secondary" placeholder="szukaj.." v-model="tableFilter" />
        </template>
        <q-td slot="body-cell-odatetime" slot-scope="props" :props="props">
          <small>{{getDateTimeAsStr(props.value)}}</small>
        </q-td>
        <q-td slot="body-cell-odatetime2" slot-scope="props" :props="props">
          <small>{{getDateTimeAsStr(props.value)}}</small>
        </q-td>
        <q-td slot="body-cell-okind" slot-scope="props" :props="props">
          <!--
          'phone-change'
          'email-change'
          'cart-add'
          'cart-update'
          'cart-checkmissing'
          'cart-uncheckmissing'
          'cart-delete'
          'cart-submit'
          'cart-order'
          'cart-unsubmit'
          'template',
          'user-newoperator',
          'email'
          -->
          <q-chip dense square class="on-right" color="blue-4" icon="email" v-if="props.value==='email-change'">{{props.value}}</q-chip>
          <q-chip dense square class="on-right" color="blue-5" icon="phone_android" v-else-if="props.value==='email'">{{props.value}}</q-chip>
          <q-chip dense square class="on-right" color="cyan-5" icon="phone_android" v-else-if="props.value==='phone-change'">{{props.value}}</q-chip>
          <q-chip dense square class="on-right" color="purple-4" icon="phone_android" v-else-if="props.value==='user-newoperator'">{{props.value}}</q-chip>
          <q-chip dense square class="on-right" color="orange-8" v-else>{{props.value}}</q-chip>
        </q-td>
        <q-td slot="body-cell-ovalue" slot-scope="props" :props="props">
          <small>{{props.value}}</small>
        </q-td>
        <q-td slot="body-cell-oinfo" slot-scope="props" :props="props">
          <small>{{props.value}}</small>
        </q-td>
        <q-td slot="body-cell-ostatus" slot-scope="props" :props="props">
          <q-chip dense class="on-right" color="positive" v-if="props.value==='N'">{{props.value}}</q-chip>
          <q-chip dense class="on-right" color="negative" v-else-if="props.value==='B'">{{props.value}}</q-chip>
          <q-chip dense class="on-right" color="positive" v-else-if="props.value===''">-</q-chip>
          <q-chip dense class="on-right" color="primary" v-else>{{props.value}}</q-chip>
        </q-td>

        <q-td slot="body-cell-created" slot-scope="props" :props="props">
          <small>{{getDateAsStr(props.value)}}</small>
        </q-td>
        <q-td slot="body-cell-vcfemail" slot-scope="props" :props="props">
          <small>{{props.value}}</small>
        </q-td>
        <q-td slot="body-cell-vcfphone" slot-scope="props" :props="props">
          <small>{{props.value}}</small>
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
          <q-chip dense class="on-right" color="orange-8" v-else>{{props.value}}</q-chip>
        </q-td>
        <q-td slot="body-cell-_oid" slot-scope="props" :props="props">
          <q-btn @click="itemAction(props.row)" size="xs" rounded icon-right="expand_more" no-wrap color="primary" v-if="getAuth_operator">
            akcje
          </q-btn>
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

export default {
  name: 'TableOperations',
  props: {
    mode: {
      type: String,
      default: 'user' // user, operator, admin, manager
    }
  },
  components: {
    userAddUpdate,
    userPasswordChange,
    userSendSMS,
    userSendEmail
  },
  data () {
    var lcolumns
    let operations_columns = [
      {name: 'odatetime', field: 'odatetime', label: 'data i czas', required: false, align: 'right', sortable: true},
      {name: 'okind', field: 'okind', label: 'rodzaj', required: false, align: 'left', sortable: true},
      {name: 'otype', field: 'otype', label: 'typ', required: false, align: 'left', sortable: true},
      {name: 'ovalue', field: 'ovalue', label: 'wartość', required: false, align: 'left', sortable: true},
      {name: 'oinfo', field: 'oinfo', label: 'info', required: false, align: 'left', sortable: true},
      {name: 'ooidref', field: 'ooidref', label: 'oidref', required: false, align: 'left', sortable: true},
      {name: 'ostatus', field: 'ostatus', label: 'status', required: false, align: 'left', sortable: true},
      {name: 'ovariables', field: 'ovariables', label: 'zmienne', required: false, align: 'left', sortable: true},
      {name: 'oparams', field: 'oparams', label: 'parametry', required: false, align: 'left', sortable: true},
      {name: 'oposition', field: 'oposition', label: 'pozycja', required: false, align: 'left', sortable: true},
      {name: 'onumber1', field: 'onumber1', label: 'liczba 1', required: false, align: 'left', sortable: true},
      {name: 'onumber2', field: 'onumber2', label: 'liczba 2', required: false, align: 'left', sortable: true},
      {name: 'odatetime2', field: 'odatetime2', label: 'data i czas 2', required: false, align: 'right', sortable: true},
      {name: 'ooid', field: 'ooid', label: 'ooid', required: false, align: 'left', sortable: false},
      {name: 'ouid', field: 'ouid', label: 'ouid', required: false, align: 'left', sortable: false}
    ]
    let operations_user_columns = [
      // {name: 'ooid', field: 'ooid', label: 'ooid', required: false, align: 'left', sortable: false},
      {name: 'odatetime', field: 'odatetime', label: 'data i czas', required: false, align: 'right', sortable: true},
      {name: 'okind', field: 'okind', label: 'rodzaj', required: false, align: 'left', sortable: true},
      {name: 'otype', field: 'otype', label: 'typ', required: false, align: 'left', sortable: true},
      {name: 'ovalue', field: 'ovalue', label: 'wartość', required: false, align: 'left', sortable: true},
      {name: 'ostatus', field: 'ostatus', label: 'status', required: false, align: 'left', sortable: true}
    ]
    let operations_operator_columns = [
      // {name: 'ooid', field: 'ooid', label: 'ooid', required: false, align: 'left', sortable: false},
      // {name: 'ouid', field: 'ouid', label: 'ouid', required: false, align: 'left', sortable: false},
      {name: 'odatetime', field: 'odatetime', label: 'data i czas', required: false, align: 'right', sortable: true},
      {name: 'okind', field: 'okind', label: 'rodzaj', required: false, align: 'left', sortable: true},
      {name: 'otype', field: 'otype', label: 'typ', required: false, align: 'left', sortable: true},
      {name: 'ovalue', field: 'ovalue', label: 'wartość', required: false, align: 'left', sortable: true},
      {name: 'oinfo', field: 'oinfo', label: 'info', required: false, align: 'left', sortable: true},
      // {name: 'ooidref', field: 'ooidref', label: 'oidref', required: false, align: 'left', sortable: true},
      {name: 'ostatus', field: 'ostatus', label: 'status', required: false, align: 'left', sortable: true},
      // {name: 'ovariables', field: 'ovariables', label: 'zmienne', required: false, align: 'left', sortable: true},
      // {name: 'oparams', field: 'oparams', label: 'parametry', required: false, align: 'left', sortable: true},
      // {name: 'oposition', field: 'oposition', label: 'pozycja', required: false, align: 'left', sortable: true},
      {name: 'onumber1', field: 'onumber1', label: 'liczba 1', required: false, align: 'left', sortable: true},
      {name: 'onumber2', field: 'onumber2', label: 'liczba 2', required: false, align: 'left', sortable: true}
      // {name: 'odatetime2', field: 'odatetime2', label: 'data i czas 2', required: false, align: 'right', sortable: true}
    ]
    let user_columns = [
      {name: 'vcflastname', field: 'vcflastname', label: 'nazwisko', required: false, align: 'left', sortable: true},
      {name: 'vcffirstname', field: 'vcffirstname', label: 'imię', required: false, align: 'left', sortable: true},
      {name: 'username', field: 'username', label: 'użytkownik', required: false, align: 'left', sortable: true},
      {name: 'description', field: 'description', label: 'opis', required: false, align: 'left', sortable: true},
      {name: 'vcfemail', field: 'vcfemail', label: 'email', required: false, align: 'left', sortable: true},
      {name: 'vcfphone', field: 'vcfphone', label: 'telefon', required: false, align: 'left', sortable: true},
      {name: 'created', field: 'created', label: 'utworzony', required: false, align: 'right', sortable: true},
      {name: 'wwwdisabled', field: 'wwwdisabled', label: 'czy wyłączony', required: true, align: 'left', sortable: true},
      {name: 'status', field: 'status', label: 'status', required: false, align: 'left', sortable: true},
      {name: '_oid', field: '_oid', label: '...', required: false, align: 'left', sortable: false}
    ]
    if (this.mode === 'user') {
      lcolumns = operations_user_columns
    } else if (this.mode === 'operator') {
      lcolumns = operations_operator_columns.concat(user_columns)
    } else {
      lcolumns = operations_columns.concat(user_columns)
    }
    return {
      items: [],
      tableFilter: '',
      pagination: {page: 1, rowsPerPage: 10, _sortBy: null, descending: false},
      rowsPerPage: [5, 10, 15, 25, 50, 100],
      columns: lcolumns,
      actions: [
        {
          label: 'wyślij email',
          icon: 'email',
          color: 'primary',
          vif: [this.vifAdminMPAdmin, this.vifEMail],
          handler: this.userEMail
        },
        {
          label: 'wyślij SMS',
          icon: 'phone_android',
          color: 'primary',
          vif: [this.vifAdminMPAdmin, this.vifPhone],
          handler: this.userPhone
        },
        {
          label: 'edycja danych użytkownika',
          icon: 'edit',
          color: 'primary',
          vif: this.vifOperatorAdminMPAdmin,
          handler: this.userEdit
        },
        {
          label: 'zmiana hasła użytkownika',
          icon: 'lock_open',
          color: 'primary',
          vif: this.vifOperatorAdminMPAdmin,
          handler: this.userPassword
        },
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
      ],
      actionsVisible: false,
      currentActions: [],
      currentRow: {},
      currentTitle: ''
    }
  },
  computed: {
    ...mapGetters(['getAuth_operator','getAuth_mpadmin'])
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getDateAsStr (value) {
      return this.$icor.data.getDateAsStr(value)
    },
    getDateTimeAsStr (value) {
      return this.$icor.data.getDateTimeAsStr(value)
    },
    getNumAsMoney (value) {
      return this.$icor.data.getNumAsMoney(value)
    },
    vifOperatorAdminMPAdmin (item) {
      return this.getAuth_operator
    },
    vifAdminMPAdmin (item) {
      return this.getAuth_mpadmin
    },
    vifEMail (item) {
      if (item.vcfemail.length > 5) {
        return true
      }
      return false
    },
    vifPhone (item) {
      if (item.vcfphone.length > 8) {
        return true
      }
      return false
    },
    vifBlockAllowed (item) {
      if (item.status === 'Z') {
        return true
      }
      return false
    },
    vifUnBlockAllowed (item) {
      if (item.status === 'B') {
        return true
      }
      return false
    },
    vifNone (item) {
      return false
    },
    vgetItemActionTitle (item) {
      let ret = item.username
      if (item.vcflastname) {
        ret += ' (' + item.vcffirstname + ' ' + item.vcflastname + ')'
      } else if (item.description) {
        ret += ' (' + item.description + ')'
      }
      return ret
    },
    itemAction (item) {
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
      if (this.currentActions.length > 0) {
        this.actionsVisible = true
      }
    },
    async fetchData () {
      this.items = await this.$icor.main.getUsersByOperations(this.mode)
    },
    userEdit () {
      this.$refs.thisUserAddUpdate.modalShow('update', this.currentRow)
    },
    userPassword () {
      this.$refs.thisUserPasswordChange.modalShow('', {})
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
    userEMail () {
      this.$refs.thisUserSendEmail.modalShow('', this.currentRow)
    },
    userPhone () {
      this.$refs.thisUserSendSMS.modalShow('', this.currentRow)
    }
  }
}
</script>

<style scoped>
</style>
