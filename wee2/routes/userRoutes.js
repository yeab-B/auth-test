const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUserAge,
} = require("../controller/userController");
const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/:id", updateUserAge);

module.exports = router;