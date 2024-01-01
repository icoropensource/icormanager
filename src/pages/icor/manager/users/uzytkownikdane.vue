<template>
  <div v-if="isLoggedIn">
    <i-q-view ref="thisView" @click="onClick"></i-q-view>
    <userDataChange ref="thisUserDataChange"></userDataChange>
    <userEmailChangeSimple ref="thisUserEmailChangeSimple"></userEmailChangeSimple>
    <userPhoneChange ref="thisUserPhoneChange"></userPhoneChange>
    <userPasswordChange ref="thisUserPasswordChange" mode="user"></userPasswordChange>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import IQView from 'components/fields/iqView'
import FormSchema from '../../../../lib/formschema'

import userDataChange from 'components/user/userDataChange'
import userEmailChangeSimple from 'components/user/userEmailChangeSimple'
import userPasswordChange from 'components/user/userPasswordChange'
import userPhoneChange from 'components/user/userPhoneChange'

export default {
  name: 'UstawieniaUzytkownikDane',
  components: {
    IQView,
    userDataChange,
    userEmailChangeSimple,
    userPasswordChange,
    userPhoneChange
  },
  data () {
    return {
      user: {}
    }
  },
  computed: {
    ...mapGetters([
      'getUser_User',
      'isLoggedIn'
    ])
  },
  mounted () {
    this.show()
  },
  methods: {
    show () {
      this.user = {
        _oid: this.getUser_User.uid,
        UserName: this.getUser_User.username,
        VCFEMail: this.getUser_User.email,
        VCFPhone: this.getUser_User.phone,
        VCFFirstName: this.getUser_User.firstname,
        VCFLastName: this.getUser_User.lastname,
        Description: this.getUser_User.description
      }
      const formschema = new FormSchema('view', this.user)
      formschema.addField({name: '_oid', type: 'hidden'})
      formschema.addField({name: 'UserName', type: 'text', icon: 'perm_identity', label: 'użytkownik', helper: 'wprowadź nazwę użytkownika'}, {required: true, minLength: 6, maxLength: 24})
      formschema.addField({name: 'VCFFirstName', icon: 'person', type: 'text', label: 'imię', helper: 'wprowadź imię użytkownika'}, {required: true, minLength: 2, maxLength: 24})
      formschema.addField({name: 'VCFLastName', icon: 'person', type: 'text', label: 'nazwisko', helper: 'wprowadź nazwisko użytkownika'}, {required: true, minLength: 2, maxLength: 40})
      formschema.addField({name: 'VCFEMail', type: 'text', icon: 'email', label: 'email', helper: 'wprowadź email'}, {required: true, maxLength: 44, email: true})
      formschema.addField({name: 'VCFPhone', icon: 'phone_android', type: 'text', label: 'nr telefonu', helper: 'wprowadź nr telefonu'}, {minLength: 9, maxLength: 15})
      formschema.addField({name: 'Description', icon: 'info', type: 'text', label: 'informacje dodatkowe', helper: 'wprowadź informacje dodatkowe'}, {maxLength: 400})
      formschema.header = 'Dane użytkownika'
      formschema.addButton({icon: 'edit', label: 'Edycja', event: 'editData'})
      formschema.addButton({icon: 'mail', label: 'Zmiana email', event: 'changeEmail'})
      formschema.addButton({icon: 'phone_android', label: 'Zmiana telefonu', event: 'changePhone'})
      formschema.addButton({icon: 'security', label: 'Zmiana hasła', event: 'changePassword'})
      return this.$refs.thisView.show(formschema)
    },
    onClick (button) {
      if (button.event === 'editData') {
        return this.$refs.thisUserDataChange.modalShow('update', this.user, true)
      }
      if (button.event === 'changeEmail') {
        this.$refs.thisUserEmailChangeSimple.modalShow()
      }
      if (button.event === 'changePhone') {
        this.$refs.thisUserPhoneChange.modalShow()
      }
      if (button.event === 'changePassword') {
        this.$refs.thisUserPasswordChange.modalShow('user')
      }
    }
  }
}
</script>

<style scoped>
</style>
