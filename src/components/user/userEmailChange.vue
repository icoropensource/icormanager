<template>
  <div>
    <q-modal ref="thisModal" v-if="isLoggedIn">
      <q-stepper ref="stepper" no-header-navigation>
        <q-step default title="Nowy email" subtitle="email zostanie zmieniony po jego potwierdzeniu">
          <q-list>
            <q-item>
              <q-item-side icon="email" color="primary" />
              <q-item-main>
                <q-field helper="wprowadź nowy email" error-label="wymagany email">
                  <q-input autofocus float-label="nowy email" type="text"
                    v-model="email" :error="$v.email.$error" @blur="$v.email.$touch"
                  />
                </q-field>
              </q-item-main>
            </q-item>
            <q-item-separator inset />
          </q-list>
          <q-stepper-navigation>
            <q-btn-group rounded>
              <q-btn rounded icon="done" color="primary" @click="step1click" label="Dalej" :disabled="$v.email.$error" />
              <q-btn rounded icon="cancel" color="negative" @click="cancelData" label="Anuluj" />
            </q-btn-group>
          </q-stepper-navigation>
        </q-step>

        <q-step title="Weryfikacja kodu" subtitle="przekazanego na nowy email">
          <q-list>
            <q-item>
              <q-item-side icon="lock_open" color="primary" />
              <q-item-main>
                <q-field helper="wprowadź kod z email (sprawdź swoją skrzynkę za chwilę)" error-label="wprowadź kod z email (sprawdź swoją skrzynkę za chwilę)">
                  <q-input autofocus float-label="kod" type="text"
                    v-model="kod" :error="$v.kod.$error" @blur="$v.kod.$touch"
                  />
                </q-field>
              </q-item-main>
            </q-item>
            <q-item-separator inset />
          </q-list>
          <q-stepper-navigation>
            <q-btn-group rounded>
              <q-btn rounded icon="done" color="primary" @click="step2click" label="Dalej" :disabled="$v.kod.$error" />
              <q-btn rounded icon="cancel" color="negative" @click="cancelData" label="Anuluj" />
            </q-btn-group>
          </q-stepper-navigation>
        </q-step>

        <q-step title="Zmiana email" subtitle="po prawidłowym sprawdzeniu kodu">
          <h3>Gratulacje - eMail został zmieniony!</h3>
          <q-stepper-navigation>
            <q-btn-group rounded>
              <q-btn rounded icon="cancel" color="negative" @click="cancelData" label="Koniec" />
            </q-btn-group>
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-modal>
  </div>
</template>

<script type="text/javascript">
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'UserEmailChange',
  data () {
    return {
      email: '',
      kod: ''
    }
  },
  validations: {
    email: { required, email },
    kod: { required, minLength: minLength(6), maxLength: maxLength(6) }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  mounted () {
    this.$root.$on('modal-emailchange', this.modalShow)
  },
  beforeDestroy () {
    this.$root.$off('modal-emailchange', this.modalShow)
  },
  methods: {
    modalShow (event) {
      this.$refs.stepper.reset()
      this.email = ''
      this.kod = ''
      this.$refs.thisModal.show()
      this.$v.$touch()
    },
    modalHide (event) {
      this.$refs.thisModal.hide()
    },
    async step1click () {
      this.$v.$touch()
      let [status, info] = await this.$icor.main.setUserChangeEmail(this.email)
      if (status !== 0) {
        this.modalHide()
        this.$q.notify({message: info + ', status: ' + status, type: 'negative', position: 'bottom-right'})
        return
      }
      this.$refs.stepper.next()
    },
    async step2click () {
      this.$v.$touch()
      let [status, info] = await this.$icor.main.checkUserChangeEmail(this.kod)
      if (status !== 0) {
        this.modalHide()
        this.$q.notify({message: info + ', status: ' + status, type: 'negative', position: 'bottom-right'})
        return
      }
      this.$refs.stepper.next()
    },
    submitData () {
      this.modalHide()
    },
    cancelData () {
      this.modalHide()
    }
  }
}
</script>
<style scoped>
</style>
