<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'UserPages',
  mounted () {
    this.$icor.main.checkSession()
  }
}
</script>

<style>
</style>
