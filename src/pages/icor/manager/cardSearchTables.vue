<template>
  <div>
      <div class="row">
        <div class="col">
          <q-scroll-area style="width: 100%; height: calc(70vh - 106px);">

            <q-list link dense separator v-show="items.length>0">
              <q-list-header>Wybierz wyszukiwarkę, która ma zostać wstawiona w edytorze:</q-list-header>
              <q-item v-for="item in items" :key="item.oid" @click.native="itemClick(item)">
                <q-item-side icon="view_list">
                </q-item-side>
                <q-item-main :label="item.name+' ('+item.oid+')'" :sublabel="item.table">
                </q-item-main>
              </q-item>
            </q-list>

          </q-scroll-area>
        </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CardSearchTables',
  props: {
    tabitem: {
      type: Object,
      default () {
        return {}
      }
    },
    asdialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  data () {
    return {
      items: [],
      eventdata: {}
    }
  },
  computed: {
    ...mapGetters([])
  },
  mounted () {
  },
  methods: {
    ...mapMutations([]),
    itemClick (item) {
      this.$emit('submit', item)
    },
    modalShow (data) {
      this.eventdata = data
      this.items = []
      this.fetchData()
    },
    async fetchData () {
      const data = {
        mode: 'tablesload',
        oid: this.eventdata.ioid,
        tid: this.eventdata.tid,
        poid: this.eventdata.poid,
        chapterid: this.eventdata.chapterid
      }
      const l = await this.$icor.main.tablesLoad(data)
      if (l instanceof Array) {
        this.items = l.filter(d => d.checked)
      } else {
        this.items = []
      }
      if (this.items.length === 0) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Brak przypisanych tabel do tego wpisu w rozdziale.'})
      }
    },
    onAttach () {
      this.$emit('submit', {})
    },
    onClose () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
</style>
