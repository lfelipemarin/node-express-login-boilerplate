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

module.exports = {
  async register (req, res) {
    try {
      console.log('file', req.file)
      const host = req.hostname
      const path = 'images/logos'
      const filePath = req.protocol + "://" + host + ':' + config.port + '/' + path + '/' + req.file.filename

      console.log('bodyAC', req.body)

      const company = await Company.findOne({
        where: {
          name: req.body.company
        }
      })

      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
