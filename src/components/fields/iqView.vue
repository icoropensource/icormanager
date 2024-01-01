<template>
  <div>
    <q-list dense>
      <q-list-header v-if="schema.header">{{schema.header}}</q-list-header>
      <div v-for="field in schema.fields" :key="field.name">

        <q-item v-if="(field.type==='text') || (field.type==='password') || (field.type==='textarea')">
          <q-item-side :icon="field.icon" color="primary" />
          <q-item-main>
            <q-item-tile label>{{data[field.name]}}</q-item-tile>
            <q-item-tile sublabel v-if="field.helper!==''">{{field.label}}</q-item-tile>
          </q-item-main>
        </q-item>

        <q-item v-if="field.type==='bool'">
          <q-item-side :icon="field.icon" color="primary">
          </q-item-side>
          <q-item-main>
            <q-item-tile label>
              <q-field>
                <q-toggle v-model="data[field.name]" :label="field.label" />
              </q-field>
            </q-item-tile>
            <q-item-tile sublabel v-if="field.helper!==''">
              {{field.helper}}
            </q-item-tile>
          </q-item-main>
          <q-item-side right>
          </q-item-side>
        </q-item>

        <q-item-separator v-if="field.type==='separator'" />
      </div>
      <q-item-separator inset />
      <q-item v-if="schema.buttons.length>0">
        <q-item-main>
          <q-btn-group rounded>
            <q-btn rounded :icon="button.icon" :color="button.color" @click="buttonClick(button)" :label="button.label" v-for="button in schema.buttons" :key="button.buttonid" />
          </q-btn-group>
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'IQView',
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
        return ['view', 'edit'].indexOf(value) !== -1
      }
    }
  },
  data () {
    let dv = {
      formschema: null,
      updateAfterSubmit: false,
      schema: {},
      data: {}
    }
    return dv
  },
  methods: {
    async show (formschema) {
      this.formschema = formschema
      this.schema = formschema.asJSON()
      this.data = formschema.getData()
    },
    async buttonClick (button) {
      this.$emit('click', button)
    }
  }
}
</script>

<style scoped>
</style>
