const AuthenticationController = require('./controllers/AuthenticationController')
const CompanyController = require('./controllers/CompanyController')
const UploadController = require('./controllers/UploadController')
const path = require('path')

let multer = require('multer')

/* Multer file upload setup */

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // console.log('file', file)
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|docx/
    var mimetype = filetypes.test(file.mimetype)
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb('Error: File upload only supports the following filetypes -' + filetypes)
  }
}).single('avatar')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register', upload, AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/register-company',
    CompanyController.registerCompany)

  app.post('/upload-avatar',
    UploadController.uploadAvatar)

  app.get('/get-companies',
    CompanyController.getlAllCompanies)
}
