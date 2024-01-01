<template>
  <q-card flat>
    <q-card-title v-if="title">
      {{title}}
      <slot name="title"></slot>
    </q-card-title>
    <q-card-separator v-if="separator"/>
    <q-card-main>
      <slot name="content"></slot>
    </q-card-main>
    <q-card-separator v-if="footer"/>
    <q-card-actions v-if="footer">
      <slot name="footer"></slot>
    </q-card-actions>
  </q-card>
</template>

<script type="text/javascript">
import {
  QCard,
  QCardTitle,
  QCardSeparator,
  QCardMain,
  QCardActions
} from 'quasar'

export default {
  name: 'CardInTab',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    separator: {
      type: Boolean,
      default: false
    },
    footer: {
      type: String,
      default: ''
    },
    userData: {
      type: Object
    }
  },
  components: {
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QCardActions
  },
  data () {
    return {
      userAlbums: [],
      selectedAlbum: ''
    }
  },
  computed: {
    filteredAlbums () {
      return this.userAlbums.slice(0, 3)
    }
  },
  methods: {
    change (album) {
      this.$emit('input', album)
    }
  },
  watch: {
    userData () {
    }
  }
}
</script>

<style scoped>
</style>
