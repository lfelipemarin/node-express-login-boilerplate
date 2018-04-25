const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')
const path = require('path')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

require('./routes')(app)

sequelize.sync({ force: false })
  .then(() => {
    app.listen(config.port)
    console.log(`Server started on port ${config.port}`)
  })
