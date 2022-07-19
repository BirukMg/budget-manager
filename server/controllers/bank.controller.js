const authUtil = require("../utils/auth.util");
const queryUtil = require("../utils/query.util");
const validation = require("../utils/validation.util");

const models = require("../models");
const Bank = models.Bank;

exports.create = async (req, res, next) => {
  const isValid = validation.isValid(req.body, res, ["name", "balance"]);
  if (isValid) {
    const token = req.headers["authorization"].split(" ")[1];
    const user = await authUtil.getTokenData(token);
    req.body.user_id = user.id;
    queryUtil.create(Bank, req.body, res);
  }
};
exports.get = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  const user = await authUtil.getTokenData(token);
  if (user) {
    const option = {
      where: {
        user_id: user.id,
      },
    };
    queryUtil.findAll(Bank, option, res);
  }
};
exports.update = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  const user = await authUtil.getTokenData(token);
  const { id } = req.params;
  if (user) {
    const option = {
      where: {
        user_id: user.id,
        id,
      },
    };
    queryUtil.update(Bank, req.body, option, res);
  }
};
exports.delete = async (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  const user = await authUtil.getTokenData(token);
  const { id } = req.params;
  if (user) {
    const option = {
      where: {
        user_id: user.id,
        id,
      },
    };
    queryUtil.delete(Bank, option, res);
  }
};
