const router = require("express").Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
} = require("../../controllers/thoughtControllers");

//Get all thoughts/create thought route
router.route("/")
.get(getAllThoughts)
.post(createThought);

//TODO: ROUTE TO GET SINGLE THOUGHT BASED ON THOUGHT ID
router.route("/:thoughtId")
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

//TODO: ROUTE TO UPDATE A THOUGHT
router.put("/", (req, res) => {});

//TODO: ROUTE TO DELETE A THOUGHT BASED ON THOUGHT ID
router.delete("/:thoughtId", (req, res) => {});

//TODO: ROUTE TO ADD REACTION TO A THOUGHT
router.post("/:thoughtId/reactions", (req, res) => {});

//TODO: ROUTE TO DELETE A REACTION ON A THOUGHT
router.delete("/:thoughtId/reactions/:reactionId", (req, res) => {});

module.exports = router;
