<template>
  <iframe
    ref="myframe"
    v-on:load="frameSrcChange($event)"
    class="myframe"
    frameborder="0"
    width="100%"
    marginheight="0"
    marginwidth="0"
    scrolling="auto"
  >
  </iframe>
</template>

<script type="text/javascript">
export default {
  name: 'TabIFrame',
  props: {
    url: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: -1
    },
    tabitem: {
      type: Object
    },
    ownertab: {
      type: String,
      default: ''
    }
  },
  mounted () {
    // console.log('iframe mount: ' + this.url)
    this.$refs.myframe.setAttribute('src', this.url)
  },
  data () {
    return {
      fromStart: true
    }
  },
  methods: {
    frameSrcChange (event) {
      let dp = {
        type: 'tabInfo',
        ownerTab: this.ownertab,
        ownerSheet: this.tabitem.name
      }
      this.$refs.myframe.contentWindow.postMessage(dp, '*')
      let url = event.srcElement.src
      if (url === '') {
        return
      }
      // console.log('FRAME CHANGE: ' + this.tabitem.id + ' - ' + event.srcElement.src)
      // this.$q.notify({type: 'positive', position: 'bottom-left', message: 'Zakładka załadowana: ' + this.tabitem.label, timeout: 400})
      if (this.fromStart) {
        return
      }
      // console.log(this.tabitem)
      // debugger
      if ((url.search(/\?jobtype=objectedit&/) >= 0) || (url.search(/\?jobtype=sheetget&/) >= 0)) {
        this.hideTabs(true)
        return
      }
      if ((url.search(/_so\.asp\?/) >= 0) || (url.search(/_sot\.asp\?/) >= 0)) {
        this.hideTabs(false)
        return
      }
      this.hideTabs(true)
    }
  },
  watch: {
    url () {
      // console.log('frame url changed: ' + this.url)
    }
  }
}
</script>

<style scoped>
.myframe {
   overflow:hidden;
  height: calc(100% - 4px);
   width:100%;
}
</style>
