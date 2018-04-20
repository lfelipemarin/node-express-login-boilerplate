const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      company: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      role: Joi.string(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const { error, value } = Joi.validate(req.body, schema)
    console.log('reqJOI', req.body.avatar)
    if (error) {
      console.log('joierror', error.details[0].context.key)
      switch (error.details[0].context.key) {
        case 'firstName':
          res.status(400).send({
            error: 'You must provide a valid first name'
          })
          break
        case 'lastName':
          res.status(400).send({
            error: 'You must provide a valid last name'
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
            <br>
            1. It must contain ONLY the following characters: lower case, upper case, numerics.
            <br>
            2. It must be at least 8 characters and not greater than 32 characters in lenght.`
          })
          break
        case 'company':
          res.status(400).send({
            error: 'You must provide a valid company'
          })
          break
        case 'role':
          res.status(400).send({
            error: 'You must provide a valid role'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information.'
          })
      }
    } else {
      next()
    }
  }
}
