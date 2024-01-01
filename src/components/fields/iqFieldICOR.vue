<template>
  <div>
      <q-item-separator />
      <q-item inset-separator v-if="field.FieldTypeID===144">
        <q-item-side :icon="field.icon" color="primary" />
        <q-item-main>
          <q-item-tile label>
            <q-field :error="$v.data[field.name].$error" :error-label="`${errorMsg($v.data[field.name])}`">
              <q-input v-bind="$attrs" ref="ifMyField" autofocus hide-underline :type="field.type" :stack-label="field.label" :rows="field.type==='textarea'?12:1" wrap="hard" :cols="field.type==='textarea'?80:40" :max-height="120" v-model="data[field.name]" @blur="$v.data[field.name].$touch" :after="getAfterButtons(field)">
                <q-autocomplete ref="acMyField" :max-results="123" :min-characters="minSearchCharacters" :static-data="staticSearch" @search="searchMyField" v-if="issearchable" />
              </q-input>
            </q-field>
          </q-item-tile>
          <q-item-tile sublabel v-if="field.helper!==''">
            {{field.helper}}
          </q-item-tile>
        </q-item-main>
      </q-item>
  </div>
  <!--
  <q-field>
    <q-input v-bind="$attrs" ref="ifMyField" :float-label="label" :value="value" @input="updateValue" :after="getAfter">
      <q-autocomplete ref="acMyField" :max-results="123" :min-characters="minSearchCharacters" :static-data="staticSearch" @search="searchMyField" v-if="issearchable" />
    </q-input>
  </q-field>
  -->
</template>

<script type="text/javascript">
import {
  QAutocomplete,
  QField,
  QInput
} from 'quasar'

export default {
  name: 'IQFieldICOR',
  inheritAttrs: false,
  props: {
    role: {
      type: String,
      default: 'icor'
    },
    field: {
      type: Object,
      default () {
        return {}
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
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
    },
    minSearchCharacters: {
      type: Number,
      default: 0
    },
    staticSearch: {
      type: Object,
      default () {
        return null
      }
    }
  },
  components: {
    QAutocomplete,
    QField,
    QInput
  },
  data () {
    return {
    }
  },
  computed: {
    getAfter () {
      let ret = []
      var self = this
      if (this.iscopy) {
        ret.push(
          {
            icon: 'content_copy',
            handler () {
              self.copyTextToClipboard(self.$refs.ifMyField.value)
              // console.log(self.$refs.ifMyField.value)
            }
          }
        )
      }
      if (this.ispaste) {
        ret.push(
          {
            icon: 'content_paste',
            handler () {
              self.pasteTextFromClipboard()
            }
          }
        )
      }
      if (this.issearchable) {
        ret.push(
          {
            icon: 'search',
            handler () {
              self.$refs.ifMyField.focus()
              self.$nextTick(function () {
                // debugger
                self.$refs.acMyField.trigger()
              })
            }
          }
        )
      }
      return ret
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
    searchMyField (terms, done) {
      this.$emit('search', terms, done)
    },
    async pasteTextFromClipboard () {
      try {
        let text = await window.navigator.clipboard.readText()
        this.$emit('input', text)
      } catch (e) {
      }
    },
    copyTextToClipboard (text) {
      var textArea = document.createElement('textarea')
      //
      // *** This styling is an extra step which is likely not required. ***
      //
      // Why is it here? To ensure:
      // 1. the element is able to have focus and selection.
      // 2. if element was to flash render it has minimal visual impact.
      // 3. less flakyness with selection and copying which **might** occur if
      //    the textarea element is not visible.
      //
      // The likelihood is the element won't even render, not even a flash,
      // so some of these are just precautions. However in IE the element
      // is visible whilst the popup box asking the user for permission for
      // the web page to copy to the clipboard.
      //
      // Place in top-left corner of screen regardless of scroll position.
      textArea.style.position = 'fixed'
      textArea.style.top = 0
      textArea.style.left = 0
      // Ensure it has a small width and height. Setting to 1px / 1em
      // doesn't work as this gives a negative w/h on some browsers.
      textArea.style.width = '2em'
      textArea.style.height = '2em'
      // We don't need padding, reducing the size if it does flash render.
      textArea.style.padding = 0
      // Clean up any borders.
      textArea.style.border = 'none'
      textArea.style.outline = 'none'
      textArea.style.boxShadow = 'none'
      // Avoid flash of white box if rendered for any reason.
      textArea.style.background = 'transparent'
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        // var successful = document.execCommand('copy')
        // var msg = successful ? 'successful' : 'unsuccessful'
        // console.log('Copying text command was ' + msg)
      } catch (err) {
        // console.log('Oops, unable to copy');
      }
      document.body.removeChild(textArea)
    }

  }
}
</script>

<style scoped>
</style>
