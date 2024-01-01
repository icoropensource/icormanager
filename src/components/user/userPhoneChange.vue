<template>
    <q-modal ref="thisModal" v-model="modalOpened" v-if="isLoggedIn">
      <q-stepper ref="stepper" no-header-navigation>
        <q-step default title="Nowy nr telefonu" subtitle="Numer zostanie zmieniony po jego potwierdzeniu">
          <q-list>
            <q-item>
              <q-item-side icon="phone_android" color="primary" />
              <q-item-main>
                <q-field helper="wprowadź nowy nr telefonu" error-label="wymagany nr telefonu">
                  <q-input autofocus float-label="nowy nr telefonu" type="tel"
                    v-model="phone" :error="$v.phone.$error" @blur="$v.phone.$touch"
                  />
                </q-field>
              </q-item-main>
            </q-item>
            <q-item-separator inset />
          </q-list>
          <q-stepper-navigation>
            <q-btn-group rounded>
              <q-btn rounded icon="done" color="primary" @click="step1click" label="Dalej" :disabled="$v.phone.$error" />
              <q-btn rounded icon="cancel" color="negative" @click="cancelData" label="Anuluj" />
            </q-btn-group>
          </q-stepper-navigation>
        </q-step>

        <q-step title="Weryfikacja kodu" subtitle="przekazanego przez SMS">
          <q-list>
            <q-item>
              <q-item-side icon="lock_open" color="primary" />
              <q-item-main>
                <q-field helper="wprowadź kod z SMS" error-label="wprowadź kod z SMS">
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

        <q-step title="Zmiana nr telefonu" subtitle="po prawidłowym sprawdzeniu kodu">
          <h3>Gratulacje - nr telefonu został zmieniony!</h3>
          <q-stepper-navigation>
            <q-btn-group rounded>
              <q-btn rounded icon="cancel" color="negative" @click="cancelData" label="Koniec" />
            </q-btn-group>
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-modal>
</template>

<script type="text/javascript">
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'UserPhoneChange',
  data () {
    return {
      modalOpened: false,
      phone: '',
      kod: ''
    }
  },
  validations: {
    phone: { required, minLength: minLength(9) },
    kod: { required, minLength: minLength(6), maxLength: maxLength(6) }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    modalShow (event) {
      this.$refs.stepper.reset()
      this.phone = ''
      this.kod = ''
      this.modalOpened = true
      this.$v.$touch()
    },
    async step1click () {
      this.$v.$touch()
      let [status, info] = await this.$icor.main.setUserChangePhone(this.phone)
      if (status !== 0) {
        this.modalOpened = false
        this.$q.notify({message: info + ', status: ' + status, type: 'negative', position: 'bottom-right'})
        return
      }
      this.$refs.stepper.next()
    },
    async step2click () {
      this.$v.$touch()
      let [status, info] = await this.$icor.main.checkUserChangePhone(this.kod)
      if (status !== 0) {
        this.modalOpened = false
        this.$q.notify({message: info + ', status: ' + status, type: 'negative', position: 'bottom-right'})
        return
      }
      this.$refs.stepper.next()
    },
    submitData () {
      this.modalOpened = false
    },
    cancelData () {
      this.modalOpened = false
    }
  }
}
</script>
<style scoped>
</style>
