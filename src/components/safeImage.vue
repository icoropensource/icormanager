<template>
  <img class="q-item-image" :src="imgsrc"  @error="setError()" v-if="imgsrc">
</template>

<script type="text/javascript">
export default {
  name: 'SafeImage',
  props: [
    'src',
    'altsrc'
  ],
  data () {
    return {
      imgsrc: ''
    }
  },
  created () {
    this.imgsrc = this.src
  },
  methods: {
    setError () {
      this.imgsrc = this.altsrc
    }
  }
}
</script>
<style scoped>
</style>
