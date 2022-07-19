const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// routes using api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)


// routes using api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
// routes using api/user/:id/friendId
router
    .route('/:userId/friends/:friendsId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;