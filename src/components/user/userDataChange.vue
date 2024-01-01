<template>
  <q-modal v-model="modalOpened" @hide="onHide">
    <i-q-form ref="thisForm" @submit="onSubmit" @cancel="onCancel"></i-q-form>
  </q-modal>
</template>

<script type="text/javascript">
import IQForm from 'components/fields/iqForm'
import FormSchema from '../../lib/formschema'

export default {
  name: 'UserDataChange',
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
      formschema.addField({name: 'VCFFirstName', icon: 'person', type: 'text', label: 'imię', helper: 'wprowadź imię użytkownika'}, {required: true, minLength: 2, maxLength: 24})
      formschema.addField({name: 'VCFLastName', icon: 'person', type: 'text', label: 'nazwisko', helper: 'wprowadź nazwisko użytkownika'}, {required: true, minLength: 2, maxLength: 40})
      formschema.addField({name: 'Description', icon: 'info', type: 'text', label: 'informacje dodatkowe', helper: 'wprowadź informacje dodatkowe'}, {maxLength: 400})
      formschema.header = 'Aktualizacja danych użytkownika'
      this.modalOpened = true
      return this.$refs.thisForm.show(formschema, updateAfterSubmit)
    },
    async onSubmit (data) {
      if (this.$refs.thisForm.schema.action === 'update') {
        // [status, info] = await this.$icor.main.setUserInfo(this.vcffirstname, this.vcflastname, this.description)
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
