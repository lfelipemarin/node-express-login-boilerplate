<template>
  <v-layout column class="pt-4">
    <v-flex xs6 offset-xs3>
      <div class="elevation-2">
        <v-toolbar flat dense dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field label="Company Name" v-model="name"></v-text-field>
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
import CompaniesService from '@/services/CompaniesService'
// import UploadService from '@/services/UploadService'
export default {
  name: 'RegisterCompany',
  data () {
    return {
      name: '',
      logo: '',
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
        formData.append('name', this.name)
        formData.append('logo', this.imageFile)
        // const responseAvatar = await UploadService.uploadAvatar()
        const response = await CompaniesService.create(formData)
        console.log(response)
      } catch (error) {
        this.error = error
        // this.error = error.response.data.error
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
