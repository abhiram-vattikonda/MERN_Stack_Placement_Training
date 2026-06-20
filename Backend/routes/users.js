const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/").get(getUsers)
router.route("/").post(createUser);
router.route("/:id").put(updateUser)
router.route("/:id").delete(deleteUser);

module.exports = router;
