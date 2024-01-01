<template>
  <q-list dense no-border>
    <q-list-header v-if="schema.header">{{schema.header}}</q-list-header>

    <!-- dla formularzy ICOR -->
    <div v-for="field in schema.fields" :key="field.name" v-if="(role==='icor') && (field.IsHidden===0)">
      <q-item-separator inset-separator />
      <q-item inset-separator v-if="(field.FieldTypeID===144) && (field.IsMemo===1)"> <!-- memo -->
        <q-item-side icon="description" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`" :label="field.label" :label-width="labelWidth">
              <q-input autofocus :type="field.type" :rows="field.type==='textarea'?12:1" wrap="hard" :cols="field.type==='textarea'?80:40" :max-height="120" v-model="data[field.name]" @blur="$v.data[field.name].$touch" :after="getAfterButtons(field)" />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item inset-separator v-else-if="field.FieldTypeID===144"> <!-- mt_String -->
        <q-item-side icon="title" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`" :label="field.label" :label-width="labelWidth">
              <q-input autofocus :type="field.type" :rows="field.type==='textarea'?12:1" wrap="hard" :cols="field.type==='textarea'?80:40" :max-height="120" v-model="data[field.name]" @blur="$v.data[field.name].$touch" :after="getAfterButtons(field)" />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item inset-separator v-else-if="field.FieldTypeID===32"> <!-- mt_Integer -->
        <q-item-side icon="money" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`" :label="field.label" :label-width="labelWidth">
              <q-input autofocus :type="field.type" :rows="field.type==='textarea'?12:1" wrap="hard" :cols="field.type==='textarea'?80:40" :max-height="120" v-model="data[field.name]" @blur="$v.data[field.name].$touch" :after="getAfterButtons(field)" />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item inset-separator v-else-if="field.FieldTypeID===64"> <!-- mt_Double -->
        <q-item-side icon="money" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`" :label="field.label" :label-width="labelWidth">
              <q-input autofocus :type="field.type" :rows="field.type==='textarea'?12:1" wrap="hard" :cols="field.type==='textarea'?80:40" :max-height="120" v-model="data[field.name]" @blur="$v.data[field.name].$touch" :after="getAfterButtons(field)" />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item inset-separator v-else-if="field.FieldTypeID===96"> <!-- mt_DateTime -->
        <q-item-side icon="event" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`" :label="field.label" :label-width="labelWidth">
              <!--
              <q-input
                autofocus
                :type="field.type"
                :stack-label="field.label"
                :rows="field.type==='textarea'?12:1"
                wrap="hard"
                :cols="field.type==='textarea'?80:40"
                :max-height="120"
                v-model="data[field.name]"
                @blur="$v.data[field.name].$touch"
                :after="getAfterButtons(field)"
              />
              -->
              <q-datetime
                v-model="data[field.name]"
                type="date"
                cancel-label="anuluj"
                ok-label="OK"
                clear-label="wyczyść"
                :month-names="['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień']"
                :day-names="['poniedziałek','wtorek','środa','czwartek','piątek','sobota','niedziela']"
                monday-first
                format="YYYY-MM-DD"
                format24h
                @blur="$v.data[field.name].$touch"
                :after="getAfterButtons(field)"
              ></q-datetime>
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item inset-separator v-else-if="field.FieldTypeID===112"> <!-- mt_Boolean -->
        <q-item-side icon="check" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`" :label="field.label" :label-width="labelWidth">
              <!--
              <q-input
                autofocus
                :type="field.type"
                :stack-label="field.label"
                :rows="field.type==='textarea'?12:1"
                wrap="hard"
                :cols="field.type==='textarea'?80:40"
                :max-height="120"
                v-model="data[field.name]"
                @blur="$v.data[field.name].$touch"
                :after="getAfterButtons(field)"
              />
              -->
              <q-toggle v-model="data[field.name]" @change="$v.data[field.name].$touch" left-label />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item inset-separator v-else-if="field.FieldTypeID>255"> <!-- object -->
        <q-item-side icon="list" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`" :label="field.label" :label-width="labelWidth">
              <q-input autofocus :type="field.type" :rows="field.type==='textarea'?12:1" wrap="hard" :cols="field.type==='textarea'?80:40" :max-height="120" v-model="data[field.name]" @blur="$v.data[field.name].$touch" :after="getAfterButtons(field)" />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item inset-separator v-else-if="field.IsHidden===0"> <!-- other -->
        <q-item-side icon="email" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`" :label="field.label" :label-width="labelWidth">
              <q-input autofocus :type="field.type" :rows="field.type==='textarea'?12:1" wrap="hard" :cols="field.type==='textarea'?80:40" :max-height="120" v-model="data[field.name]" @blur="$v.data[field.name].$touch" :after="getAfterButtons(field)" />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
    </div>
    <!--
    <IQFieldICOR v-for="field in schema.fields" :key="field.name" v-if="role==='icor'" :data="data">
    </IQFieldICOR>
    -->

    <!-- dla innych formularzy -->
    <div v-for="field in schema.fields" :key="field.name" v-if="role!=='icor'">
      <q-item inset-separator v-if="(field.type==='text') || (field.type==='password') || (field.type==='textarea')">
        <q-item-side :icon="field.icon" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`">
              <q-input autofocus :type="field.type" :float-label="field.label" :rows="field.type==='textarea'?12:1" wrap="hard" :cols="field.type==='textarea'?80:40" :max-height="120" v-model="data[field.name]" @blur="$v.data[field.name].$touch" :after="getAfterButtons(field)" />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
      <q-item inset-separator v-if="field.type==='bool'">
        <q-item-side :icon="field.icon" color="primary">
        </q-item-side>
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`">
              <q-toggle v-model="data[field.name]" @change="$v.data[field.name].$touch" :label="field.label" />
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
        <q-item-side right>
        </q-item-side>
      </q-item>
      <q-item-separator inset v-if="field.type==='separator'" />
    </div>
    <q-item-separator inset />
    <q-item v-if="schema.buttons.length>0">
      <q-item-main>
        <q-btn-group rounded>
          <q-btn rounded :icon="button.icon" :color="button.color" @click="buttonClick(button)" :label="button.label" v-for="button in schema.buttons" :key="button.buttonid"  :disabled="button.onlyvalid?$v.$invalid:false" />
        </q-btn-group>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script type="text/javascript">
import IQFieldICOR from './iqFieldICOR'
import { required, sameAs, email, minLength, maxLength, integer, numeric } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'IQForm',
  inheritAttrs: false,
  props: {
    mode: {
      type: String,
      default: 'admin',
      validator: function (value) {
        return ['user', 'admin'].indexOf(value) !== -1
      }
    },
    role: {
      type: String,
      default: 'edit',
      validator: function (value) {
        return ['view', 'edit', 'icor'].indexOf(value) !== -1
      }
    }
  },
  components: {
    IQFieldICOR
  },
  data () {
    return {
      labelWidth: 3,
      formschema: null,
      updateAfterSubmit: false,
      schema: {
        header: '',
        fields: [],
        buttons: []
      },
      data: {},
      status: 1,
      info: '',
      promiseresolve: null
    }
  },
  validations () {
    if (typeof this.schema.fields === 'undefined') {
      return {}
    }
    const dv = {}
    for (let field of this.schema.fields) {
      let df = {}
      if (field.validations.required) {
        df['required'] = required
      }
      if (field.validations.minLength) {
        df['minLength'] = minLength(field.validations.minLength)
      }
      if (field.validations.maxLength) {
        df['maxLength'] = maxLength(field.validations.maxLength)
      }
      if (field.validations.email) {
        df['email'] = email
      }
      if (field.validations.integer) {
        df['integer'] = integer
      }
      if (field.validations.numeric) {
        df['numeric'] = numeric
      }
      if (field.validations.sameAs) {
        df['sameAs'] = sameAs(field.validations.sameAs)
      }
      if (field.validations.checked) {
        df['checked'] = val => val === true
      }
      if (field.validations.password) {
        df['password'] = val => this.checkPassword(val)
      }
      dv[field.name] = df
    }
    return { data: dv }
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
      if (item.email === false) return 'wymagany prawidłowy email'
      if (item.integer === false) return 'wymagana liczba całkowita'
      if (item.numeric === false) return 'wymagana liczba'
      if (item.checked === false) return 'konieczne zaznaczenie tej opcji'
      if (item.sameAs === false) return 'wartości pól muszą być takie same'
      if (item.password === false) return 'wymagane min. 8 znaków, mała litera, duża litera, cyfra'
      if (item.minLength === false) return `minimalna liczba znaków: ${item.$params.minLength.min}`
      if (item.maxLength === false) return `maksymalna liczba znaków: ${item.$params.maxLength.max}`
      if (item.required === false) return 'wymagane'
    },
    checkPassword (apass) {
      if (apass.length < 8) {
        return false // 'wymagane hasło o co najmniej 8 znakach'
      }
      if (apass.search(/[a-z]/) < 0) {
        return false // 'wymagana co najmniej jedna mała litera'
      }
      if (apass.search(/[A-Z]/) < 0) {
        return false // 'wymagana co najmniej jedna duża litera'
      }
      if (apass.search(/[0-9]/) < 0) {
        return false // 'wymagana co najmniej jedna cyfra'
      }
      return true
    },
    getAfterButtons (field) {
      let ret = []
      if (!field.after) {
        return ret
      }
      let that = this
      for (let after of field.after) {
        let d = {
          icon: after.icon,
          content: true,
          error: false,
          warning: false,
          handler () {
            that.$emit('after', field, after.key, that.data[field.name])
          }
        }
        ret.push(d)
      }
      return ret
    },
    async show (formschema, updateAfterSubmit = false, nopromise = false) {
      this.updateAfterSubmit = updateAfterSubmit
      this.status = 1
      this.info = ''
      if (formschema.buttons.length === 0) {
        formschema.addButton({icon: 'done', label: 'Zapamiętaj', event: 'submit', onlyvalid: true})
        formschema.addButton({icon: 'cancel', color: 'negative', label: 'Anuluj', event: 'cancel'})
      }
      this.formschema = formschema
      this.schema = formschema.asJSON()
      this.data = formschema.getData()
      this.$v.$touch()
      if (!nopromise) {
        const promise = new Promise((resolve, reject) => {
          this.promiseresolve = resolve
        })
        return promise
      }
    },
    async buttonClick (button) {
      if (button.event === 'submit') {
        return this.onSubmit()
      }
      if (button.event === 'cancel') {
        return this.onCancel()
      }
      this.$emit('click', button)
    },
    async onSubmit () {
      let data = {
        fields: JSON.parse(JSON.stringify(this.schema.fields)),
        values: JSON.parse(JSON.stringify(this.data))
      }
      console.log('onSubmit:', data)
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$q.notify({message: 'Popraw dane przed zapamiętaniem.', type: 'negative', position: 'bottom-left'})
        return
      }
      this.status = 0
      this.info = 'OK'
      this.$emit('submit', data)
    },
    async onCancel () {
      this.$emit('cancel')
    },
    returnValue () {
      if ((this.status === 0) && this.updateAfterSubmit) {
        this.formschema.updateValues(this.data)
      }
      if (this.promiseresolve !== null) {
        this.promiseresolve([this.status, this.info, this.data])
      }
    }
  }
}
</script>

<style scoped>
input, .q-input-target, .q-input-shadow {
  border: 1px solid rgb(142, 175, 185) !important;
}
</style>
