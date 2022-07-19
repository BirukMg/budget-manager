"use strict";
const { Model } = require("sequelize");
const enums = require("../constants/budget-type.enum");
const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { as: "user", foreignKey: "user_id" });
      this.belongsTo(models.Bank, { as: "bank", foreignKey: "bank_id" });
      this.belongsTo(models.Category, {
        as: "category",
        foreignKey: "category_id",
      });
    }
  }
  Budget.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      remark: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.ENUM(enums.INCOME, enums.EXPENSE),
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Budget",
      tableName: "budgets",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  Budget.afterCreate(async (budget, opt) => {
    const { amount, type, bank_id } = budget.dataValues;
    const models = require("./index");
    const Bank = models.Bank;
    const condition = {
      where: {
        id: bank_id,
      },
    };
    await Bank.update(
      {
        balance: Sequelize.literal(
          `balance ${type === "income" ? "+" : "-"} ${amount}`
        ),
        last_income: type === 'income' ? amount : Sequelize.literal(`last_income`),
        last_expense: type === 'expense' ? amount : Sequelize.literal(`last_expense`),
        last_income_date: type === 'income' ? new Date() : Sequelize.literal(`last_income_date`),
        last_expense_date: type === 'expense' ? new Date() : Sequelize.literal(`last_expense_date`),
      },
      condition
    );
  });
  return Budget;
};
