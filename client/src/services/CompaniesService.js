import Api from '@/services/Api'

export default {
  create (details) {
    return Api().post('register-company', details)
  },
  getAll () {
    return Api().get('get-companies')
  }
}
