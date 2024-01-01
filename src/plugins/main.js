import Vuelidate from 'vuelidate'
import VueClipboard from 'vue-clipboard2'
import VueDragula from 'vue-dragula'
import 'highlight/lib/vendor/highlight.js/styles/default.css'
import 'vue-dragula/styles/dragula.css'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
import 'leaflet/dist/leaflet.css'

import ECharts from 'vue-echarts/components/ECharts'
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'

export default ({ app, store, Vue }) => {
  console.log('ENV:', process.env)
  Vue.use(Vuelidate)
  Vue.use(VueClipboard)
  Vue.use(VueDragula)
  Vue.use(Viewer)
  Vue.component('chart', ECharts)
}
