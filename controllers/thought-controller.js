const { User, Thoughts } = require("../models");

const thoughtsController = {
    // Gets all thoughts
    getAllThoughts(req, res){
        Thoughts.find({})
            .populate({
                path: "reactions",
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // Gets a single thought using thoughtId
    getSingleThought ({params}, res) {
        Thoughts.findById(params.thoughtId)
        .populate({
            path: "reactions",
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: "No thought found with this id!"});
            } else {
                res.json(dbThoughtsData)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Updates thought using thoughtId
    updateThought({params, body}, res) {
        Thoughts.findByIdAndUpdate(params.thoughtId, {thoughtText: body.thoughtText}, {new:true})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: "No thought found with this id!"});
            } else {
                res.json(dbThoughtsData)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Adds a thought using the userId
    addThought({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },
    // Deletes a thought using the thoughtId
    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({_id: params.thoughtId})
        .then(deleteThought => {
            if (!deleteThought) {
                return res.status(404).json({message: "No thought found with this id!"});
            }
            res.json(deleteThought);
        })
        .catch(err => res.status(400).json(err));
    },
    // Adds a reaction to a thought using the thoughtId
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No thought found with this id!"});
                return;
            } else {
                res.json(dbUserData);
            }
        })
        .catch(err => res.status(400).json(err));
    },
    // Removes a reaction using the thoughtId and reactionId
    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: {reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No thought found with this id!"});
                return;
            } else {
                res.json(dbUserData);
            }
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtsController;