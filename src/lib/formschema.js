class FormButton {
  constructor (options = {}) {
    this.options = {
      ...{
        name: '',
        icon: '',
        label: '',
        color: 'primary',
        onlyvalid: false,
        event: ''
      },
      ...options
    }
  }
  asJSON () {
    const d = {...this.options}
    return d
  }
}

class FormField {
  constructor (options = {}, validations = {}, after = []) {
    this.options = {
      ...{
        name: '',
        icon: '',
        type: 'hidden', // text, textarea, password, int, bool, hidden, separator
        label: '',
        helper: '',
        default: ''
      },
      ...options
    }
    if (typeof options.default === 'undefined') {
      if (this.options.type === 'bool') {
        this.options.default = false
      }
      if (this.options.type === 'int') {
        this.options.default = 0
      }
    }
    this.validations = {...validations} // required, minLength, maxLength, email, sameAs, integer, numeric
    this.after = [...after] // [ {icon, key}, ... ]
  }
  asJSON () {
    const d = {...this.options}
    d['validations'] = {...this.validations}
    d['after'] = [...this.after]
    return d
  }
}

export default class FormSchema {
  constructor (action, values = {}) {
    this.action = action // new, update
    this.values = values
    this.header = ''
    this.fields = []
    this.buttons = []
  }
  addField (options = {}, validations = {}, after = []) {
    const field = new FormField(options, validations, after)
    this.fields.push(field)
    return field
  }
  addButton (options = {}) {
    options.buttonid = 'button' + this.buttons.length
    const button = new FormButton(options)
    this.buttons.push(button)
    return button
  }
  getData () {
    const d = {}
    for (let field of this.fields) {
      if (field.options.type !== 'separator') {
        d[field.options.name] = this.values[field.options.name] || field.options.default
      }
    }
    return d
  }
  updateValues (data) {
    for (let key in this.values) {
      if (data.hasOwnProperty(key)) {
        this.values[key] = data[key]
      }
    }
  }
  asJSON () {
    const lf = []
    for (let field of this.fields) {
      lf.push(field.asJSON())
    }
    const lb = []
    for (let button of this.buttons) {
      lb.push(button.asJSON())
    }
    const d = {
      header: this.header,
      fields: lf,
      buttons: lb
    }
    return d
  }
}
