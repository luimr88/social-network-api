const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    updateThought,
    addThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// api/thoughts
router
    .route('/')
    .get(getAllThoughts)
// api/thoughts/userId
router
    .route('/:userId')
    .post(addThought);
// api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;