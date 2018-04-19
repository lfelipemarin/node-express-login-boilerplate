import Api from '@/services/Api'

export default {
  uploadAvatar () {
    return Api().post('upload-avatar', 'data')
  }
}
