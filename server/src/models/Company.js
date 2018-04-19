const { User } = require('../models')
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING
  })

  Company.associate = function (models) {
    
  }

  return Company
}
