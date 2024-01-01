<template>
  <div>
      <q-toolbar inverted>
        <q-toolbar-title>
          Geolokalizacja
          <span slot="subtitle">
            Kliknij dwukrotnie na mapie by dodać marker. Kliknij dwukrotnie na tytuł markera by zmienić jego opis. Przeciągnij marker by zmienić jego pozycję.
          </span>
        </q-toolbar-title>
      </q-toolbar>
      <br>
      <leaflet-map :markers="dataItems" @marker-add="markerAdd" @marker-create="markerCreate" @marker-update-position="markerUpdatePosition" @marker-delete="markerDelete" @marker-update-title="markerUpdateTitle" :defaultlat="defaultlat" :defaultlon="defaultlon" v-if="dataLoaded"></leaflet-map>
  </div>
</template>

<script type="text/javascript">
import LeafletMap from './leafletMap'

export default {
  name: 'CardGeo',
  props: {
    tabname: {
      type: String
    },
    tabitem: {
      type: Object
    },
    dbitem: {
      type: Object
    },
    defaultlat: {
      type: Number,
      default: 53.43819
    },
    defaultlon: {
      type: Number,
      default: 14.54228
    }
  },
  data () {
    return {
      dataItemsByOID: null,
      dataItems: [],
      dataLoaded: false
    }
  },
  created () {
    this.$root.$on('change-ICOR-tabs', this.changeICORTabs)
  },
  beforeDestroy () {
    this.$root.$off('change-ICOR-tabs', this.changeICORTabs)
  },
  components: {
    LeafletMap
  },
  methods: {
    async dataLoad () {
      this.dataItemsByOID = {}
      this.dataItems = await this.$icor.main.geolokalizacjaLoad(this.dbitem)
      this.dataLoaded = true
    },
    getMarkerDataByID (mid) {
      for (var i = 0; i < this.dataItems.length; i++) {
        if (this.dataItems[i].mid === mid) {
          return {i: i, marker: this.dataItems[i]}
        }
      }
      return {i: -1, marker: null}
    },
    getMarkerDataByOID (oid) {
      for (var i = 0; i < this.dataItems.length; i++) {
        if (this.dataItems[i]._oid === oid) {
          return {i: i, marker: this.dataItems[i]}
        }
      }
      return {i: -1, marker: null}
    },
    async markerAdd (lat, lng, title) {
      let marker = {
        _oid: '',
        title: title,
        lat: lat.toString(),
        lng: lng.toString(),
        mid: -1
      }
      let response = await this.$icor.main.geolokalizacjaSave(this.dbitem, marker)
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania markera: ' + response.data.errors[0].info})
        return
      }
      marker['_oid'] = response.data.data._oid
      this.dataItems.push(marker)
    },
    markerCreate (oid, mid, lat, lng) {
      let {marker} = this.getMarkerDataByOID(oid)
      if (marker === null) {
        return
      }
      marker.mid = mid
      marker.lat = lat.toString()
      marker.lng = lng.toString()
    },
    async markerUpdatePosition (mid, lat, lng) {
      let {marker} = this.getMarkerDataByID(mid)
      if (marker === null) {
        return
      }
      marker.lat = lat.toString()
      marker.lng = lng.toString()
      let response = await this.$icor.main.geolokalizacjaSave(this.dbitem, marker)
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania markera: ' + response.data.errors[0].info})
      }
    },
    async markerUpdateTitle (mid, title) {
      let {marker} = this.getMarkerDataByID(mid)
      if (marker === null) {
        return
      }
      marker.title = title
      let response = await this.$icor.main.geolokalizacjaSave(this.dbitem, marker)
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas zapamiętywania markera: ' + response.data.errors[0].info})
      }
    },
    async markerDelete (mid) {
      let {i, marker} = this.getMarkerDataByID(mid)
      if (marker === null) {
        return
      }
      this.dataItems.splice(i, 1)
      let response = await this.$icor.main.geolokalizacjaDelete(this.dbitem, marker)
      if (response.data.errors) {
        this.$root.$emit('notify-message', {type: 'negative', position: 'bottom-right', message: 'Wystąpił błąd podczas usuwania markera: ' + response.data.errors[0].info})
      }
    },
    changeICORTabs (event) {
      if (event.tabitem.id !== this.tabitem.id) {
        return
      }
      if (event.tabname === this.tabname) {
        if (this.dataLoaded) {
          return
        }
        if ((this.dbitem.oid === '') || (this.dbitem.tid === '') || (this.dbitem.poid === '')) {
          return
        }
        this.dataLoad()
      }
    }
  },
  watch: {
    'dbitem.oid': {
      handler: function (vnew, vold) {
        this.dataLoaded = false
        this.dataItems = []
        this.dataItemsByOID = {}
      },
      deep: true
    }
  }
}
</script>

<style scoped>
</style>
