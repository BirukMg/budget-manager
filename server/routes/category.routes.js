var express = require("express");
const categoryController = require("../controllers/category.controller");
const authUtil = require('../utils/auth.util');
const router = express.Router();

router.get("/", authUtil.verifyToken, categoryController.get);
router.post("/create", authUtil.verifyToken, categoryController.create);
router.post("/update/:id", authUtil.verifyToken, categoryController.update);
router.get("/delete/:id", authUtil.verifyToken, categoryController.delete);

module.exports = router;
