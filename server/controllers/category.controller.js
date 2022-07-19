const authUtil = require("../utils/auth.util");
const queryUtil = require("../utils/query.util");
const validation = require("../utils/validation.util");

const models = require("../models");
const Category = models.Category;

exports.create = async (req, res, next) => {
  const isValid = validation.isValid(req.body, res, ["name", "icon", "type"]);
  if (isValid) {
    const token = req.headers["authorization"].split(" ")[1];
    const user = await authUtil.getTokenData(token);
    req.body.user_id = user.id;
    queryUtil.create(Category, req.body, res);
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
    queryUtil.findAll(Category, option, res);
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
    queryUtil.update(Category, req.body, option, res);
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
    queryUtil.delete(Category, option, res);
  }
};
