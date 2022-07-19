var express = require("express");
const bankController = require("../controllers/bank.controller");
const authUtil = require('../utils/auth.util');
const router = express.Router();

router.get("/", authUtil.verifyToken, bankController.get);
router.post("/create", authUtil.verifyToken, bankController.create);
router.post("/update/:id", authUtil.verifyToken, bankController.update);
router.get("/delete/:id", authUtil.verifyToken, bankController.delete);

module.exports = router;
