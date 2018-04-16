<template>
  <v-navigation-drawer clipped fixed :mini-variant.sync="mini" v-model="$store.state.sideBarOpen" app>
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list dense>
      <v-list-tile @click="navigateTo({name:'Dashboard'})">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile @click="navigateTo({name:'Settings'})">
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
            <v-icon>perm_identity</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="navigateTo({name:'Register'})">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
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
import { mixin } from '@/mixins/mixins'
export default {
  data () {
    return {
      mini: true
    }
  },
  mixins: [mixin],
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
