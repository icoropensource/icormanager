<template>
  <q-field>
    <q-datetime ref="ifMyField" :float-label="label" :value="value" @input="updateValue"
      type="date"
      cancel-label="anuluj"
      ok-label="OK"
      clear-label="wyczyść"
      :month-names="['styczeń','luty','marzec','kwiecień','maj','czerwiec','lipiec','sierpień','wrzesień','październik','listopad','grudzień']"
      :day-names="['poniedziałek','wtorek','środa','czwartek','piątek','sobota','niedziela']"
      monday-first
      format="YYYY-MM-DD"
      format24h
      :clearable='clearable' :clear-value="clearvalue"
    ></q-datetime>
  </q-field>
</template>

<script type="text/javascript">
import {
  QDatetime,
  QField
} from 'quasar'

export default {
  name: 'IQField',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    clearvalue: {
      type: String,
      default: ''
    }
  },
  components: {
    QField,
    QDatetime
  },
  data () {
    return {
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
</style>
