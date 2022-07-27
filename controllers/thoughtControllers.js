const { Thought } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
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

  async getSingleThought(req, res){
    
  }
};
