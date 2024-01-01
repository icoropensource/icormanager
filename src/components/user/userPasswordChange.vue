<template>
  <q-modal v-model="modalOpened" @hide="onHide">
    <i-q-form ref="thisForm" @after="onAfter" @submit="onSubmit" @cancel="onCancel"></i-q-form>
  </q-modal>
</template>

<script type="text/javascript">
import IQForm from 'components/fields/iqForm'
import FormSchema from '../../lib/formschema'

export default {
  name: 'UserPasswordChange',
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
      if (action !== 'admin') {
        formschema.addField({name: 'oldpassword', type: 'password', icon: 'lock_open', label: 'Aktualne hasło', helper: 'wprowadź aktualne hasło'}, {required: true, minLength: 6, maxLength: 64})
      }
      formschema.addField({name: 'password', type: 'password', icon: 'lock_outline', label: 'Nowe hasło', helper: 'wprowadź nowe hasło'}, {required: true, minLength: 8, maxLength: 64, password: true})
      formschema.addField({name: 'password2', type: 'password', icon: 'lock_outline', label: 'Powtórz nowe hasło', helper: 'wprowadź ponownie nowe hasło'}, {required: true, minLength: 8, maxLength: 64, sameAs: 'password', password: true})
      formschema.header = 'Zmiana hasła'
      this.modalOpened = true
      return this.$refs.thisForm.show(formschema, updateAfterSubmit)
    },
    async onAfter (field, key, value) {
    },
    async onSubmit (data) {
      // [status, info] = await this.$icor.main.setUserInfo(this.vcffirstname, this.vcflastname, this.description)
      // this.$refs.thisForm.status = 0
      if (this.$refs.thisForm.status === 0) {
        this.modalOpened = false
        this.$root.$emit('notify-message', {message: 'Hasło zostało zmienione', type: 'positive', position: 'bottom-right'})
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
