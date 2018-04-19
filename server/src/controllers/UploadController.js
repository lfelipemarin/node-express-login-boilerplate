const { User } = require('../models')
const { Company } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const path = require('path')

/* Mulster file upload setup*/
const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log("file", file)
    cb(null, Date.now() + '-' + file.originalname)
  }
})
// var fileFilter = function (req, file, cb) {
//   var filetypes = /jpeg|jpg|png/
//   console.log(file)
//   var mimetype = filetypes.test(file.mimetype)
//   var extname = filetypes.test(path.extname(file.originalname).toLowerCase())

//   if (mimetype && extname) {
//     return cb(null, true);
//   }
//   cb("Error: File upload only supports the following filetypes - " + filetypes);
// }
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    var filetypes = /jpeg|jpg|png|docx/
    var mimetype = filetypes.test(file.mimetype)
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    if (mimetype && extname) {
      return cb(null, true)
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes)
  }
}).single('avatar')


module.exports = {
  async uploadAvatar (req, res) {
    try {
      upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading 
          console.log(err)
          return
        }
        if (!req.file) {
          console.log('No file received')
          return res.send({
            success: false
          })
        } else {
          console.log('file received')
          console.log(req)
          return res.send({
            success: true
          })
        }
      })
    } catch (err) {
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  }
}
