const express = require("express");
const router = express.Router();
const friendshipController = require("../controllers/friendship.controller");

router.get("/:id", friendshipController.getAllById);
router.post("/", friendshipController.add);
router.delete("/", friendshipController.delete);

module.exports = router;
