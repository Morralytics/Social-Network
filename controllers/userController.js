const User = require('../models/User');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate({ path: 'thought', select: '-__v' })
            .populate({ path: 'friend', select: '-__v' })
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

    },
    deleteUser(req, res) {

    },
};