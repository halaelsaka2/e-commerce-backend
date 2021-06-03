const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const hashed_password = bcrypt.hashSync("admin", salt);
const UsersData = [
  {
    userName: "admin",
    password: hashed_password,
    email: "admin@gmail.com",
    isActive: true,
    roleId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
module.exports = UsersData;
