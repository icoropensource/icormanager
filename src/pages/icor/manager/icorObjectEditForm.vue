<template>
  <div>
    <keep-alive>
      <q-scroll-area style="width: 100%; height: calc(100vh - 106px);">
        <i-q-form ref="thisForm" role="icor" @after="onAfter" @submit="onSubmit" @cancel="onCancel"></i-q-form>
      </q-scroll-area>
    </keep-alive>
  </div>
</template>

<script type="text/javascript">
import helperActions from './helperActions.js'
import cardInfo from './cardInfo.vue'
import IQForm from 'components/fields/iqForm'
import FormSchema from '../../../lib/formschema'

export default {
  name: 'ICORObjectEditForm',
  props: {
    tabitem: {
      type: Object
    }
  },
  components: {
    cardInfo,
    IQForm,
    FormSchema
  },
  data () {
    return {
      jobitem: {
        jobtype: '',
        CID: -1,
        OID: -1,
        brCID: -1,
        brOID: -1,
        thisPageTitle: '',
        thisPageSubTitle: '',
        thisPageAction: '',
        thisPageDescription: '',
        actionLabel: '',
        url: ''
      },
      tabselected: '',
      sheets: {},
      sheetids: [],
      fields: [],
      values: {},
      refCID: -1,
      refOID: -1,
      refField: '',
      refMode: '',
      menus: [],
      status: 0,
      info: '',
      wwwdescription: '',
      imgsrc: ''
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    initVars () {
      this.tabselected = ''
      this.fields = {}
      this.menus = []
      this.sheets = {}
      this.sheetids = []
      this.wwwdescription = ''
      this.imgsrc = ''
    },
    async fetchData () {
      // debugger
      console.log('fetchData:', this.tabitem)
      this.initVars()
      // let ret = await this.$icor.main.ideObjectEditForm(this.tabitem.tabdata.jobtype, this.tabitem.tabdata.CID, this.tabitem.tabdata.OID, this.tabitem.tabdata.brCID, this.tabitem.tabdata.brOID)
      let ret = await this.$icor.main.ideICORMainAction(this.tabitem.tabdata.url)
      console.log(ret)
      this.status = ret.status
      this.info = ret.info
      if (ret.status === 0) {
        this.wwwdescription = ret.WWWDescription
        let sublabel = helperActions.getActionLabelByJob('', this.tabitem.tabdata.jobtype)
        if (this.tabitem.tabdata.OID >= 0) {
          sublabel += ' [' + this.tabitem.tabdata.OID + ']'
        }
        const event = {
          tab: this.tabitem,
          label: this.wwwdescription,
          sublabel: sublabel
        }
        this.$root.$emit('set-manager-tab-info', event)
        this.refCID = ret.values['refCID']
        this.refOID = ret.values['refOID']
        this.refField = ret.values['refField']
        this.refMode = ret.values['refMode']
      }
      await this.formShow('icor', ret.fields, ret.values, false)
    },
    async formShow (action, fields, values, updateAfterSubmit) {
      const formschema = new FormSchema(action, values)
      // formschema.addField({name: '_oid', type: 'hidden'})
      for (let fielddata of fields) {
        formschema.addField(fielddata.field, fielddata.validation)
      }
      /*
      formschema.addField({name: 'UserName', type: 'hidden', icon: 'person_add', label: 'użytkownik', helper: 'wprowadź nazwę użytkownika'}, {required: true, minLength: 6, maxLength: 24}, [{icon: 'done_all', key: 'checkUsernameAvailable'}])
      formschema.addField({name: 'VCFEMail', type: 'text', icon: 'email', label: 'email', helper: 'wprowadź email'}, {required: true, maxLength: 44, email: true})
      formschema.addField({name: 'VCFPhone', icon: 'phone_android', type: 'text', label: 'nr telefonu', helper: 'wprowadź nr telefonu'}, {minLength: 9, maxLength: 15})
      formschema.addField({name: 'VCFFirstName', icon: 'person', type: 'text', label: 'imię', helper: 'wprowadź imię użytkownika'}, {required: true, minLength: 2, maxLength: 24})
      formschema.addField({name: 'VCFLastName', icon: 'person', type: 'text', label: 'nazwisko', helper: 'wprowadź nazwisko użytkownika'}, {required: true, minLength: 2, maxLength: 40})
      formschema.addField({name: 'Description', icon: 'info', type: 'text', label: 'informacje dodatkowe', helper: 'wprowadź informacje dodatkowe'}, {maxLength: 400})
      formschema.addField({type: 'separator'})
      formschema.addField({name: 'AccountDisabled', icon: 'account_box', type: 'bool', label: 'konto wyłączone', helper: 'ustaw gdy konto wyłączone'})
      formschema.addField({name: 'WWWDisabled', icon: 'vpn_key', type: 'bool', label: 'dostęp wyłączony', helper: 'ustaw gdy użytkownik ma mieć wyłączony dostęp'})
      */
      formschema.header = this.wwwdescription
      return this.$refs.thisForm.show(formschema, updateAfterSubmit, true)
    },
    async onAfter (field, key, value) {
    },
    async onSubmit (data) {
      data.values['refCID'] = this.refCID
      data.values['refOID'] = this.refOID
      data.values['refField'] = this.refField
      data.values['refMode'] = this.refMode
      let ret = await this.$icor.main.ideObjectEditFormSubmit('menuitemsubmit', this.tabitem.tabdata.MenuOID, this.tabitem.tabdata.CID, this.tabitem.tabdata.OID, this.tabitem.tabdata.brCID, this.tabitem.tabdata.brOID, data)
      console.log('icorObjectEditSheetSubmit:', ret)
      this.status = ret.status
      this.info = ret.info
      // remove...
      if (this.status === 0) {
        return
      }
      if (ret.status === 0) {
        return
      }

      if (this.$refs.thisForm.schema.action === 'new') {
        // [status, info] = await this.$icor.main.setUserInfo(this.vcffirstname, this.vcflastname, this.description)
        // this.$refs.thisForm.status = 1
      }
      if (this.$refs.thisForm.schema.action === 'update') {
        // [status, info] = await this.$icor.main.setUserInfoAdmin(this.user._oid, this.vcffirstname, this.vcflastname, this.vcfemail, this.vcfphone, this.description, this.status, this.groups)
        // this.$refs.thisForm.status = 1
      }
      if (this.$refs.thisForm.status === 0) {
        this.$root.$emit('notify-message', {message: 'Dane zostały zmienione', type: 'positive', position: 'bottom-right'})
        await this.onCancel()
      } else {
        this.$q.notify({message: this.$refs.thisForm.info, type: 'negative', position: 'bottom-right'})
      }
    },
    async onCancel () {
      this.$root.$emit('change-ICOR-URL', {
        url: '/icormanager/icormain.asp?jobtype=objectedit&CID=' + this.tabitem.tabdata.CID + '&OID=' + this.tabitem.tabdata.OID + '&brCID=' + this.tabitem.tabdata.brCID + '&brOID=' + this.tabitem.tabdata.brOID,
        removetab: this.tabitem.id
      })
    }
  }
}
</script>

<style scoped>
.q-tab {
  text-transform: none !important;
  font-size: 0.70rem !important;
}
.q-tabs-head {
  font-size: 0.70rem !important;
}

.modal-iframe {
  width: 100%;
  height: calc(100vh - 148px);
  overflow: auto;
}

.q-input-target, .q-input-shadow {
  border: 1px solid rgb(142, 175, 185) !important;
}
</style>
