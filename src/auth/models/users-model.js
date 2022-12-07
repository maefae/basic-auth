"use strict";

const bcrypt = require("bcrypt");

// Create a Sequelize model
const usersSchema = (sequelizeDatabase, DataTypes) => {
  const model = sequelizeDatabase.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  model.beforeCreate(async (user) => {
    let hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;
  });

  model.authenticateBasic = async function (username, password) {
    // Search user table to find a user for a given username
    // { username: stickey, password: adfFkadfad= }
    const user = await this.findOne({ where: { username } });

    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      return user;
    }
  };

  return model;
};

module.exports = usersSchema;
