const conversationController= require("../controllers/conversation.controller");
const express = require("express");
const router = express.Router();

router.post("/",conversationController.addConversation);
router.get("/:userId",conversationController.getConversationOfUser  );
router.get("/find/:firstUserId/:secondUserId",conversationController.getConversationOfTwoUsers  );





module.exports =router; 