<template>
  <q-modal v-model="modalOpened" @hide="onHide">
    <i-q-form ref="thisForm" @after="onAfter" @submit="onSubmit" @cancel="onCancel"></i-q-form>
  </q-modal>
</template>

<script type="text/javascript">
import IQForm from 'components/fields/iqForm'
import FormSchema from '../../lib/formschema'

export default {
  name: 'userSendEmail',
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
      formschema.addField({name: 'title', type: 'text', icon: 'title', label: 'Tytuł email', helper: 'wprowadź tytuł email'}, {required: true, minLength: 2, maxLength: 200})
      formschema.addField({name: 'text', type: 'textarea', icon: 'email', label: 'Treść email', helper: 'wprowadź treść email'}, {required: true, minLength: 2, maxLength: 8000})
      formschema.header = 'Email do użytkownika'
      this.modalOpened = true
      return this.$refs.thisForm.show(formschema, updateAfterSubmit)
    },
    async onAfter (field, key, value) {
    },
    async onSubmit (data) {
      // [status, info] = await this.$icor.main.sendUserEmail(this.user._oid, this.title, this.text)
      // this.$refs.thisForm.status = 0
      if (this.$refs.thisForm.status === 0) {
        this.modalOpened = false
        this.$root.$emit('notify-message', {message: 'email przekazany do wysłania', type: 'positive', position: 'bottom-right'})
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
