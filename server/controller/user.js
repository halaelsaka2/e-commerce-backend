const GenerateServices = require("../services/GenerateServices");
const MailService = require("../Services/MailService");
const bcrypt = require("bcrypt");
const { user } = require("../models");
const _notCorrect = "Email OR PASSWORD NOT CORRECT";
const _notActive = "This user not active any more";

async function addUser(req, res) {
  req.body.password = await GenerateServices.generatePassword();
  const message = await GenerateServices.generateMessage(req.body);
  const obj = {
    name: req.body.name,
    userName: req.body.userName,
    email: req.body.email,
    roleId: req.body.roleId,
    password: req.body.password,
    isActive: true,
  };
  user
    .createUser(obj)
    .then((result) => {
      MailService.sendEmail(result.email, message);
      res.status(200).json(result);
    })
    .catch((err) => {
      return res.status("500").json(err);
    });
}
async function login(req, res) {
  var userData = await user.getUserByEmail(req.body.email);
  if (!userData) return res.status(200).json({ isAuthenticate: false, msg: _notCorrect });
  if (userData.isActive) {
    userData = await user.login(req.body);
  } else {
    return res.status(200).json({ isAuthenticate: false, msg: _notActive });
  }
  res.status(200).json({ ...userData });
}
async function register(req, res) {
  var salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync(req.body.password, salt);
  const obj = {
    name: "name",
    userName: req.body.userName,
    email: req.body.email,
    roleId: req.body.roleId,
    password,
    isActive: true,
  };
  user
    .createUser(obj)
    .then(async (result) => {
      if (result.isSignUp === true) {
        const userData = await user.login({ email: result.email, password: req.body.password });
        return res.status(200).json(userData);
      } else {
        return res.status(200).json({ ...result, isAuthenticate: false });
      }
    })
    .catch((err) => {
      return res.status("500").json(err);
    });
}

async function getAllUsers(req, res) {
  user
    .getAllUsers()
    .then(async (result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      return res.status("500").json(err);
    });
}

async function editUser(req, res) {
  const newUser = req.body;
  user
    .editUser(newUser)
    .then(async (result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
async function deleteUser(req, res) {
  await user
    .deleteUser(req.params.id)
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      return res.status("500").send(err);
    });
}
module.exports = {
  addUser,
  login,
  register,
  getAllUsers,
  editUser,
  deleteUser,
};
