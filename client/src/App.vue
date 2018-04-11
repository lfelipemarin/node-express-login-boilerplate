<template>
  <v-app id="app" dark>
    <page-header></page-header>
    <side-bar v-if="$store.state.isUserLoggedIn"></side-bar>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017 Demand Frontier</span>
    </v-footer>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import SideBar from '@/components/Sidebar.vue'
export default {
  name: 'App',
  components: {
    PageHeader,
    SideBar
  },
  data: () => ({
    drawer: null
  }),
  methods: {
    // navigateTo (route) {
    //   this.$router.push(route)
    // },
    // logout () {
    //   this.$store.dispatch('setToken', null)
    //   this.$store.dispatch('setUser', null)
    //   this.$router.push({
    //     name: 'Root'
    //   })
    // }
  }
}
</script>

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
.toolbar__title {
  cursor: pointer;
}

.toolbar__title:hover {
  color: #1976d2;
}
</style>
