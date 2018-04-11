<template>
  <v-navigation-drawer clipped fixed v-model="$store.state.sideBarOpen" app>
    <v-list dense>
      <v-list-tile @click="navigateTo({name:'Dashboard'})">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="navigateTo({name:'Login'})">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <div v-if="!$store.state.isUserLoggedIn">
        <v-list-tile @click="navigateTo({name:'Login'})">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="navigateTo({name:'Register'})">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Register</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
      <v-list-tile v-if="$store.state.isUserLoggedIn" @click="logout">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Log Out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { routing } from '@/mixins/routing'
export default {
  mixins: [routing],
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
  },
  computed: {
    showSideBar () {
      return this.$store.getters.g_sideBarOpen
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
