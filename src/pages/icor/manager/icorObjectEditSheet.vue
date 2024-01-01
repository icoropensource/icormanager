<template>
  <div>
    <icorObjectEditSheetToolbar :tabitem="tabitem" :sheetinfo="sheetinfo" :menus="menus" :wwwdescription="wwwdescription" :imgsrc="imgsrc" @refresh="fetchData"/>
    <q-scroll-area style="width: 100%; height: calc(100vh - 202px);">
      <div class="row q-pt-xs q-pb-xs selectable" style="border-bottom: 1px dotted #bbb;">
      </div>
      <div class="row q-pt-xs q-pb-xs selectable" v-for="field in fields" :key="field.Name" style="border-bottom: 1px dotted #bbb;" v-if="!isFieldEmpty(field)">
        <div class="col-4 text-right q-pr-sm">
          <icorObjectEditSheetFieldName :field="field" />
        </div>
        <div class="col-8 q-pl-sm" v-if="(field.IsMemo===0) && (field.IsTable===0)" style="font-size: 0.8rem;">
          <div v-if="field.FieldTypeID===32"> <!-- mt_Integer -->
            {{field.Value}}
          </div>
          <div v-else-if="field.FieldTypeID===64"> <!-- mt_Double -->
            {{field.Value}}
          </div>
          <div v-else-if="field.FieldTypeID===96"> <!-- mt_DateTime -->
            {{getTupleAsDateTimeStr(field.Value)}}
          </div>
          <div v-else-if="field.FieldTypeID===112"> <!-- mt_Boolean -->
            <span v-if="field.Value">Tak</span>
            <span v-else>Nie</span>
          </div>
          <div v-else-if="field.FieldTypeID===144"> <!-- mt_String -->
            <div v-if="field.IsMemo">
              <pre>
                {{field.Value}}
              </pre>
            </div>
            <div v-else>
              {{field.Value}} <!-- <q-input suffix="@gmail.com" v-model="model" /> -->
            </div>
          </div>
          <div v-else-if="field.FieldTypeID>255"> <!-- MAX_ICOR_SYSTEM_TYPE -->
            <div v-if="field.FieldEditor==='ObjectsList'">
              <q-btn dense color="indigo-1" text-color="black" size="sm" class="text-no-transform q-ma-xs" v-for="value in field.Value" :key="value.ValueLink" @click="objectClick(value)">{{value.Value}}</q-btn>
            </div>
            <div v-else-if="field.WWWSingleValue===1">
              <q-btn dense color="indigo-1" text-color="black" size="sm" class="text-no-transform q-ma-xs" v-for="value in field.Value" :key="value.ValueLink" @click="objectClick(value)">{{value.Value}}</q-btn>
            </div>
            <div v-else>
              nieznane dane..
            </div>
          </div>
          <div v-else> <!-- unknown type -->
            nieznany typ [{{field.FieldTypeID}}]: {{field.Value}}
          </div>
        </div>
        <div class="col-12 q-pl-sm" v-if="field.IsMemo===1">
          <div v-if="field.FieldTypeID===144"> <!-- mt_String -->
            <codemirror v-model="field.Value" :options="cmOptions" v-if="field.Value!==''"></codemirror>
          </div>
          <div v-else> <!-- unknown type -->
            nieznany typ dla memo [{{field.FieldTypeID}}]: {{field.Value}}
          </div>
        </div>
        <div class="col-12 q-pl-sm" v-if="field.IsTable===1">
          <q-table title="" :data="field.Values" :columns="field.columns" row-key="_OID" :pagination.sync="field.pagination" :filter="field.tableFilter"
            :rows-per-page-options="[5,10,20,25,50,100,0]" dense separator="cell" no-data-label="brak danych" no-results-label="brak wyników"
            loading-label="ładuję dane..." rows-per-page-label="rekordów na stronę" :selected-rows-label="(rowsNumber)=>`zaznaczono ${rowsNumber} pozycji`"
            :pagination-label="(start,end,total)=>`${start}-${end} z ${total}`" :filter-method="(rows, terms, cols, cellValue) => tableFilter(field, rows, terms, cols, cellValue)"
            v-if="field.Values.length>0"
            >
            <template slot="top-right" slot-scope="props">
              <q-select class="col-5 q-pl-sm" @input="val => selectChange(field, val)" v-model="field.GroupSel" :options="field.Groups" multiple toggle chips separator :clearable="field.GroupSel.length>1" filter filter-placeholder="filtruj..." prefix="grupuj w/g: " v-if="field.Groups.length>0" style="max-width:70%;" />
              <span class="col-1 q-pl-sm">&nbsp;</span>
              <q-search class="col-5 q-pl-sm" color="secondary" placeholder="szukaj.." clearable v-model="field.tableFilter" />
            </template>
            <q-tr slot="header" slot-scope="props" :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="q-title bg-indigo-1 text-weight-bold" style="white-space:normal;">
                {{ col.label }}
              </q-th>
            </q-tr>
            <q-tr slot="body" slot-scope="props" :props="props" @click.native="rowClick(props)" class="cursor-pointer">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <div v-if="col.name==='Grupa'">
                  <q-chip v-if="col.value!==''" dense color="positive">{{ col.value }}</q-chip>
                </div>
                <span v-else-if="col.value.constructor!==Array" style="font-size: 0.8rem;">{{ col.value }}</span>
                <q-btn v-else dense outline color="black" size="sm" class="text-no-transform q-ma-xs" v-for="value in col.value" :key="value._OID" @click="objectClick(value)">{{value.Value}}</q-btn>
              </q-td>
            </q-tr>
          </q-table>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

// language
import 'codemirror/mode/python/python.js'
// theme css
import 'codemirror/theme/xq-light.css'

// require active-line.js
import 'codemirror/addon/selection/active-line.js'
// closebrackets
import 'codemirror/addon/edit/closebrackets.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/emacs.js'
import 'codemirror/addon/search/jump-to-line.js'

import icorObjectEditSheetToolbar from './icorObjectEditSheetToolbar.vue'
import icorObjectEditSheetFieldName from './icorObjectEditSheetFieldName.vue'

export default {
  name: 'ICORObjectEditSheet',
  props: {
    sheetid: {
      type: Number
    },
    tabitem: {
      type: Object
    },
    sheet: {
      type: Object
    },
    menus: {
      type: Array
    },
    wwwdescription: {
      type: String
    },
    imgsrc: {
      type: String
    }
  },
  components: {
    icorObjectEditSheetToolbar,
    icorObjectEditSheetFieldName,
    codemirror
  },
  data () {
    return {
      fields: [],
      sheetinfo: {},
      cmOptions: {
        tabSize: 3,
        indentUnit: 3,
        readOnly: true,
        spellcheck: false,
        autocorrect: false,
        autocapitalize: false,
        mode: {
          name: 'text/x-python',
          json: true,
          version: 2
        },
        theme: 'xq-light',
        lineNumbers: true,
        line: true,
        autoCloseBrackets: true,
        styleActiveLine: true
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  computed: {
    ...mapGetters(['getICORURL'])
  },
  methods: {
    getTupleAsDateTimeStr (value) {
      return this.$icor.data.getTupleAsDateTimeStr(value)
    },
    selectChange (field, val) {
      // console.log(field, val)
      field.tableFilter = '*'
    },
    tableFilter (field, rows, terms, cols, cellValue) {
      // console.log('field:', field, 'rows:', rows, 'terms:', terms, 'cols:', cols, 'cellValue:', cellValue)
      const lowerTerms = terms ? terms.toLowerCase() : ''
      return rows.filter(
        row => cols.some(
          col => field.IsTable && (field.Groups.length > 0) && (field.GroupSel.length > 0) ? field.GroupSel.includes(row.Grupa) && ((terms === '*') || ((cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)) : (terms === '*') || ((cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1)
        )
      )
    },
    async fetchData () {
      this.fields = []
      this.sheetinfo = {}
      let ret = await this.$icor.main.ideObjectEditSheet(this.tabitem.tabdata.jobtype, this.tabitem.tabdata.CID, this.tabitem.tabdata.OID, this.tabitem.tabdata.brCID, this.tabitem.tabdata.brOID, this.sheetid)
      // console.log('ICORObjectEditSheet:', ret)
      if (ret.status === 0) {
        this.fields = ret.data.fields
        this.sheetinfo = ret.data.sheet
      }
    },
    isFieldEmpty (field) {
      if (field.IsTable === 1) {
        return field.Values.length < 1
      }
      if (field.IsMemo === 1) {
        return field.Value === ''
      }
      if (field.FieldTypeID > 255) {
        return field.Value.length < 1
      }
      if (field.FieldTypeID === 144) { // mt_String
        return field.Value === ''
      }
      if (field.FieldTypeID === 96) { // mt_DateTime
        return (field.Value.length < 1) || (field.Value[0] <= 1900)
      }
      return false
    },
    rowClick (props) {
      this.$nextTick(function () {
        let nurl = this.getICORURL + '/icormanager/' + props.row._Link
        this.$root.$emit('change-ICOR-URL', {url: nurl})
      })
    },
    objectClick (value) {
      this.$nextTick(function () {
        let nurl = this.getICORURL + '/icormanager/' + value.ValueLink
        // console.log(nurl)
        this.$root.$emit('change-ICOR-URL', {url: nurl})
      })
    }
  }
}
</script>

<style scoped>
.q-table-container {
  box-shadow: none;
}

.text-no-transform {
  text-transform: none !important;
}
</style>
