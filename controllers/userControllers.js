const router = require("express").Router();
const { User } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({
        // populate: {
        //     path: "friends",
        //     select: "username"
        // }
      });
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.userId);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async deleteUser(req, res) {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(204).end();
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
      res.status(200).json(user);
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
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
