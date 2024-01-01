<template>
   <div>
      <q-scroll-area style="width: 100%; height: calc(100vh - 106px);">
        <div class="row">
          <div class="col-12">
            <q-table
              title=""
              :data="dataTable"
              :columns="columns"
              row-key="_OID"
              :pagination.sync="pagination"
              :rows-per-page-options="[5,10,15,20,50,100,0]"
              dense
              separator="cell"
              no-data-label="brak danych"
              no-results-label="brak wyników"
              loading-label="ładuję dane..."
              rows-per-page-label="rekordów na stronę"
              :selected-rows-label="(rowsNumber)=>`zaznaczono ${rowsNumber} pozycji`"
              :pagination-label="(start,end,total)=>`${start}-${end} z ${total}`"
            >
              <template slot="top-left" slot-scope="props">
                <q-btn color="primary" @click="fetchData" label="Odśwież dane" />
              </template>
              <q-td slot="body-cell-free" slot-scope="props" :props="props" v-if="(sid==='12') && dataTable">
                {{humanStorageSize(props.value)}}
              </q-td>
              <q-td slot="body-cell-total" slot-scope="props" :props="props" v-if="(sid==='12') && dataTable">
                {{humanStorageSize(props.value)}}
              </q-td>
              <q-td slot="body-cell-actions" slot-scope="props" :props="props" v-if="dataTable">
                <q-btn size="sm" v-for="item in props.col.actions" :key="item.action" :label="item.label" @click="actionClick(item,props)"></q-btn>
              </q-td>
            </q-table>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div v-for="item in dataItems" :key="item.meid">
              <q-list link separator multiline dense no-border>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>meid</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.meid}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>cid</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.cid}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>name</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.name}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>fieldname</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.fieldname}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>oid</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.oid}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>value</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.value}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>uid</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.uid}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="col-4">
            <div v-for="item in dataItems" :key="item.meid">
              <q-list link separator multiline dense no-border>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>isparallel</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.isparallel}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>isqueued</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.isqueued}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>pid</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.pid}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>priority</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.priority}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>status</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.status}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </div>
          </div>
          <div class="col-4">
            <div v-for="item in dataItems" :key="item.meid">
              <q-list link separator multiline dense no-border>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>eventtime</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.eventtime | date2str}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>eventtime_deleted</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.eventtime_deleted | date2str}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>eventtime_done</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.eventtime_done | date2str}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>eventtime_ready</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.eventtime_ready | date2str}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>eventtime_working</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.eventtime_working | date2str}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div v-for="item in dataItems" :key="item.meid">
              <q-list link separator multiline dense no-border>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>output</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9"><pre>{{item.output}}</pre></q-item-tile>
                  </q-item-main>
                </q-item>
                <q-item>
                  <q-item-main>
                    <q-item-tile label>result</q-item-tile>
                    <q-item-tile sublabel class="text-indigo-9">{{item.result}}</q-item-tile>
                  </q-item-main>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>

        <div class="row" v-if="(sid==='12') && dataTable && charts">
          <div class="col-4" v-for="item in charts" :key="item.id">
            <chart auto-resize :options="item"></chart>
          </div>
        </div>
      </q-scroll-area>
   </div>
</template>

<script type="text/javascript">
import { format } from 'quasar'

export default {
  name: 'Statystyki',
  props: ['id', 'tabitem'],
  data: function () {
    let ret = {
      loading: false,
      error: null,
      title: '',
      items: null,
      sid: '',

      dataLoaded: false,
      dataTable: [],
      pagination: {
        sortBy: '', // String, column "name" property value
        descending: false,
        page: 1,
        rowsPerPage: 10 // current rows per page being displayed
      },
      columns: [],
      charts: [],
      dataItems: []
    }
    return ret
  },
  mounted () {
    this.fetchData()
  },
  filters: {
    date2str (value) {
      if (!value) {
        return ''
      }
      return value.slice(0, 19).replace('T', ' ')
    }
  },
  methods: {
    humanStorageSize (v) {
      return format.humanStorageSize(v)
    },
    async fetchData () {
      // debugger
      let id, meta
      if (this.tabitem.tabid) {
        id = this.tabitem.tabid
        meta = this.tabitem.tabdata
      } else {
        id = this.id
        meta = this.$route.meta[id]
        if (this.$route.meta['stats_route']) {
          return
        }
      }
      this.sid = id
      this.error = this.post = null
      this.title = meta['title']
      this.columns = meta['columns'] || []
      this.charts = []
      this.dataTable = []
      this.dataItems = []

      let [response] = await this.$icor.main.statsGet(meta['DATA_URL'])
      // debugger
      if (response.status === 200) {
        if ((response.data === '') || (JSON.stringify(response.data) === '[]') || (JSON.stringify(response.data) === '{}')) {
          this.error = 'brak danych'
          this.$q.notify({type: 'warning', position: 'bottom-right', message: 'Brak danych.'})
          return
        }
        if (response.data.hasOwnProperty('status') && response.data.hasOwnProperty('info') && (response.data['status'] !== 0)) {
          this.error = response.data['info']
          this.$q.notify({type: 'negative', position: 'bottom-right', message: response.data['info']})
        } else {
          this.dataTable = response.data || []
          if (id === '12') {
            this.addCharts12()
          }
        }
      } else {
        this.$q.notify({type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd w komunikacji. Skontaktuj się z administratorem.'})
      }
    },
    async actionClick (action, props) {
      // console.log('ACTION:', action, props)
      if (action.mode === 'executorMethod') {
        if (action.action === 'view') {
          this.dataItems = await this.$icor.main.getExecutorMethodInfo(props.row.meid)
        }
      }
    },
    addCharts12 () {
      var chartOptions, dt, i, item
      for (i = 0; i < this.dataTable.length; i++) {
        item = this.dataTable[i]
        dt = {
          value: item.percent,
          name: 'dysk ' + item.disk + '\n' + format.humanStorageSize(item.total)
        }
        chartOptions = {
          id: i,
          backgroundColor: '#ffffff',
          color: ['#37A2DA', '#32C5E9', '#67E0E3'],
          series: [{
            name: 'Wolne miejsce na dysku',
            type: 'gauge',
            startAngle: 180,
            center: ['50%', '80%'],
            radius: 120,
            splitNumber: 12,
            endAngle: 0,
            min: 0,
            max: 100,
            axisLine: {
              show: true,
              lineStyle: {
                width: 20,
                shadowBlur: 0,
                color: [
                  [1 / 12, '#FD0000'],
                  [2 / 12, '#F82804'],
                  [3 / 12, '#FD5901'],
                  [4 / 12, '#FA9900'],
                  [5 / 12, '#FA9900'],
                  [6 / 12, '#FABB00'],
                  [7 / 12, '#FABB00'],
                  [8 / 12, '#FBC402'],
                  [9 / 12, '#B5FB02'],
                  [10 / 12, '#B5FB02'],
                  [11 / 12, '#05FA1D'],
                  [12 / 12, '#05FA1D']
                ]
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              fontSize: 25,
              formatter: function (param) {
                if ((param % 5) === 0) {
                  return param
                }
              }
            },
            splitLine: {
              show: true,
              length: 20,
              lineStyle: {
                color: 'white',
                width: 2
              }
            },
            pointer: {
              show: true,
              length: '70%'
            },
            itemStyle: {
              normal: {
                color: '#FFFFFF',
                borderColor: '#92DAFF',
                borderWidth: '2'
              }
            },
            detail: {
              show: false,
              offsetCenter: [0, 10],
              textStyle: {
                fontSize: 30,
                fontFamily: 'Arial',
                fontWeight: 'bold',
                color: '#6495ED'
              }
            },
            data: [
              dt
            ]
          }]
        }
        this.charts.push(chartOptions)
      }
    }
  }
}
</script>

<style scoped>
.echarts {
  height: 200px;
  width: 30vw;
}
/*
.q-data-table table td, .q-data-table table th {
  white-space: pre-wrap !important;
}
*/
</style>
