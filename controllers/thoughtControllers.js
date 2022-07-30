const { Thought, User } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate({
        path: "reactions",
      });

      if (!thoughts) {
        return res
          .status(400)
          .json({ message: "Something went horribly wrong..." });
      }

      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate({
        path: "reactions",
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this ID." });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // console.log(req.body.username);

      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $push: {
            thoughts: thought,
          },
        }
      );

      if (!thought || !user) {
        return res
          .status(404)
          .json({ message: "Something went wrong. Please try again." });
      }

      res.status(200).json({ message: "Thought successfully posted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: "Thought not found" });
      }

      res.status(200).json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        {
          new: true,
        }
      );

      if (!thought) {
        return res
          .status(400)
          .json({ message: "Something went wrong. Thought was not updated." });
      }

      res.status(200).json({ message: "Thought successfully updated!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
