const { User } = require('../models')
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    logo: DataTypes.STRING
  })

  Company.associate = function (models) {

  }

  return Company
}
