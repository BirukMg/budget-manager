var express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
const models = require('../models');
const User = models.User;

router.post("/register", async(req, res, next) => {
    const {username} = req.body;
    const exists = await User.count({where: {username}});
    if (exists) {
        res.status(400).send({message: 'user already exists'});
        return;
    }
    next(); 
}, userController.register);
router.post("/login", userController.login);

module.exports = router;
