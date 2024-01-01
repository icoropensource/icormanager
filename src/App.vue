<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext }) {
    // fetch data, validate route and optionally redirect to some other route...
    // ssrContext is available only server-side in SSR mode
    // No access to "this" here as preFetch() is called before
    // the component gets instantiated.
    // Return a Promise if you are running an async job
    // Example:
    // return store.dispatch('fetchItem', currentRoute.params.id)
    // console.log('app prefetch')
  },
  created () {
    this.$root.$on('loadingShow', this.loadingShow)
    this.$root.$on('loadingHide', this.loadingHide)
  },
  methods: {
    loadingShow (event) {
      this.$q.loading.show({
        delay: 500
      })
    },
    loadingHide (event) {
      this.$q.loading.hide()
    }
  }
}
</script>

<style>
/*
a:-webkit-any-link {
  text-decoration: none !important;
}
*/
</style>
