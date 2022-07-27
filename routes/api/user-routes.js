const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userControllers");

//Get all users and create user
router.route("/")
.get(getAllUsers)
.post(createUser);

//Get, update and delete single user
router.route("/:userId")
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

//Route for adding/deleting friend
router.route("/:userId/friends/:friendId")
.put(addFriend)
.delete(deleteFriend);

module.exports = router;
