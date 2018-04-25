<template>
  <v-layout column class="pt-4">
    <v-flex xs6 offset-xs3>
      <div class="elevation-2">
        <v-toolbar flat dense dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="First Name" v-model="firstName"></v-text-field>
          <v-text-field label="Last Name" v-model="lastName"></v-text-field>
          <v-text-field label="Email" v-model="email"></v-text-field>
          <v-text-field label="Password" type="password" v-model="password"></v-text-field>
          <v-text-field label="Company" type="text" v-model="company"></v-text-field>
          <v-text-field label="Select Avatar" @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
          <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
          <div class="error" v-html="error"></div>
          <br>
          <v-btn @click="register">Register</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
// import UploadService from '@/services/UploadService'
export default {
  name: 'Register',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      company: '',
      role: 'client',
      avatar: '',
      imageName: '',
      imageUrl: '',
      imageFile: '',
      error: null
    }
  },
  methods: {
    pickFile () {
      this.$refs.image.click()
    },

    onFilePicked (e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
    async register () {
      try {
        var formData = new FormData()
        formData.append('firstName', this.firstName)
        formData.append('lastName', this.lastName)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('company', this.company)
        formData.append('role', this.role)
        formData.append('avatar', this.imageFile)
        // const responseAvatar = await UploadService.uploadAvatar()
        const response = await AuthenticationService.register(formData)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setCompany', response.data.company)
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
