const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            // .populate({ path: 'thought', select: '-__v' })
            // .populate({ path: 'friend', select: '-__v' })
            .then((user) =>
                !user
                    ? res.status(400).json({ message: 'There is no user with that associated ID.' })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { ...req.body },
            { new: true },
            (err, result) => 
                !result
                    ? res.status(400).json({ message: 'Something went wrong! Try again.' })
                    : res.json(result)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
            !user
                ? res.status(400).json({ message: 'There is no user with that associated ID.' })
                : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: 'User and thoughts associated with this user deleted!'}))
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $addToSet: { friends: req.params.friendId }},
            { new: true },
            (err, result) =>
                !result
                    ? res.status(400).json({ message: 'There is no user with that associated ID' })
                    : res.json(result)
        )
        .catch((err) => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true },
            (err, result) =>
                !result
                    ? res.status(400).json({ message: 'There is no user with that associated ID' })
                    : res.json(result)
        )
        .catch((err) => res.status(500).json(err));
    },
};