<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="toggleSideBar"></v-toolbar-side-icon>
    <v-toolbar-title @click="navigateTo({name:'Root'})">Client Portal</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
      <v-btn flat dark @click="navigateTo({name:'Register'})">Register</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
      <v-btn flat dark @click="navigateTo({name:'RegisterCompany'})">Register Company</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
      <v-btn flat dark @click="navigateTo({name:'Login'})">Log In</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="$store.state.isUserLoggedIn">
      <v-btn flat dark @click="logout">Log Out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mixin } from '@/mixins/mixins'
export default {
  data: () => ({
    drawers: false
  }),
  mixins: [mixin],
  methods: {
    toggleSideBar () {
      this.$store.commit('toggleSideBar')
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
