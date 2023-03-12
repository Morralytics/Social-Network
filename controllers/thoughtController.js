const { User, Thought } = require('../models');

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

    },
    updateThought(req, res) {

    },
    deleteThought(req, res) {

    },
};