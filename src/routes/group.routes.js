const express = require("express");
const router = express.Router();
const groupController = require("../controllers/group.controller");

router.get("/", groupController.getAll);
router.post("/", groupController.add);
router.post("/member", groupController.addMember);
router.delete("/:id", groupController.delete);

module.exports = router;
