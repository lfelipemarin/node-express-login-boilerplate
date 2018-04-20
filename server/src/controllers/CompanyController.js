const { Company } = require('../models')
const { User } = require('../models')
const config = require('../config/config')

module.exports = {
  async registerCompany (req, res) {
    try {
      console.log('file', req.file)
      // ToDo implement file path
      const host = req.hostname
      const path = 'images/logos'
      const filePath = req.protocol + "://" + host + ':' + config.port + '/' + path + '/' + req.file.filename

      const company = await Company.create({
        name: req.body.name,
        logo: filePath
      })
      const companyJson = company.toJSON()
      res.send({
        company: companyJson
      })
    } catch (err) {
      res.status(400).send({
        error: 'Error creating company.'
      })
    }
  },
  async getlAllCompanies (req, res) {
    try {
      const companies = await Company.findAll()

      if (!companies) {
        return res.status(403).send({
          error: 'No companies exist.'
        })
      }

      res.send(companies)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'An error has occurred.'
      })
    }
  }
}
