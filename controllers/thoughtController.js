const { User, Thought, Reaction } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'There is no thought with that asssociated ID.' })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                );
            })
            .then(res.json(thoughtData))
            .catch((err) => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { ...req.body },
            { new: true },
        )
            .then((result) =>
                !result
                    ? res.status(400).json({ message: 'Something went wront! Try again.' })
                    : res.json(result)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(400).json({ message: 'There is no thought with that associated ID.' })
                    : Reaction.deleteMany({ _id: { $in: thought.reactions } })
            )
            .then(() => res.json({ message: 'Thoughts and reactions associated with this thought are deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
};