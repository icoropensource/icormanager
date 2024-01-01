<template>
  <div class="row">
    <div class="col-4 q-pa-sm">
      <q-list separator multiline dense> <!-- v-show="markers.length>0" -->
        <q-item>
          <q-item-side icon="home" color="primary" />
          <q-item-main>
            <q-item-tile label class="cursor-pointer" @click.native="clickHome()">Widok domyślny
              <q-popover>{{defaultlat}} : {{defaultlon}}
              </q-popover>
            </q-item-tile>
            <!-- <q-item-tile sublabel>{{defaultlat}} : {{defaultlon}}</q-item-tile> -->
          </q-item-main>
        </q-item>
        <q-item v-for="item in markers" :key="item._oid">
          <q-item-side icon="room" color="primary" />
          <q-item-main>
            <q-item-tile label class="cursor-pointer" @click.native="clickMarker(item)" @dblclick.native="dblClickMarker(item)">
              {{item.title}}
              <q-popover>{{item.lat}} : {{item.lng}}
              </q-popover>
            </q-item-tile>
            <!-- <q-item-tile sublabel>{{item.lat}} : {{item.lng}}</q-item-tile> -->
          </q-item-main>
          <q-item-side right icon="close" color="red" class="cursor-pointer" @click.native="deleteMarker(item)"/>
        </q-item>
      </q-list>
    </div>
    <div class="col q-pa-sm">
      <div class="leaflet-map" ref="mymap">
      </div>
    </div>
  </div>
</template>

<script>
import 'leaflet-map'
import * as L from 'leaflet'

export default {
  name: 'leaflet-map',
  props: {
    markers: {
      type: Array,
      default () {
        return []
      }
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
      map: null,
      info: 'mapka'
    }
  },
  mounted () {
    // L.Icon.Default.imagePath = 'assets/vendor/leaflet' TODO: make it work with webpack
    L.Icon.Default.imagePath = 'statics/markers/'
    this.map = L.map(this.$refs.mymap, {
      doubleClickZoom: false
    }).setView([this.defaultlat, this.defaultlon], 15)
    L.tileLayer('//{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
    this.map.on('dblclick', this.onMapDblClick)
    this.mergeData()
  },
  updated () {
    this.mergeData()
  },
  activated () {
    this.mergeData()
  },
  beforeDestroy () {
    this.map.remove()
    this.map = null
  },
  methods: {
    clickHome () {
      this.map.setView([this.defaultlat, this.defaultlon], 15)
    },
    async onMapDblClick (ev) {
      try {
        let data = await this.$q.dialog({
          title: 'Nowy marker',
          message: 'Wprowadź opis punktu na mapie:',
          prompt: {
            model: '',
            type: 'text'
          },
          cancel: true,
          color: 'secondary'
        })
        if (data) {
          this.addMarker(ev.latlng.lat, ev.latlng.lng, data, true)
        }
      } catch (e) {
      }
    },
    getMData () {
      var dmdata = {}
      for (var i = 0; i < this.markers.length; i++) {
        if (this.markers[i].mid !== -1) {
          dmdata[this.markers[i].mid] = this.markers[i]
        }
      }
      return dmdata
    },
    getMarkers () {
      var dmarkers = {}
      var lmarkers = []
      this.map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          dmarkers[layer._leaflet_id] = layer
          lmarkers.push(layer)
        }
      })
      return {dmarkers: dmarkers, lmarkers: lmarkers}
    },
    createMarker (lat, lng, title, showpopup = false) {
      let marker = L.marker([lat, lng], {draggable: true, title: title, opacity: 0.85})
        .addTo(this.map)
        .on('moveend', this.onMarkerMoved)
        .bindPopup(title)
      if (showpopup) {
        marker.openPopup()
      }
      return marker
    },
    mergeData () {
      var mdata, marker, i
      let dmdata = this.getMData()
      let {lmarkers} = this.getMarkers()
      for (i = 0; i < lmarkers.length; i++) {
        marker = lmarkers[i]
        if (!(marker._leaflet_id in dmdata)) {
          this.map.removeLayer(marker)
        }
      }
      for (i = 0; i < this.markers.length; i++) {
        mdata = this.markers[i]
        if (mdata.mid === -1) {
          marker = this.createMarker(mdata.lat, mdata.lng, mdata.title)
          this.$emit('marker-create', mdata._oid, marker._leaflet_id, marker._latlng.lat, marker._latlng.lng)
        }
      }
    },
    addMarker (lat, lng, title, showpopup = false) {
      this.$emit('marker-add', lat, lng, title)
    },
    onMarkerMoved (ev) {
      let marker = ev.target.dragging._marker
      this.$emit('marker-update-position', marker._leaflet_id, marker._latlng.lat, marker._latlng.lng)
    },
    clickMarker (mdata) {
      this.map.setView([mdata.lat, mdata.lng], 15)
      let {dmarkers} = this.getMarkers()
      let marker = dmarkers[mdata.mid]
      if (!marker) {
        return
      }
      marker.openPopup()
    },
    async dblClickMarker (mdata) {
      try {
        let data = await this.$q.dialog({
          title: 'Edycja markera',
          message: 'Wprowadź opis punktu na mapie:',
          prompt: {
            model: mdata.title,
            type: 'text'
          },
          cancel: true,
          color: 'secondary'
        })
        if (data) {
          let {dmarkers} = this.getMarkers()
          let marker = dmarkers[mdata.mid]
          if (!marker) {
            return
          }
          this.$emit('marker-update-title', mdata.mid, data)
          let popup = marker.getPopup()
          popup.setContent(data)
        }
      } catch (e) {
      }
    },
    async deleteMarker (mdata) {
      try {
        await this.$q.dialog({
          title: 'Potwierdzenie',
          message: 'Czy usunąć marker: ' + mdata.title + ' ?',
          ok: 'tak',
          cancel: 'nie',
          color: 'secondary'
        })
        this.$emit('marker-delete', mdata.mid)
      } catch (e) {
      }
    }
  },
  watch: {
    '$props': {
      handler: function (val, oldVal) {
        this.mergeData()
      },
      deep: true
    }
  }

}
</script>

<style scoped>
  .leaflet-map {
    height: 70vh;
  }
</style>
