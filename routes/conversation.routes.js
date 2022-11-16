const conversationController=require("../controllers/conversation.controller");
const express = require("express");
const router = express.Router();


router.post("/",postController.createPost);
router.put("/:id",postController.updatePost);
router.delete("/:id",postController.deletePost);
router.put("/:id/like",postController.likeOrDislikePost);
router.get("/:id",postController.getPost);
    router.get("/timeline/all", postController.gettimeline);





module.exports =router; 