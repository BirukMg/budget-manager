"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn("budgets", "user_id", {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
      queryInterface.addColumn("budgets", "bank_id", {
        type: Sequelize.UUID,
        references: {
          model: "banks",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
      queryInterface.addColumn("budgets", "category_id", {
        type: Sequelize.UUID,
        references: {
          model: "categories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
      queryInterface.addColumn("categories", "user_id", {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
      queryInterface.addColumn("banks", "user_id", {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      }),
    ];
  },

  down: async (queryInterface, Sequelize) => {
   return [
    queryInterface.removeColumn('budgets', 'user_id'),
    queryInterface.removeColumn('budgets', 'bank_id'),
    queryInterface.removeColumn('budgets', 'category_id'),
    queryInterface.removeColumn('categories', 'user_id'),
    queryInterface.removeColumn('banks', 'user_id'),
   ];
  },
};
