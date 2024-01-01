<template>
  <div>
    <q-btn-dropdown size="0.8rem" flat dense no-caps :label="field.FieldNameAsDisplayed" color="primary" align="right" style="text-align:right;">
      <q-list>
        <q-item v-close-overlay v-if="field.FieldDescription">
          <q-item-side icon="info" color="primary" />
          <q-item-main>
            <q-item-tile label>{{field.FieldDescription}}</q-item-tile>
            <!--
            <q-item-tile sublabel>February 22, 2016</q-item-tile>
            -->
          </q-item-main>
        </q-item>
        <q-item v-close-overlay>
          <q-item-side icon="web" color="primary" />
          <q-item-main>
            <q-item-tile label>{{field.Name}}</q-item-tile>
            <q-item-tile sublabel>[{{field.FieldOID}}]<span v-if="field.FieldEditor && (field.FieldEditor!=='None')"> edytor: {{field.FieldEditor}}</span>
              <!--
               de_None: result := 'None';
               de_String: result := 'String';
               de_Integer: result := 'Integer';
               de_Float: result := 'Float';
               de_EFloat: result := 'EFloat';
               de_Date: result := 'Date';
               de_Time: result := 'Time';
               de_DateTime: result := 'DateTime';
               de_Bool: result := 'Bool';
               de_Currency: result := 'Currency';

               de_Repository: result := 'Repository';
               de_Class: result := 'Class';
               de_ClassField: result := 'ClassField';
               de_ClassMethod: result := 'ClassMethod';
               de_FieldValues: result := 'FieldValues';
               de_MethodName: result := 'MethodName';
               de_ObjectsList: result := 'ObjectsList';
               de_Summary: result := 'Summary';
               de_ObjectsView: result := 'ObjectsView';

               de_File: result := 'File';
               de_Directory: result := 'Directory';
               de_URL: result := 'URL';
               de_Password: result := 'Password';
               de_HTML: result := 'HTML';
               de_Worksheet: result := 'Worksheet';
               de_XML: result := 'XML';
               de_SourceCode: result := 'SourceCode';
              -->
            </q-item-tile>
          </q-item-main>
        </q-item>
        <q-item v-close-overlay>
          <q-item-side icon="folder" color="primary" />
          <q-item-main>
            <q-item-tile label>
              {{field.FieldType}}
            </q-item-tile>
            <q-item-tile sublabel>[{{field.FieldTypeID}}]<span v-if="field.IsMemo"> (tekst/opis/lista)</span></q-item-tile>
          </q-item-main>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script type="text/javascript">

export default {
  name: 'ICORObjectEditSheetFieldName',
  props: {
    field: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.q-btn-inner {
  width: 90% !important;
}
</style>
