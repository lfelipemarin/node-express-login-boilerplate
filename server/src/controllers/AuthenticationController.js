const { User } = require('../models')
const { Company } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const path = require('path')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
var host = ''
var filePath = ''
/* Multer file upload setup*/
// const multer = require('multer')
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '../uploads/')
//   },
//   filename: function (req, file, cb) {
//     console.log("file", file)
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     var filetypes = /jpeg|jpg|png|docx/
//     var mimetype = filetypes.test(file.mimetype)
//     var extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     if (mimetype && extname) {
//       return cb(null, true)
//     }
//     cb("Error: File upload only supports the following filetypes - " + filetypes)
//   }
// }).single('avatar')

module.exports = {
  async register (req, res) {
    try {
      var host = ''
      var filePath = ''

      console.log('file', req.file)
      host = req.hostname
      filePath = req.protocol + "://" + host + '/' + req.file.path

      console.log('bodyAC', req.body)

      const company = await Company.findOne({
        where: {
          name: req.body.company
        }
      })

      const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role || 'client',
        CompanyId: company.id,
        avatar: filePath || ''
      })
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log('err', err)
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occurred trying to log in.'
      })
    }
  }
}
