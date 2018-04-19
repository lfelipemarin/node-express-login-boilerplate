const { Company } = require('../models')
const { User } = require('../models')

module.exports = {
  async registerCompany (req, res) {
    try {
      const company = await Company.create(req.body)
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
