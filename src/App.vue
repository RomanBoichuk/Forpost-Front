<template>
  <div id="app">
    <v-app>
      <Header/>
      <v-main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/views/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
