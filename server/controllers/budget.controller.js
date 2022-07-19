const authUtil = require("../utils/auth.util");
const queryUtil = require("../utils/query.util");
const validation = require("../utils/validation.util");

const models = require("../models");
const Budget = models.Budget;
const Bank = models.Bank;
const Category = models.Category;

exports.create = async (req, res, next) => {
  const isValid = validation.isValid(req.body, res, [
    "amount",
    "remark",
    "type",
    "bank_id",
    "category_id",
  ]);
  if (isValid) {
    const token = req.headers["authorization"].split(" ")[1];
    const user = await authUtil.getTokenData(token);
    req.body.user_id = user.id;
    const created = await queryUtil.create(Budget, req.body, res, true);
    if (created) {
      const option = {
        where: {
          id: created.id,
        },
        include: [
          {
            model: Bank,
            as: "bank",
          },
          {
            model: Category,
            as: "category",
          },
        ],
      };
      queryUtil.findOne(Budget, option, res);
    }
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
      include: [
        {
          model: Bank,
          as: "bank",
        },
        {
          model: Category,
          as: "category",
        },
      ],
    };
    queryUtil.findAll(Budget, option, res);
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
    const updated = await queryUtil.update(Budget, req.body, option, res, true);
    if (updated) {
      const option = {
        where: {
          id,
        },
        include: [
          {
            model: Bank,
            as: "bank",
          },
          {
            model: Category,
            as: "category",
          },
        ],
      };
      queryUtil.findOne(Budget, option, res);
    }
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
    queryUtil.delete(Budget, option, res);
  }
};
