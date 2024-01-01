<template>
  <q-modal ref="thisModal" v-model="modalOpened" v-if="isLoggedIn">
    <q-list>
      <q-item>
        <q-item-side icon="email" color="primary" />
        <q-item-main>
          <q-field
            helper="wprowadź nowy email"
            :error="$v.email.$error"
            error-label="wymagany email"
            >
            <q-input autofocus type="email"
              float-label="nowy email"
              v-model="email"
              @blur="$v.email.$touch"
            />
          </q-field>
          <q-item-tile sublabel lines="3">
            Po zapamiętaniu, na podany wyżej email zostanie wysłany link aktywacyjny.
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item-separator inset />
      <q-item>
        <q-item-main>
          <q-btn-group rounded>
            <q-btn rounded icon="done" color="primary"
              @click="submitData" label="Zapamiętaj" :disabled="$v.$invalid"
            />
            <q-btn rounded icon="cancel" color="negative" @click="cancelData" label="Anuluj" />
          </q-btn-group>
        </q-item-main>
      </q-item>
    </q-list>
  </q-modal>
</template>

<script type="text/javascript">
import { required, email } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'UserEmailChangeSimple',
  data () {
    return {
      modalOpened: false,
      email: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    ...mapGetters([
      'getUser_User',
      'isLoggedIn'
    ])
  },
  methods: {
    errorMsg (item) {
      if (!item.$error) return ''
      if (item.required === false) return 'wymagane'
      if (item.minLength === false) return `minimalna liczba znaków: ${item.$params.minLength.min}`
      if (item.maxLength === false) return `maksymalna liczba znaków: ${item.$params.maxLength.max}`
    },
    modalShow (event) {
      this.email = ''
      this.$v.$touch()
      this.modalOpened = true
    },
    async submitData () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$q.notify({message: 'Popraw dane przed zapamiętaniem.', type: 'negative', position: 'bottom-left'})
        return
      }
      let [status, info] = await this.$icor.main.setUserChangeEmail(this.email)
      this.modalOpened = false
      if (status === 0) {
        this.$q.notify({message: 'Email z linkiem aktywacyjnym zmianę został wysłany na podany adres.', type: 'positive', position: 'bottom-right'})
      } else {
        this.$q.notify({message: info, type: 'negative', position: 'bottom-right'})
      }
    },
    cancelData () {
      this.modalOpened = false
    }
  }
}
</script>
<style scoped>
</style>
