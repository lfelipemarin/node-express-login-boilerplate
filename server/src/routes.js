const AuthenticationController = require('./controllers/AuthenticationController')
const CompanyController = require('./controllers/CompanyController')
const UploadController = require('./controllers/UploadController')
const path = require('path')
const multerAvatars = require('multer')
const multerLogos = require('multer')

/* Multer file upload setup */

let storageAvatars = multerAvatars.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(__dirname, 'uploads'))
    cb(null, path.join(__dirname, 'public/images/avatars'))
  },
  filename: function (req, file, cb) {
    console.log('body', req.body)
    cb(null, Date.now() + '-' + req.body.lastName + '.' + file.originalname.split('.')[1])
  }
})

const uploadAvatar = multerAvatars({
  storage: storageAvatars,
  fileFilter: function (req, file, cb) {
    let filetypes = /jpeg|jpg|png/
    let mimetype = filetypes.test(file.mimetype)
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb('Error: File upload only supports the following filetypes -' + filetypes)
  }
}).single('avatar')

/* Multer file upload setup */

let storageLogos = multerLogos.diskStorage({
  destination: function (req, file, cb) {
    console.log(path.join(__dirname, 'uploads'))
    cb(null, path.join(__dirname, 'public/images/logos'))
  },
  filename: function (req, file, cb) {
    // console.log('file', file)
    cb(null, Date.now() + '-' + req.body.name + '.' + file.originalname.split('.')[1])
  }
})

const uploadLogo = multerLogos({
  storage: storageLogos,
  fileFilter: function (req, file, cb) {
    let filetypes = /jpeg|jpg|png/
    let mimetype = filetypes.test(file.mimetype)
    let extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb('Error: File upload only supports the following filetypes -' + filetypes)
  }
}).single('logo')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register', uploadAvatar, AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/register-company', uploadLogo,
    CompanyController.registerCompany)

  app.post('/upload-avatar',
    UploadController.uploadAvatar)

  app.get('/get-companies',
    CompanyController.getlAllCompanies)
}
