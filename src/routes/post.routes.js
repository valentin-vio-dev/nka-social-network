const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

router.get("/", postController.getAll);
router.post("/", postController.add);
router.delete("/:id", postController.delete);

module.exports = router;
