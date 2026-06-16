const express = require("express");
const router = express.Router();
const userHandler = require("../handlers/user.handler");


router.get("/users", userHandler.getUsers);
router.post("/users/create", userHandler.createUser);
router.get("/:roll", userHandler.getUserByRoll);

module.exports = router;
