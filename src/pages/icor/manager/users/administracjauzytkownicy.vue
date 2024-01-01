<template>
  <div>
    <q-scroll-area style="width: 100%; height: calc(100vh - 106px);">
      <tableusers mode="admin"></tableusers>
    </q-scroll-area>
  </div>
</template>

<script type="text/javascript">
import tableusers from 'components/user/tableusers'

export default {
  name: 'UstawieniaAdministracjaUzytkownicy',
  components: {
    tableusers
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
