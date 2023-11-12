const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 获取用户资料
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// 更新用户资料
router.put("/:id", async (req, res) => {
  try {
    if (req.body.userId === req.params.id) {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updatedUser);
    } else {
      res.status(403).json("You can only update your own profile");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
