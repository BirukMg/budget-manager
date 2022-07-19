var express = require("express");
const budgetController = require("../controllers/budget.controller");
const authUtil = require('../utils/auth.util');
const router = express.Router();

router.get("/", authUtil.verifyToken, budgetController.get);
router.post("/create", authUtil.verifyToken, budgetController.create);
router.post("/update/:id", authUtil.verifyToken, budgetController.update);
router.get("/delete/:id", authUtil.verifyToken, budgetController.delete);

module.exports = router;
