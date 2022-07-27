const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} = require("../../controllers/thoughtControllers");

const {createReaction} = require("../../controllers/reactionControllers")

//Get all thoughts/create thought route
router.route("/")
.get(getAllThoughts)
.post(createThought);

// Get, update and delete single thought
router.route("/:thoughtId")
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.route("/:thoughtId/reactions")
.post(createReaction)
//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {});

module.exports = router;
