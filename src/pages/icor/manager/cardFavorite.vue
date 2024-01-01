<template>
  <div>
      <q-toolbar inverted>
        <q-toolbar-title>
          Zakładki i odnośniki
          <span slot="subtitle">
            lista zakładek i odnośników do wykorzystania
          </span>
        </q-toolbar-title>
      </q-toolbar>
      <q-scroll-area class="fit">
        <q-list separator multiline ref="tabslist" v-dragula="tabs.items" bag="tabs-bag" v-if="tabsExists">
          <q-item v-for="item in tabs.items" :key="item.id">
            <q-item-side><q-chip color="primary" class="handle cursor-pointer" ><q-icon color="bg-primary" :name="item.icon" class="handle cursor-pointer"/></q-chip></q-item-side>
            <q-item-main>
              <q-item-tile label class="cursor-pointer" @click.native="tabs.selected=item.name" v-html="item.label"></q-item-tile>
              <q-item-tile sublabel>{{item.actionlabel}} {{item.sublabel}}</q-item-tile>
            </q-item-main>
            <q-item-side right icon="close" color="red" class="cursor-pointer" @click.native="removeTab(item)"/>
          </q-item>
        </q-list>
      </q-scroll-area>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'CardFavorite',
  props: {
    tabs: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  computed: {
    tabsExists () {
      return this.tabs.items.length > 0
    }
  },
  methods: {
    removeTab (item) {
      this.$root.$emit('remove-manager-tab', {
        tab: item
      })
    }
  }
}
</script>

<style scoped>
</style>
