const messageController=require("../controllers/message.controller");
const express = require("express");
const router = express.Router();
router.post("/",messageController.sendMessage);
router.get("/:conversationId",messageController.getMessage);




module.exports =router; 