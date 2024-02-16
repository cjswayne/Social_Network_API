const router = require("express").Router();
const { errorHandler } = require("../helpers");
const { User } = require("../../models");

// EVERYTHING IS PREFIXED WITH /api

// Route to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({})
      .select("username email friends friendCount")
      .populate("friends", "username email -_id")
      .populate("thoughts");

      return res.json(users);
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to  get a user by its ID
router.get("/users/:user_id", async ({ params: { user_id } }, res) => {
  try {
    const user = await User.findById(user_id);

    if(!user){
     return res.status(404).json({
        message: 'User could not be found'
      })
    }

    return res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to post a new user
router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    if(!user){
      return res.status(404).json({
         message: 'User could not be found'
       })
     }
    return res.json(user);
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to update(put) a user by its ID
router.put(
  "/users/:user_id",
  async ({ params: { user_id }, body: updateData }, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(user_id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "User not found with id " + user_id });
      }

      return res.json(updatedUser);
    } catch (err) {
      errorHandler(err, res);
    }
  }
);

// Route to delete user by id
router.delete("/users/:user_id", async ({ params: { user_id } }, res) => {
  // remove associated thoughts when deleted
  try {
    const user = await User.findByIdAndDelete(user_id);
    if(!user){
      return res.status(404).json({
         message: 'User could not be found'
       })
     }
   
    return  res.json({
      message: "User deleted.",
      user,
    });
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to post new friend to user friend list
router.post(
  "/users/:user_id/friends/:friend_id",
  async ({ params: { user_id, friend_id } }, res) => {
    try {
      const user = await User.findById(user_id);

      let errorResponse = null;

      if (!user) {
        errorResponse = { status: 404, message: "User not found." };
      } else if (user.friends.includes(friend_id)) {
        errorResponse = { status: 400, message: "They are already friends" };
      } else if (user_id === friend_id) {
        errorResponse = {
          status: 400,
          message: "You cannot add the user to it's own friends list",
        };
      }

      if (errorResponse) {
        return res.status(errorResponse.status).json(errorResponse.message);
      }

      const updatedUser = await User.findByIdAndUpdate(
        user_id,
        {
          $push: {
            friends: friend_id,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(503).json({
          message: "Cannot update user.",
        });
      }
      return res.json({
        message: "Friend added successfully.",
        updatedUser,
      });
    } catch (err) {
      errorHandler(err, res);
    }
  }
);

// Route to delete friend from user's friend list
router.delete(
  "/users/:user_id/friends/:friend_id",
  async ({ params: { user_id, friend_id } }, res) => {
    try {
      const user = await User.findById(user_id);
      console.log(user_id);

      let errorResponse = null;

      if (!user) {
        errorResponse = { status: 404, message: "User not found." };
      } else if (!user.friends.includes(friend_id)) {
        errorResponse = { status: 400, message: "They are not friends" };
      } else if (user_id === friend_id) {
        errorResponse = {
          status: 400,
          message: "User ID and Friend ID are the same.",
        };
      }

      if (errorResponse) {
        return res.status(errorResponse.status).json(errorResponse.message);
      }

      const updatedUser = await User.findByIdAndUpdate(        
        user_id,
        {
          $pull: {
            friends: friend_id,
          },
        },
        { new: true })


        return res.json({
          message: "Friend deleted successfully.",
          updatedUser,
        });
    } catch (err) {
      errorHandler(err, res);
    }
  }
);

module.exports = router;
