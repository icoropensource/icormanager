<template>
  <q-field>
    <q-input ref="ifMyField" :float-label="label" :value="value" @input="updateValue" type="textarea">
    </q-input>
  </q-field>
</template>

<script type="text/javascript">
import {
  QField,
  QInput
} from 'quasar'

export default {
  name: 'IQFieldTextArea',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  components: {
    QField,
    QInput
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
