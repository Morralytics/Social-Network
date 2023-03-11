const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost/socialNetworkDB';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;