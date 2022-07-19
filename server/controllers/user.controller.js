const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const queryUtil = require("../utils/query.util");
const validation = require("../utils/validation.util");
const models = require("../models");
const User = models.User;

exports.register = (req, res) => {
  const isValid = validation.isValid(req.body, res, ["username", "password"]);
  if (isValid) {
    queryUtil.create(User, req.body, res);
  }
};

exports.login = async (req, res) => {
  const isValid = validation.isValid(req.body, res, ["username", "password"]);
  if (isValid) {
    const { username, password } = req.body;
    const option = {
      where: {
        username,
      },
    };
    const user = await User.findOne(option);
    if (user) {
      const { dataValues } = user;
      const isCorrectPassword = await validPassword(
        password,
        dataValues.password
      );
      if (isCorrectPassword) {
        tokenGenerate(dataValues, res)
        return;
      }
      res.status(401).send({ message: "invalid credentials" });
    } else {
      res.status(401).send({ message: "invalid credentials" });
    }
  }
};

const validPassword = async (password, hash) => {
  return new Promise((res) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (!err) {
        res(result);
      } else {
        console.log(err);
      }
    });
  });
};

const tokenGenerate = (data, res) => {
  delete data.password;
  jwt.sign(data, 'SomeSecreteKey', (err, token) => {
      console.log(err);
    if (!err) {
      res.status(200).json({ token });
    } else {
      res.json(err);
    }
  });
};
