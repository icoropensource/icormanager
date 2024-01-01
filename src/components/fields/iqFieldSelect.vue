<template>
  <q-field>
    <q-select :float-label="label" ref="ifMyField" :value="value" @input="updateValue" :options="options" separator :radio="radio" />
  </q-field>
</template>

<script type="text/javascript">
export default {
  name: 'IQFieldSelect',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    radio: {
      type: Boolean,
      default: true
    },
    issearchable: {
      type: Boolean,
      default: false
    },
    ispaste: {
      type: Boolean,
      default: false
    },
    iscopy: {
      type: Boolean,
      default: false
    }
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
