const router = require('express').Router();

// EVERYTHING IS PREFIXED WITH /api

// Route to get all users
router.get('/users', async(req, res) => {
try {
    
} catch (err) {
    handleError(err, res)
}
})

// Route to  get a user by its ID
router.get('/users/:user_id', async(req, res) => {
try {
    
} catch (err) {
    handleError(err, res)
}
})


// Route to post a new user
router.post('/users', async(req, res) => {
try {
    
} catch (err) {
    handleError(err, res)
}
})

// Route to update(put) a user by its ID
router.put('/users', async(req, res) => {
try {
    
} catch (err) {
    handleError(err, res)
}
})

// Route to delete user by id
router.delete('/users', async(req, res) => {
// remove associated thoughts when deleted
try {
    
} catch (err) {
    handleError(err, res)
}
})

// Route to post new friend to user friend list
router.post('/api/users/:userId/friends/:friendId', async(req, res) => {
try {
    
} catch (err) {
    handleError(err, res)
}
})

// Route to delete friend from user's friend list
router.delete('/api/users/:userId/friends/:friendId', async(req, res) => {
try {
    
} catch (err) {
    handleError(err, res)
}
})

module.exports = router;

