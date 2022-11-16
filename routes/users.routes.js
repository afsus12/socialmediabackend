const userController=require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/userprofile",userController.userProfile);
router.put("/:id",userController.modifyInfo);
router.delete("/:id",userController.deleteUser);
router.get("/:id",userController.getUser);
router.put("/:id/follow",userController.followUser);
module.exports =router;  