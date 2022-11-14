const userController=require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
router.post("/register",userController.registre);
router.post("/login",userController.login);
router.post("/userprofile",userController.userProfile);
router.put("/:id",userController.modifyInfo);
module.exports =router;  