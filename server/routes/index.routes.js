const express = require("express");
const userRouter = require("./user.routes");
const bankRouter = require("./bank.routes");
const budgetRouter = require("./budget.routes");
const categoryRouter = require("./category.routes");

const router = express.Router();

router.use("/user", userRouter);
router.use("/bank", bankRouter);
router.use("/budget", budgetRouter);
router.use("/category", categoryRouter);

module.exports = router;
