<template>
  <q-modal v-model="modalOpened" @hide="onHide" :content-css="{minWidth: '60vw', minHeight: '95vh'}">
    <i-q-form ref="thisForm" @after="onAfter" @submit="onSubmit" @cancel="onCancel"></i-q-form>
  </q-modal>
</template>

<script type="text/javascript">
import IQForm from 'components/fields/iqForm'
import FormSchema from '../../lib/formschema'

export default {
  name: 'UserAddUpdate',
  props: [
    'mode' // user, admin
  ],
  components: {
    IQForm
  },
  data () {
    return {
      modalOpened: false
    }
  },
  methods: {
    async modalShow (action, values, updateAfterSubmit) {
      const formschema = new FormSchema(action, values)
      formschema.addField({name: '_oid', type: 'hidden'})
      formschema.addField({name: 'UserName', type: 'hidden', icon: 'person_add', label: 'użytkownik', helper: 'wprowadź nazwę użytkownika'}, {required: true, minLength: 6, maxLength: 24}, [{icon: 'done_all', key: 'checkUsernameAvailable'}])
      formschema.addField({name: 'VCFEMail', type: 'text', icon: 'email', label: 'email', helper: 'wprowadź email'}, {required: true, maxLength: 44, email: true})
      formschema.addField({name: 'VCFPhone', icon: 'phone_android', type: 'text', label: 'nr telefonu', helper: 'wprowadź nr telefonu'}, {minLength: 9, maxLength: 15})
      formschema.addField({name: 'VCFFirstName', icon: 'person', type: 'text', label: 'imię', helper: 'wprowadź imię użytkownika'}, {required: true, minLength: 2, maxLength: 24})
      formschema.addField({name: 'VCFLastName', icon: 'person', type: 'text', label: 'nazwisko', helper: 'wprowadź nazwisko użytkownika'}, {required: true, minLength: 2, maxLength: 40})
      formschema.addField({name: 'Description', icon: 'info', type: 'text', label: 'informacje dodatkowe', helper: 'wprowadź informacje dodatkowe'}, {maxLength: 400})
      formschema.addField({type: 'separator'})
      formschema.addField({name: 'AccountDisabled', icon: 'vpn_key', type: 'bool', label: 'konto wyłączone', helper: 'ustaw gdy konto wyłączone'})
      formschema.addField({name: 'WWWDisabled', icon: 'public', type: 'bool', label: 'dostęp wyłączony', helper: 'ustaw gdy użytkownik ma mieć wyłączony dostęp'})
      if (action === 'new') {
        formschema.header = 'Nowy użytkownik'
      } else if (action === 'update') {
        formschema.header = 'Aktualizacja danych użytkownika'
      }
      this.modalOpened = true
      return this.$refs.thisForm.show(formschema, updateAfterSubmit)
    },
    async onAfter (field, key, value) {
      if (key === 'checkUsernameAvailable') {
        this.$q.notify({message: 'sprawdzam nazwę użytkownika: ' + value, type: 'positive', position: 'bottom-right'})
      }
    },
    async checkUsernameAvailable () {
      let status
      [status] = await this.$icor.main.getUserNameAvailable(this.username)
      if (status === 0) {
        this.$q.notify({message: 'nazwa użytkownika jest dostępna', type: 'positive', position: 'bottom-right'})
      } else {
        this.$q.notify({message: 'nazwa użytkownika jest już wykorzystana', type: 'negative', position: 'bottom-right'})
      }
    },
    async onSubmit (data) {
      if (this.$refs.thisForm.schema.action === 'new') {
        // [status, info] = await this.$icor.main.setUserInfo(this.vcffirstname, this.vcflastname, this.description)
        // this.$refs.thisForm.status = 1
      }
      if (this.$refs.thisForm.schema.action === 'update') {
        // [status, info] = await this.$icor.main.setUserInfoAdmin(this.user._oid, this.vcffirstname, this.vcflastname, this.vcfemail, this.vcfphone, this.description, this.status, this.groups)
        // this.$refs.thisForm.status = 1
      }
      if (this.$refs.thisForm.status === 0) {
        this.modalOpened = false
        this.$root.$emit('notify-message', {message: 'Dane użytkownika zostały zmienione', type: 'positive', position: 'bottom-right'})
      } else {
        this.$q.notify({message: this.$refs.thisForm.info, type: 'negative', position: 'bottom-right'})
      }
    },
    onCancel () {
      this.modalOpened = false
    },
    onHide () {
      this.$refs.thisForm.returnValue()
    }
  }
}
</script>

<style scoped>
</style>
