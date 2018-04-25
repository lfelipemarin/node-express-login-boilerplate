<template>
  <v-layout column class="pt-4">
    <v-flex xs6 offset-xs3>
      <div class="elevation-2">
        <v-toolbar flat dense dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          <div class="error" v-html="error"></div>
          <br>
          <v-btn @click="login">Login</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        console.log(response)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setCompany', response.data.company)
        this.$router.push({
          name: 'Dashboard'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
