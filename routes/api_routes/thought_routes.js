const router = require("express").Router();
const {errorHandler} = require('../helpers') 

// EVERYTHING IS PREFIXED WITH /api

// Route to get all thoughts
router.get("/thoughts", async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to get thought by id
router.get("/thoughts/:thought_id", async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to post new thought
router.post("/thoughts", async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to update thought by id
router.put("/thoughts/:thought_id", async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to delete thought by id
router.delete("/thoughts/:thought_id", async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to create reaction
router.post("/thoughts/:thoughtId/reactions", async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
});

// Route to delete reaction
router.delete(
  "/thoughts/:thoughtId/reactions/:reaction_id",
  async (req, res) => {
    try {
    } catch (err) {
      errorHandler(err, res);
    }
  }
);

module.exports = router;
