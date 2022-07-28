const { Thought, Reaction } = require("../models");

module.exports = {
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);

      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $push: {
          reactions: reaction,
        },
      });

      if (!thought || !reaction) {
        return res.status(404).json({
          message: "Unable to find thought or reaction. Please try again.",
        });
      }

      res.status(200).json({ message: "Reaction successfully posted!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
        $pull: {
          reactions: req.params.reactionId,
        },
      });

      if (!thought || !reaction) {
        return res.status(404).json({
          message: "Unable to find thought or reaction. Please try again.",
        });
      }

      res.status(200).json({ message: "Reaction successfully deleted!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
