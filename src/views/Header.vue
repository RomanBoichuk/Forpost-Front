<template>
  <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-toolbar
      dense
      color="primary"
    >

      <v-toolbar-title>FORPOST</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        <router-link
          class="link"
          :to='transitionLink(link)'>{{ link }}
        </router-link>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>

export default {
  name: 'Header',
  components: {
  },
  data: () => ({
    links: [
      'Clients',
      'Credit Contracts',
      'Каса'
    ]
  }),
  methods: {
    transitionLink (slug) {
      const slugArray = slug.split(' ')
      const newSlug = slugArray.join('')
      return '/' + newSlug
    }
  }
}
</script>

<style scoped lang="scss">

.link{
  text-decoration: none;
  color: inherit;
}
</style>
