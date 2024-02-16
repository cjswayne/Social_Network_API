const router = require("express").Router();
const { errorHandler } = require("../helpers");
const { User, Thought } = require("../../models");

// EVERYTHING IS PREFIXED WITH /api

// Route to get all thoughts
router.get("/thoughts", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    if (!thoughts) {
      return res.status(404).json({
        message: "No thoughts were found.",
      });
    }
    return res.json(thoughts);
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to get thought by id
router.get("/thoughts/:thought_id", async ({ params: { thought_id } }, res) => {
  try {
    const thought = await Thought.findById(thought_id);

    if (!thought) {
      return res.status(404).json({
        message: "Thought could not be found",
      });
    }

    return res.json(thought);
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to post new thought
router.post(
  "/thoughts",
  async ({ body: { thoughtText, username, userId } }, res) => {
    try {
      console.log(thoughtText, username, userId);
      const thought = await Thought.create({ thoughtText, username });

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            thoughts: thought._id,
          },
        },
        { new: true, runValidators: true }
      );
      if(!updatedUser){
        return res.status(404).json({ message: "User not found." });
      }

      res.status(201).json(thought);

    } catch (err) {
      errorHandler(err, res);
    }
  }
);

// Route to update thought by id 
router.put("/thoughts/:thought_id", async ({params:{thought_id}, body: {thoughtText}}, res) => {
  try {

    if(!thoughtText){
      return res.status(400).json({ message: "No thought text provided." });
    }
    const updatedThought = await Thought.findByIdAndUpdate(
      thought_id,
      {
        $set:{
          thoughtText
        }
      }, { new: true, runValidators: true });



      res.json(updatedThought)

  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to delete thought by id
router.delete("/thoughts/:thought_id", async ({params: {thought_id}}, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(thought_id)

    if(!deletedThought){
      return res
          .status(404)
          .json({ message: "Thought could not be deleted."});
    }

    res.json({
      message:'Thought deleted.',
      deletedThought
    })
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to create reaction
router.post("/thoughts/:thought_id/reactions", async ({params: {thought_id}, body: reaction}, res) => {
  try {

    if(!reaction){
      return res.status(404).json({
        message: "Reaction body empty",
      });
    }
    const thoughtWithReaction = await Thought.findByIdAndUpdate(
      thought_id,
      {
        $push:{
          reactions: reaction
        }
      }, { new: true, runValidators: true })

      if(!thoughtWithReaction){
        return res.status(404).json({
          message: "Could not create Reaction",
        });
      }


      res.json(thoughtWithReaction)
    
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to delete reaction
router.delete(
  "/thoughts/:thought_id/reactions/:reaction_id",
  async ({params:{thought_id, reaction_id}}, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thought_id,
        {
          $pull:{
            reactions: {_id: reaction_id}
          }
        }, {new: true})
  
        if(!updatedThought){
          return res.status(404).json({
            message: "Could not delete Reaction",
          });
        }
  
  
        res.json({message: "Reaction deleted successfully",updatedThought})
    } catch (err) {
      errorHandler(err, res);
    }
  }
);

module.exports = router;
