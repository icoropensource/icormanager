<template>
  <q-card inline style="width: 25vw;" class="cursor-pointer q-mb-md q-ml-md" @click.native="doClick" :color="backgroundColor">
    <q-card-title>
      <q-icon :name="iconName" size="28pt" /> {{title}}
    </q-card-title>
    <q-card-separator />
    <q-card-main>
      {{description}}
    </q-card-main>
  </q-card>
</template>

<script type="text/javascript">
export default {
  props: ['title', 'description', 'backgroundColor', 'iconName', 'link'],
  data () {
    return {
      options: {
        separator: '.'
      }
    }
  },
  methods: {
    doClick () {
      this.$router.push(this.link)
    }
  }
}
</script>
<style scoped>
</style>
