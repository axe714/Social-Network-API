const { json } = require("express");
const { Thought, Reaction } = require("../models");

module.exports = {
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);

      const thought = await Thought.findOneAndUpdate(req.params.thoughtId, {
        $push: {
          reactions: reaction,
        },
      });

      if (!thought || !reaction) {
        res
          .status(404)
          .json({ message: "Something went wrong. Please try again." });
      }

      res.status(200).json({ message: "Reaction successfully posted!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
