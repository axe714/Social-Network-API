const router = require("express").Router();
const { User } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({
        populate: {
          path: "friends",
          select: "username",
        },
      });
      if (!users) {
        return res.status(400).json({ message: "Something went horribly wrong..." });
      }
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) {
        res.status(404).json({ message: "No user found." });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);

      if (!user) {
        res.status(400).json({ message: "User not created" });
      }

      res.status(201).json({message: "A new user has been created!"});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
      });

      if (!user) {
        res.status(400).json({ message: "Something went wrong." });
      }

      res.status(200).json({ message: "User updated!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      
      if (!user) {
        res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User successfully deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $push: {
          friends: req.params.friendId,
        },
      });
      const friend = await User.findByIdAndUpdate(req.params.friendId, {
        $push: {
          friends: req.params.userId,
        },
      });

      if (!user || !friend) {
        res.status(404).json({ message: "User not found.. try again." });
      }

      res.status(200).json({ message: 'Friendship has begun 😍' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async deleteFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, {
        $pull: {
          friends: req.params.friendId,
        },
      });
      const friend = await User.findByIdAndUpdate(req.params.friendId, {
        $pull: {
          friends: req.params.userId,
        },
      });

      if (!user || !friend) {
        res.status(404).json({ message: "User not found.. try again." });
      }

      res.status(200).json({ message: 'Friendship terminated 😢' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
