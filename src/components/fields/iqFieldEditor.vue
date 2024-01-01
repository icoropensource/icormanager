<template>
  <q-field :label="label" orientation="vertical">
    <q-editor ref="ifMyField" :value="value" @input="updateValue" max-height="45vh"
      :definitions="definitions"
      :toolbar="toolbar"
      :fonts="fonts"
    >
    </q-editor>
  </q-field>
</template>

<script type="text/javascript">
export default {
  name: 'IQFieldEditor',
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
  data () {
    return {
      definitions: {
        insert_image: {
          tip: 'wstaw obrazek',
          icon: 'photo',
          handler: this.insertImage
        },
        insert_img_local: {
          tip: 'wstaw obrazek z dysku',
          icon: 'photo',
          handler: this.insertImageLocal
        }
      },
      fonts: {
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      },
      toolbar: [
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'insert_img_local', 'custom_btn'],
        [
          {
            // label: $q.i18n.editor.formatting,
            icon: this.$q.icon.editor.formatting,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
          },
          {
            // label: $q.i18n.editor.fontSize,
            icon: this.$q.icon.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
          },
          {
            // label: $q.i18n.editor.defaultFont,
            icon: this.$q.icon.editor.font,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
          },
          'removeFormat'
        ],
        [
          {
            // label: $q.i18n.editor.align,
            icon: this.$q.icon.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          'quote', 'unordered', 'ordered', 'outdent', 'indent'
        ],
        ['undo', 'redo']
      ]
    }
  },
  mounted () {
  },
  methods: {
    updateValue (value) {
      this.$emit('input', value)
    },
    commandInfo (command) {
      var w
      w = document.queryCommandSupported(command)
      console.log(command + ' supported = ' + w)
      w = document.queryCommandEnabled(command)
      console.log(command + ' enabled = ' + w)
      w = document.execCommand(command, true, null)
      console.log(command + ' ' + w)
    },
    insertImage () {
      console.log('insert image')
      this.commandInfo('enableInlineTableEditing')
      this.commandInfo('enableObjectResizing')
      console.log(this.$refs.ifMyField)
      document.execCommand('insertHTML', true, '<strong>bbbbbbbb</strong>')
    },
    insertImageLocal () {
      // const post = this.post
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.png, .jpg'
      let file
      input.onchange = _ => {
        const files = Array.from(input.files)
        file = files[0]
        const reader = new FileReader()
        let dataUrl = ''
        reader.onloadend = function () {
          dataUrl = reader.result
          document.execCommand('insertHTML', true, '<div><img src="' + dataUrl + '" /></div>')
          // post.body += '<div><img src="' + dataUrl + '" /></div>'
        }
        reader.readAsDataURL(file)
      }
      input.click()
    }
  }
}
</script>

<style scoped>
</style>
