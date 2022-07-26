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

//ROUTE THAT GETS ALL THE USERS, include friends?
router.route("/").get(getAllUsers);

//ROUTE THAT CREATES A NEW USER
router.route("/").post(createUser);

//ROUTE THAT GETS A SINGLE USER BASED ON USER ID
router.route("/:userId").get(getSingleUser);

//ROUTE THAT UPDATES A SINGLE USER
router.route("/:userId").put(updateUser);

//ROUTE THAT DELETES A SINGLE USER BASED ON USER ID
router.route('/:userId').delete(deleteUser);

//ROUTE THAT ADDS A FRIEND TO A USER
router.route('/:userId/friends/:friendId').put(addFriend)

//ROUTE THAT DELETES A FRIEND FROM A USER'S FRIENDS, DONT DELETE THE FRIEND AS A USER THOUGH!
router.route('/:userId/friends/:friendId').delete(deleteFriend)

module.exports = router;
