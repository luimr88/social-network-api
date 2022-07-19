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

// routes using api/thoughts
router
    .route('/')
    .get(getAllThoughts)
// routes using api/thoughts/userId
router
    .route('/:userId')
    .post(addThought);
// routes using api/thoughts/thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// routes using api/thoughts/thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// routes using api/thoughts/thoughtId/reactions/reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;